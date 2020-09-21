import React from "react";
import styled from "styled-components";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import Input from "../../Components/Input";
import useInput from "../../Hooks/useInput";
import { withRouter,Link } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import SquarePost from "../../Components/SquarePost";

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
  @media only screen and (max-width: ${(props) => props.theme.sm}) {
    grid-template-columns: repeat(3, 32vw);
    grid-template-rows: 32vw;
    grid-auto-rows: 32vw;
    justify-content:space-around;
  }
`;

const Hashtag = styled.div`
display: flex;
flex-basis: 100%;
align-items: center;
color: rgba(0, 0, 0, 0.35);
font-size: 30px;
margin: 20px 0px 20px;
`;

const Wrapper = styled.div`
height: 50vh;
`;
export default withRouter(({ searchTerm, loading, data, history, fetchMore,hasMore,setHasMore }) => {
  const onLoadMore = () => {
    fetchMore({
      variables: {
        cur: data.HashtagPost.length,
        limit:8,
        term: searchTerm
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if(fetchMoreResult.HashtagPost.length<8)
        {
          setHasMore(false);
        }
        if (!fetchMoreResult){ 
          return prev;}
        return Object.assign({}, prev, {
          HashtagPost: [...prev.HashtagPost, ...fetchMoreResult.HashtagPost]
        });
      }
    })

  };
  if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && data.HashtagPost) {
    return (
      <Wrapper>
        <Hashtag> {searchTerm}</Hashtag>
        <Posts>
          {data.HashtagPost.length === 0 ?
          (<FatText text="해당하는 챌린지 정보가 없습니다." />):(
            data.HashtagPost[0].posts.map((post) => {
              return(
              <SquarePost
                key={post.id}
                id={post.id}
                likeCount={post.likeCount}
                commentCount={post.comments.length}
                file={post.files[0]}
                file1={post.files[1]}
                files = {post.files}
                post={post}
              />
            )})
          )}
        </Posts>
      </Wrapper>
    );
  }
});

