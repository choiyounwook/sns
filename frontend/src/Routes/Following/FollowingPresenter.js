import React from "react";
import styled from "styled-components";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";
import { withRouter,Link } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';

const Wrapper = styled.div`
  height: 50vh;
`;

const Section = styled.div`
`;

const ELink = styled(Link)`
  color: inherit;
  margin-bottom: 10px;
`;

export default withRouter(({ nickname, loading, data, history, fetchMore }) => {
  var hasMore1 = true;

  const onLoadMore = () => {

    fetchMore({
      variables: {
        cur: data.followingUser.length,
        limit:8,
        id: nickname
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if(fetchMoreResult.followingUser.length<8)
        {
          console.log(`${hasMore1}`);
          hasMore1 = false;
          console.log(`${hasMore1}`);
        }
        if (!fetchMoreResult){ 
          return prev;}
        return Object.assign({}, prev, {
          followingUser: [...prev.followingUser, ...fetchMoreResult.followingUser]
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
  } else if (data && data.followingUser) {
    return (
      <Wrapper>
        <Section>
          {data.followingUser.length === 0 ? (
            <FatText text="No Users Found" />
          ) : (
            <InfiniteScroll
            dataLength={data.followingUser.length}
            next={onLoadMore}
            hasMore={hasMore1? true:false}
            loader={<Wrapper>
              <Loader />
            </Wrapper>}
          >{
            data.followingUser.map((user,idx) => (
              <UserCard
                key={idx}
                username={user.username}
                url={user.avatar}
                isSelf={user.isSelf}
                id={user.id}
                isFollowing={user.isFollowing}
                nickname={user.nickname}
              />
            ))}
            </InfiniteScroll>
          )}
        </Section>
      </Wrapper>
    );
  }
});

