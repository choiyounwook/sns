import React, { useState } from "react";
import { gql } from "apollo-boost";
import withRouter from "react-router-dom/withRouter";
import { useQuery, useMutation } from "react-apollo-hooks";
import ProfilePresenter from "./ProfilePresenter";
import useInput from "../../Hooks/useInput";
import { toast } from "react-toastify";
import axios from "axios";

const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      id
      avatar
      username
      nickname
      isFollowing
      isSelf
      bio
      followingCount
      followersCount
      postsCount

    },
    seePost(username: $username){
      id
      location
      caption
      category
      textContent
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
      nextPostCount
      prePostCount
      nextPosts{
        user{
        id
        avatar
        username
        isFollowing
        isSelf
        bio
        }
      }
      prePosts{
        user{
        id
        avatar
        username
        isFollowing
        isSelf
        bio
        }
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation editUser($nickname: String, $bio: String, $avatar: String) {
    editUser(nickname: $nickname, bio: $bio, avatar: $avatar)
  }
`;

export default withRouter(
  ({
    match: {
      params: { username },
    },
  }) => {
    const { data, loading } = useQuery(GET_USER, { variables: { username } });
    const [action, setAction] = useState("profile");
    const newNickname = useInput("");
    const newBio = useInput("");
    let newAvatar = "";
    const update = useMutation(UPDATE_PROFILE);
    const onSubmit = async (e) => {
      e.preventDefault();
      if (action === "update") {
        let formData = new FormData();
        let photoFile = document.getElementById("photo");
        formData.append("file", photoFile.files[0]);
        console.log(photoFile.files[0]);

        try {
          if (photoFile.files[0]) {
            const {
              data: { location },
            } = await axios.post("http://i3a508.p.ssafy.io:4000/api/upload", formData, {
              headers: {
                "content-type": "multipart/form-data",
              },
            });
            console.log(location);
            newAvatar = location;
          }
          console.log(newAvatar);
          const {
            data: { editUser },
          } = await update({
            variables: {
              nickname: newNickname.value,
              bio: newBio.value,
              avatar: newAvatar,
            },
          });
          console.log(editUser);
          if (!editUser) {
            toast.error("Fail...");
          } else {
            // 리로드 없이 갱신방법 알아보기
            window.location.reload();
            setTimeout(() => setAction("profile"), 3000);
          }
        } catch {
          toast.error("Fail");
        }
      }
    };
    return (
      <ProfilePresenter
        loading={loading}
        data={data}
        setAction={setAction}
        action={action}
        newNickname={newNickname}
        newBio={newBio}
        onSubmit={onSubmit}
      />
    );
  }
);
