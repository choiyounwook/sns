import React from "react";
import styled from "styled-components";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import { withRouter } from "react-router-dom";
import Post from "../../Components/Post";
import CreatePhotoPost from "../CreatePhotoPost";
import CreateVideoPost from "../CreateVideoPost";
import CreateAudioPost from "../CreateAudioPost";
import CreateTextPost from "../CreateTextPost";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;
const EFatText = styled(FatText)`
  line-height: 600px;
`;
export default withRouter(
  ({
    loading,
    data,
    create,
    setCreate,
    selHashtags,
    setSelHashtags,
    pid,
    setPid,
    cat,
    setCat,
    isDetail,
  }) => {
    if (loading === true) {
      return (
        <Wrapper>
          <Loader />
        </Wrapper>
      );
    } else if (!create && data && data.seeChallenge) {
      return (
        <Wrapper>
          {data.seeChallenge.length === 0 ? (
            <EFatText text="챌린지를 찾을 수 없습니다." />
          ) : (
            data.seeChallenge.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                location={post.location}
                caption={post.caption}
                user={post.user}
                files={post.files}
                likeCount={post.likeCount}
                isLiked={post.isLiked}
                comments={post.comments}
                createdAt={post.createdAt}
                category={post.category}
                hashtags={post.hashtags}
                prePostCount={post.prePostCount}
                nextPostCount={post.nextPostCount}
                nextPosts={post.nextPosts}
                prePosts={post.prePosts}
                create={create}
                setCreate={setCreate}
                selHashtags={selHashtags}
                setSelHashtags={setSelHashtags}
                pid={pid}
                setPid={setPid}
                cat={cat}
                setCat={setCat}
                textContent={post.textContent}
                likes={post.likes}
                isDetail={isDetail}
              />
            ))
          )}
        </Wrapper>
      );
    } else if (create) {
      console.log("FEED", pid, selHashtags);
      return (
        <Wrapper>
          {cat === "image" ? (
            <CreatePhotoPost pid={pid} selHashtags={selHashtags} />
          ) : cat === "video" ? (
            <CreateVideoPost pid={pid} selHashtags={selHashtags} />
          ) : cat === "audio" ? (
            <CreateAudioPost pid={pid} selHashtags={selHashtags} />
          ) : (
            <CreateTextPost pid={pid} selHashtags={selHashtags} />
          )}
        </Wrapper>
      );
    }
  }
);
