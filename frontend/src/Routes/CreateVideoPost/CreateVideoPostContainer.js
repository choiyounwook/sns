import React, { useState } from "react";
import CreateVideoPostPresenter from "./CreateVideoPostPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation, useQuery } from "react-apollo-hooks";
import { ME } from "../../SharedQueries";
import FormData from "form-data";
import { FOLLOW, UPLOAD, NEXT_CHALLENGER } from "./CreateVideoPostQueries";
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
  const caption = useInput(hashtag);
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
      category: "video",
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
      let formData = new FormData();
      let videoFile = document.getElementById("video");
      console.log(videoFile.files[0]);
      formData.append("file", videoFile.files[0]);
      try {
        const {
          data: { location },
        } = await axios.post("http://i3a508.p.ssafy.io:4000/api/upload", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        filePath.push(location);

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
        toast.error("정말 올리실건가요? 흑역사가 될수도 있습니다. 결심하셨다면 다시 선택을 해주세요.");
      } finally {
      }
    } else if (action === "relChallenger") {
    } else if (action === "tagChallenger") {
    }
  };
  return (
    <CreateVideoPostPresenter
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
