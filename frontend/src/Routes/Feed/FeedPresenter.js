import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Post from "../../Components/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { withRouter, Link } from "react-router-dom";
import FatText from "../../Components/FatText";
import CreatePhotoPost from "../CreatePhotoPost";
import CreateVideoPost from "../CreateVideoPost";
import CreateAudioPost from "../CreateAudioPost";
import CreateTextPost from "../CreateTextPost";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
  @media only screen and (max-width: ${(props) => props.theme.sm}) {
    min-height: 100vh;
  }
`;
const EFatText = styled(FatText)`
line-height:500px;
align-items: center;
`;
export default withRouter(
  ({
    loading,
    data,
    history,
    fetchMore,
    hasMore,
    setHasMore,
    create,
    setCreate,
    selHashtags,
    setSelHashtags,
    pid,
    setPid,
    cat,
    setCat,
  }) => {
    const onLoadMore = () => {
      fetchMore({
        variables: {
          cur: data.seeFeed.length,
          limit: 5,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (fetchMoreResult.seeFeed.length < 5) {
            setHasMore(false);
          }
          if (!fetchMoreResult) {
            return prev;
          }
          return Object.assign({}, prev, {
            seeFeed: [...prev.seeFeed, ...fetchMoreResult.seeFeed],
          });
        },
      });
    };
    if (loading === true) {
      return (
        <Wrapper>
          <Loader />
        </Wrapper>
      );
    } else if (!create && data && data.seeFeed) {
      return (
        <Wrapper>
          {data.seeFeed.length === 0 ? (
            <EFatText text="현재 존재하는 챌린지가 없습니다." />
          ) : (
            <InfiniteScroll
              dataLength={data.seeFeed.length}
              next={onLoadMore}
              hasMore={hasMore}
              style={{
                overflow:"none",
                maxWidth:"400px",
                width:"100vw",
              }}
              loader={
                <Wrapper>
                  <Loader />
                </Wrapper>
              }
            >
              {data.seeFeed.map((post) => {
                return (
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
                    likes={post.likes}
                    textContent={post.textContent}
                    create={create}
                    setCreate={setCreate}
                    selHashtags={selHashtags}
                    setSelHashtags={setSelHashtags}
                    pid={pid}
                    setPid={setPid}
                    cat={cat}
                    setCat={setCat}
                  />
                );
              })}
            </InfiniteScroll>
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
