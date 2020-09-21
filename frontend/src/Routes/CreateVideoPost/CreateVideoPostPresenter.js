import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Input from "../../Components/Input";
import VideoInput from "../../Components/VideoInput";
import Button from "../../Components/Button";
import { Dropdown } from "semantic-ui-react";
import Loader from "../../Components/Loader";
import ButtonTwo from "../../Components/ButtonTwo";

const Wrapper = styled.div`
  padding: 3vw;
  margin: 0 4vw;
  @media only screen and (min-width: ${(props) => props.theme.sm}) {
    margin: 0;
    padding: 0;
  }
`;
const Section = styled.div`
  width: 100%;
  margin: 15px auto;
  @media only screen and (min-width: ${(props) => props.theme.sm}) {
    width: 100%;
  }
`;

const PostBox = styled.div`
  width: 86vw;
  background-color: rgba(0, 0, 0, 0);
  margin: 3vw auto;
  border-radius: 10px;
  @media only screen and (min-width:${(props) => props.theme.sm}) {
    width: 600px;
`;

const ContentBox = styled.div`
  width: 86vw;
  @media only screen and (min-width: ${(props) => props.theme.sm}) {
    width: 100%;
  }
`;

const CaptionInput = styled.textarea`
  border: 0;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  width:86vw;
  height 20vh;
  font-size: 12px;
  padding: 0px 15px;
  resize: none;
  @media only screen and (min-width:${(props) => props.theme.sm}) {
    width: 100%;
  }
`;

const CompleteButton = styled.button`
  height: 10vh;
`;

export default ({
  action,
  id,
  setAction,
  setCreate,
  create,
  caption,
  onSubmit,
  relChallenger,
  tagChallenger,
  loading,
  data,
  setRelChallenger,
  setTagChallenger,
  cat,
  progress,
  setProgress,
}) => {
  const onSelectRelChallenger = (e, { value }) => {
    e.preventDefault();
    setRelChallenger(value);
  };
  const onSelectTagChallenger = (e, { value }) => {
    e.preventDefault();
    setTagChallenger(value);
  };
  const onRelChallenger = (e) => {
    setAction("CreatePost");
    onSubmit(e);
  };
  const onTagChallenger = (e) => {
    setAction("CreatePost");
    onSubmit(e);
  };
  const onUpload = (e) => {
    console.log(e);
    onSubmit(e);
  };
  const moveHref = () => { document.location.href = "/" };
  if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && data.followingUser) {
    const userOptions = data.followingUser.map((user, idx) => ({
      key: idx,
      value: user.id,
      text: `${user.nickname}(@${user.username})`,
    }));
    return (
      <Wrapper>
        <PostBox>
          {action === "CreatePost" && (
            <>
              <ContentBox>
                <VideoInput></VideoInput>
              </ContentBox>
              <CaptionInput placeholder="한마디 부탁해요!" {...caption} />
              <Section>
                <Dropdown
                  placeholder="누구와 함께 했나요?"
                  fluid
                  multiple
                  search
                  selection
                  defaultValue={tagChallenger}
                  options={userOptions}
                  onChange={onSelectTagChallenger}
                />
              </Section>
              <Section>
                <Dropdown
                  placeholder="다음 챌린처를 지목해주세요!"
                  fluid
                  multiple
                  search
                  selection
                  options={userOptions}
                  defaultValue={relChallenger}
                  onChange={onSelectRelChallenger}
                />
              </Section>
              {progress ? (
                <Button onClick={onUpload} text="업로드 중..." />
              ) : (
                <div style={{textAlign: "center"}}>
                <ButtonTwo onClick={onUpload} text="업로드" />
                <ButtonTwo onClick={moveHref}  text="취소" />
                </div>
              )}
            </>
          )}
        </PostBox>
      </Wrapper>
    );
  } else {
    return <Wrapper>하위</Wrapper>;
  }
};
