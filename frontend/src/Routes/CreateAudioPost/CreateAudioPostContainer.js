import React, { useState } from "react";
import CreateAudioPostPresenter from "./CreateAudioPostPresenter";
import useCaptionInput from "../../Hooks/useCaptionInput";
import { useMutation, useQuery } from "react-apollo-hooks";
import { ME } from "../../SharedQueries";
import FormData from "form-data";
import { FOLLOW, UPLOAD, NEXT_CHALLENGER } from "./CreateAudioPostQueries";
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
    loading = FOLLOWQuery.loading;
  }

  const uploadMutation = useMutation(UPLOAD, {
    variables: {
      caption: caption.value,
      category: "audio",
      rel_challengers: relChallenger,
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
      let photoFile = document.getElementById("photo");
      let audioFile = document.getElementById("audio");
      console.log(photoFile.files[0]);
      console.log(audioFile.files[0]);
      // start for

      try {
        for (let i = 0; i < 2; i++) {
          let formData = new FormData();

          if (i == 0) {
            formData.append("file", audioFile.files[0]);
          } else if (i == 1) {
            formData.append("file", photoFile.files[0]);
          }

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
          console.log("두번", location);
          filePath.push(location);
        } // end for

        console.log(filePath);

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
        toast.error("Cant upload", "Try later");
      } finally {
      }
    } else if (action === "relChallenger") {
    } else if (action === "tagChallenger") {
    }
  };
  return (
    <CreateAudioPostPresenter
      setAction={setAction}
      action={action}
      setCreate={setCreate}
      create={create}
      onSubmit={onSubmit}
      relChallenger={relChallenger}
      tagChallenger={tagChallenger}
      setRelChallenger={setRelChallenger}
      setTagChallenger={setTagChallenger}
      loading={loading}
      caption={caption}
      data={data}
      id={id}
      progress={progress}
      setProgress={setProgress}
    />
  );
};
