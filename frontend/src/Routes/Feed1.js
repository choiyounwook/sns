import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Post from "../Components/Post";
import InfiniteScroll from 'react-infinite-scroll-component';

const FEED_QUERY = gql`
  {

    seeFeed{
      id
      location
      caption
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
    }

  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
  @media only screen and (max-width: ${(props) => props.theme.sm}) {
    min-height: 100vh;
  }
`;

export default () => {
  const { data, loading,fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      limit: 5 ,
      cur: 0
    }
  });

  const onLoadMore = () => {

    fetchMore({
      variables: {
        cur: data.seeFeed.length,
        limit:5
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        console.log(`${data.seeFeed.length}`)
        if(fetchMoreResult.seeFeed.length<8)
        {
          
        }
        if (!fetchMoreResult){ 
          return prev;}
        return Object.assign({}, prev, {
          seeFeed: [...prev.seeFeed, ...fetchMoreResult.seeFeed]
        });
      }
    })

  };
  return (
    <Wrapper>
      <Helmet>
        <title>Feed | ChallengeSNS</title>
      </Helmet>
      {loading && <Loader />}
      {!loading &&
        data &&
        data.seeFeed &&
        <InfiniteScroll
            dataLength={data.seeFeed.length}
            next={onLoadMore}
            hasMore={true}
            loader={<Wrapper>
              <Loader />
            </Wrapper>}
          >{
        data.seeFeed.map((post) => (
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
          />
        ))}
        </InfiniteScroll>}
    </Wrapper>
  );
};
