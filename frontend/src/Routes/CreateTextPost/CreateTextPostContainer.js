import React, { useState } from "react";
import CreateTextPostPresenter from "./CreateTextPostPresenter";
import useInput from "../../Hooks/useInput";
import useCaptionInput from "../../Hooks/useCaptionInput";
import { useMutation, useQuery } from "react-apollo-hooks";
import { ME } from "../../SharedQueries";
import FormData from "form-data";
import { FOLLOW, UPLOAD, NEXT_CHALLENGER } from "./CreateTextPostQueries";
import axios from "axios";
import { toast } from "react-toastify";

export default ({ create, setCreate, selHashtags, pid }) => {
  const [color, setColor] = useState("rgba(255, 255, 255, 1)");
  const [fcolor, setFColor] = useState("rgba(0, 0, 0, 1)");
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
  const textContent = useInput("");
  let bgColor = [];
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

  const uploadMutation = useMutation(UPLOAD);
  const nextMutation = useMutation(NEXT_CHALLENGER);
  const onSubmit = async (e) => {
    setProgress(true);
    if (progress) {
      console.log("!!", progress);

      return;
    }
    e.preventDefault();
    if (action === "CreatePost") {
      try {
        bgColor.push(color);
        bgColor.push(fcolor);
        console.log(relChallenger);
        console.log(tagChallenger);
        const {
          data: { uploadChallenge },
        } = await uploadMutation({
          variables: {
            caption: caption.value,
            category: "text",
            rel_challengers: relChallenger,
            tag_challengers: tagChallenger,
            files: bgColor,
            textContent: textContent.value,
          },
        });
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
  console.log(fcolor);
  return (
    <CreateTextPostPresenter
      setColor={setColor}
      color={color}
      setFColor={setFColor}
      fcolor={fcolor}
      setAction={setAction}
      action={action}
      setCreate={setCreate}
      create={create}
      textContent={textContent}
      onSubmit={onSubmit}
      relChallenger={relChallenger}
      tagChallenger={tagChallenger}
      setRelChallenger={setRelChallenger}
      setTagChallenger={setTagChallenger}
      loading={loading}
      data={data}
      caption={caption}
      id={id}
      progress={progress}
      setProgress={setProgress}
    />
  );
};
