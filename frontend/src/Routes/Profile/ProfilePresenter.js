import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Input from "../../Components/NotRequiredInput";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import FatText from "../../Components/FatText";
import FollowButton from "../../Components/FollowButton";
import SquarePost from "../../Components/SquarePost";
import Button from "../../Components/Button";
import ButtonTwo from "../../Components/ButtonTwo";
import ProfileImageInput from "../../Components/ProfileImageInput";
import { Link } from "react-router-dom";
import DropdownMenu from "../../Components/UserSetting";
import { Divider, Statistic } from 'semantic-ui-react';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (max-width: ${(props) => props.theme.sm}) {

  }
`;
const Button1 = styled(Button)`
width: 45px;
`;

const UpdateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width:100%
  height: 80vh;
  @media only screen and (min-width:${(props) => props.theme.sm}) {
    // width:600px;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 10px auto;
  @media only screen and (max-width: ${(props) => props.theme.sm}) {
    width: 100%;
  }
`;

const HeaderColumn = styled.div`
  width: 30%;
`;
const HeaderColumn1 = styled.div`
  width: 70%;
`;

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled.span`
  font-size: 30px;
  display: block;
  @media only screen and (max-width:${(props) => props.theme.sm}) {
    font-size: 5vw;
    margin-left: 10px;
  }
`;

const Counts = styled.ul`
  margin: 15px 0px;
  @media only screen and (max-width:${(props) => props.theme.sm}) {
    font-size: 5px;
  }

`;

const Count = styled.li`
  font-size: 4vw;
  margin: 5px
  &:not(:last-child) {
    margin-right: 10px;
  }
  @media only screen and (min-width:${(props) => props.theme.sm}) {
    font-size :25px;
  }
`;

const AvatarColumn = styled.div`
  margin: auto
  width:100px
  @media only screen and (min-width:${(props) => props.theme.sm}) {
    width:unset;
  }
`;

const NickName = styled(FatText)`
  font-size: 4vw;
  display: block;
  margin-bottom: 5px;
  margin-left: 10vw;
  @media only screen and (min-width:${(props) => props.theme.sm}) {
    font-size : 20px;
  }
`;

const Bio = styled.p`
  font-size: 3vw;
  display: block;
  margin-left: 8vw;
  margin-top:3vw;
  @media only screen and (min-width:${(props) => props.theme.sm}) {
    font-size : 16px;
    margin-top: 10px;
  }
`;

const Posts = styled.div`
  display: grid;
  margin: 0 auto;
  grid-template-columns: repeat(3, 195px);
  grid-template-rows: 195px;
  grid-auto-rows: 195px;
  justify-content:space-around;
  @media only screen and (min-width:${(props) => props.theme.sm}) {
    width: 470px;
    grid-gap: 3px;
  }
  @media only screen and (max-width: ${(props) => props.theme.sm}) {
    grid-template-columns: repeat(3, 32vw);
    grid-template-rows: 32vw;
    grid-auto-rows: 32vw;
  }
`;
const ELink = styled(Link)`
  color: inherit;
  margin-bottom: 5px;
  text-align: center;
  font-size: x-large;
  &:hover {
    color: ${(props) => props.theme.livingCoral};
  }
`;

const ProfilUpdateBox = styled.div`
  text-align: center;
  padding: 10px;
  font-size: 20px;
  border: 1px solid rgba(0,0,0,0.1);
  margin: 1vw auto;
  border-radius: 10px;
  background-color:rgba(255,101,97,0.66);
  color:white;
  @media only screen and (min-width:${(props) => props.theme.sm}) {
    width: 80%;
  }
  &:hover {
    background-color:rgba(255,101,97);
    opacity: 0.88;
    filter: alpha(opacity=88);
    color:white;
    zoom: 1;

`;

const MyLabel = styled.div`
  font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
  font-size: 1em;
  font-weight: 700;
  color: rgba(0,0,0,.87);
  text-transform: uppercase;
  text-align: center;
  @media only screen and (max-width:${(props) => props.theme.sm}) {
    font-size: 3vw;
  }
`

const Box = styled.div`
  ${(props) => props.theme.whiteBox}
  border-radius:0px;
  width: 100%;
  @media only screen and (max-width: ${(props) => props.theme.sm}) {
    max-width: 400px;
  }
  @media only screen and (min-width: ${(props) => props.theme.sm}) {
    max-width: 600px;
  }
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin: auto 0;
  text-align: center;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

const EFatText = styled(FatText)`
  line-height: 500px;
`;

export default ({
  loading,
  data,
  setAction,
  action,
  onSubmit,
  newBio,
  newNickname,
}) => {
  if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (action === "update" && data && data.seeUser) {
    const {
      seeUser: { avatar, nickname, bio },
    } = data;
    console.log(avatar)
    return (
      <UpdateWrapper>
        <Form>
          <Helmet>
            <title>Update Profile | ChallengeSNS</title>
          </Helmet>
          <form >
            {/* <Avatar size="lg" url={avatar}> */}
            <ProfileImageInput currentAvatar = {avatar}></ProfileImageInput>
            {/* </Avatar> */}
            <Input placeholder={nickname} {...newNickname} />
            <Input placeholder={bio} {...newBio} />
            <ButtonTwo text={"SAVE"} onClick={onSubmit} />
            <ButtonTwo text={"CANCEL"} onClick={() => setAction("profile")}/>
          </form>
        </Form>
      </UpdateWrapper>
    );
  } else if (!loading && data && data.seeUser) {
    const {
      seeUser: {
        id,
        avatar,
        username,
        nickname,
        isFollowing,
        isSelf,
        bio,
        followingCount,
        followersCount,
        postsCount,
        posts,
      },
    } = data;
    return (
      <div>
        <Helmet>
          <title>{username} | ChallengeSNS</title>
        </Helmet>
        <Header>
          <HeaderColumn>
            <AvatarColumn>
              <Avatar size="Profile" url={avatar} />
            </AvatarColumn>
          </HeaderColumn>
          <HeaderColumn1>
            <UsernameRow>
              {isSelf ? (
                <DropdownMenu username={username} />
              ) : (
                <>
                  <Username>{username}</Username>
                  <FollowButton isFollowing={isFollowing} id={id} />
                </>
              )}
            </UsernameRow>
            <Counts>
            <Statistic.Group size='mini'>
          <Statistic style={{margin: "auto" , marginRight: "0px"}}>
              <Statistic.Value style={{marginBottom: "5px"}}>{postsCount}</Statistic.Value>
            <MyLabel>Challenge</MyLabel>
          </Statistic>
          <Statistic style={{margin: "auto" ,}}>
          <ELink to={`/following?${id}`}>
            <Statistic.Value >{followingCount}</Statistic.Value>
           </ELink>
            <MyLabel >following</MyLabel>
          </Statistic>
          <Statistic style={{margin: "auto" , marginLeft: "0px"}}>
          <ELink to={`/follower?${id}`}>
            <Statistic.Value >{followersCount}</Statistic.Value>
            </ELink>
            <MyLabel>follower</MyLabel>
          </Statistic>
        </Statistic.Group>
            </Counts>
          </HeaderColumn1>
          {}
        </Header>
        {nickname ? (
          <NickName text={nickname} />
        ) : (
          <NickName text="nickname 없음" />
        )}
        {bio ? <Bio>{bio}</Bio> : <Bio>자기소개 없음</Bio>}
        {isSelf ? (
          <ProfilUpdateBox onClick={() => setAction("update")}>
            프로필 수정
          </ProfilUpdateBox>
        ) : (
          <></>
        )}

        {data.seePost &&
          (data.seePost.length === 0 ? (
            <Wrapper>
              <EFatText text="현재 존재하는 챌린지가 없습니다." />
            </Wrapper>
          ) : (
            <Posts>
              {data.seePost.map((post) => {
                return (
                  <SquarePost
                    key={post.id}
                    id={post.id}
                    likeCount={post.likeCount}
                    commentCount={post.comments.length}
                    file={post.files[0]}
                    file1={post.files[1]}
                    files={post.files}
                    post={post}
                  />
                );
              })}
            </Posts>
          ))}
      </div>
    );
  }
  return null;
};
