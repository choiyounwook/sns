import React, { useState } from "react";
import CreatePhotoPostPresenter from "./CreatePhotoPostPresenter";
import useInput from "../../Hooks/useInput";
import useCaptionInput from "../../Hooks/useCaptionInput";
import { useMutation, useQuery } from "react-apollo-hooks";
import { ME } from "../../SharedQueries";
import FormData from "form-data";
import { FOLLOW, UPLOAD, NEXT_CHALLENGER } from "./CreatePhotoPostQueries";
import axios from "axios";
import { toast } from "react-toastify";

export default ({ create, setCreate, selHashtags, pid }) => {
  const [action, setAction] = useState("CreatePost");
  const [relChallenger, setRelChallenger] = useState(``);
  const [tagChallenger, setTagChallenger] = useState(``);
  const [progress, setProgress] = useState(false);
  let hashtag = "";
  if (selHashtags) {
    for (let i = 0; i < selHashtags.length; i++) {
      hashtag += selHashtags[i].tag_name + " ";
    }
  }
  const caption = useCaptionInput(hashtag);
  const photo = useInput("");
  let filePath = [];
  var limit = 100;
  var cur = 0;
  var id = "";

  const meQuery = useQuery(ME);
  var data = "",
    loading = "";
  if (meQuery.data.me) {
    id = meQuery.data.me.id;

    const FOLLOWQuery = useQuery(FOLLOW, {
      variables: {
        id,
        limit,
        cur,
      },
    });
    data = FOLLOWQuery.data;
    console.log(data);
    loading = FOLLOWQuery.loading;
  }

  const uploadMutation = useMutation(UPLOAD, {
    variables: {
      caption: caption.value,
      category: "image",
      rel_challengers: relChallenger,
      pre_challengers: "",
      next_challengers: "",
      tag_challengers: tagChallenger,
      files: filePath,
    },
  });

  const nextMutation = useMutation(NEXT_CHALLENGER);

  const onSubmit = async (e) => {
    setProgress(true);
    if (progress) {
      console.log("!!", progress);

      return;
    }
    e.preventDefault();
    if (action === "CreatePost") {
      console.log(caption.value);

      let photoFile = document.getElementById("photo");
      // start for
      try {
        if (photoFile.files.length == 0) {
          throw "파일을 선택해야 합니다";
        }
        for (let i = 0; i < photoFile.files.length; i++) {
          let formData = new FormData();

          formData.append("file", photoFile.files[i]);

          const {
            data: { location },
          } = await axios.post(
            "http://i3a508.p.ssafy.io:4000/api/upload",
            formData,
            {
              headers: {
                "content-type": "multipart/form-data",
              },
            }
          );
          filePath.push(location);
        } // end for
        const {
          data: { uploadChallenge },
        } = await uploadMutation();
        if (uploadChallenge.id && pid) {
          const {
            data: { nextChallenge },
          } = await nextMutation({
            variables: {
              id: uploadChallenge.id,
              pid: pid,
            },
          });
          window.location.href = "/";
        } else {
          window.location.href = "/";
        }
      } catch (e) {
        setProgress(false);
        toast.error("Cant upload, Try later");
      } finally {
      }
    } else if (action === "relChallenger") {
    } else if (action === "tagChallenger") {
    }
  };
  return (
    <CreatePhotoPostPresenter
      setAction={setAction}
      action={action}
      photo={photo}
      onSubmit={onSubmit}
      relChallenger={relChallenger}
      tagChallenger={tagChallenger}
      setRelChallenger={setRelChallenger}
      setTagChallenger={setTagChallenger}
      loading={loading}
      data={data}
      caption={caption}
      id={id}
      cat="image"
      progress={progress}
      setProgress={setProgress}
    />
  );
};
