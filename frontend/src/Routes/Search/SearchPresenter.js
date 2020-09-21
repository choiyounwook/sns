import React from "react";
import styled from "styled-components";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import NewUserCard from "../../Components/NewUserCard";
import HashtagCard from "../../Components/HashtagCard";
import Input from "../../Components/Input";
import useInput from "../../Hooks/useInput";
import { withRouter,Link } from "react-router-dom";
import { Header } from 'semantic-ui-react'

const SearchUserCard = styled(NewUserCard)`
`;

const SearchMore = styled(FatText)`
  color:#999999;
`;

const Wrapper = styled.div`
  @media only screen and (max-width:${(props) => props.theme.sm}) {
  };
`;
const SearchInput = styled(Input)`
  background-color: ${(props) => props.theme.bgColor};
  padding: 5px;
  font-size: 14px;
  border-radius: 15px;
  height: 30px;
  text-align: center;
  width: 70%;
  margin: 10px auto;
  display: block;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
`;
const Section = styled.div`
  margin-bottom: 50px;

  @media only screen and (max-width:${(props) => props.theme.sm}) {

  };
`;
const UserSection = styled.div`
  margin-bottom: 50px;
  display: grid;
  justify-content:space-around;
  grid-template-columns: repeat(4, 150px);
  grid-template-rows: 220px;
  grid-auto-rows: 220px;
  max-width:700px;
  margin:15px auto;
  @media only screen and (max-width:${(props) => props.theme.sm}) {
    grid-template-rows: 210px;
    grid-auto-rows: 210px;
    grid-template-columns: repeat(3, 32vw);
  };
`;
const PostSection = styled(Section)`
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;
const ELink = styled(Link)`
  color: inherit;
  margin-bottom: 10px;
`;
const EFatText = styled(FatText)`
line-height:300px;
align-items: center;
`;
const EWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (max-width: ${(props) => props.theme.sm}) {
    min-height: 100vh;
  }
`;
const SDiv = styled.div`
max-width:700px;
margin:15px auto;
`;
const AddDiv = styled.div`
max-width:700px;
margin:15px auto;
text-align: right;
`;
export default withRouter(({ searchTerm, loading, data, history}) => {


  const search =(searchTerm?useInput(searchTerm):useInput(""));
  const onSearchSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?term=`+encodeURIComponent(search.value));
  };
  console.log(data)
  if (searchTerm === undefined) {
    return (
      <Wrapper>
        <form onSubmit={onSearchSubmit}>
      <SearchInput
        value={search.value}
        onChange={search.onChange}
        placeholder="Search..."
      />
      </form>
      </Wrapper>
    );
  } else if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && data.searchUser && data.searchHashtag) {
    return (
      <Wrapper>
        <form onSubmit={onSearchSubmit}>
          <SearchInput
            value={search.value}
            onChange={search.onChange}
            placeholder="Search..."
          />
        </form>
        <SDiv>
          <Header as='h3' dividing>
            챌린저
          </Header>
        </SDiv>
        <Section>
          {data.searchUser.length === 0 ? (
            <EWrapper>
            <EFatText text="검색된 챌린저가 없습니다." />
            </EWrapper>
          ) : (
            <UserSection>
            {data.searchUser.map((user,idx) => (
              <SearchUserCard
                key={idx}
                username={user.username}
                isFollowing={user.isFollowing}
                url={user.avatar}
                isSelf={user.isSelf}
                id={user.id}
                nickname={user.nickname}
                bio={user.bio}
              />
            ))}
            </UserSection>
          )}
          {data.searchUser.length === 0 ? (
            console.log(``)
          ) : (
            <AddDiv>
              <ELink to={`/search-user?term=${searchTerm}`}>
                <SearchMore text="더 많은 챌린저 보러 가기!"/>
              </ELink>
            </AddDiv>
          )}
        </Section>
        <SDiv>
        <Header as='h3' dividing>
            챌린저
          </Header>
        </SDiv>
        <PostSection>
          {data.searchHashtag.length === 0 ? (
            <EWrapper>
               <EFatText text="검색된 챌린지가 없습니다." />
             </EWrapper>
          ) : (
            data.searchHashtag.map((hashtag,idx) => (
              <HashtagCard
              key={idx}
              username={hashtag.tag_name}
              postCount={hashtag.postCount}
              posts={hashtag.posts.slice(0,3)}
            />
            ))
          )}
            {data.searchHashtag.length === 0 ? (
            console.log(``)
          ) : (
            <AddDiv>
            <ELink to={`/search-challenge?term=${searchTerm}`}>
            <SearchMore text="다른 챌린지 보러 가기!"/>
           </ELink>
           </AddDiv>
          )}
        </PostSection>

      </Wrapper>
    );
  }
});

