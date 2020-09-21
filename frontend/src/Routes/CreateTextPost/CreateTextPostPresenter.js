import React, { useState } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
// import TextInput from "../../Components/TextInput";
import BTN from "../../Components/Button";
import { Dropdown } from "semantic-ui-react";
import Loader from "../../Components/Loader";
import ButtonTwo from "../../Components/ButtonTwo";
import {
  MaskedTextBox,
  NumericTextBox,
  Input,
  Switch,
  Slider,
  RangeSlider,
  SliderLabel,
  ColorGradient,
  ColorPalette,
  ColorPicker,
  Checkbox,
  RadioButton,
  RadioGroup,
} from "@progress/kendo-react-inputs";
import "@progress/kendo-react-intl";
import "@progress/kendo-drawing";
import "@progress/kendo-react-tooltip";
import "@progress/kendo-react-form";
import "@progress/kendo-react-dropdowns";
import "@progress/kendo-react-buttons";
import "@progress/kendo-react-labels";

import { Button, Popup } from "semantic-ui-react";
const Btn = styled(BTN)`
margin-bottom: 10px;
`;

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
  height: 20vh;
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

const TextInput = styled.textarea`
  border: 0;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: transparent;
  width: 100%;
  height: 100%;
  font-size: 30px;
  text-align: center;
  padding: 0px 15px;
  // color:${(props) => props.fcolor}
  resize: none;
`;

export default ({
  action,
  id,
  setAction,
  setCreate,
  create,
  textContent,
  onSubmit,
  relChallenger,
  tagChallenger,
  loading,
  caption,
  data,
  setRelChallenger,
  setTagChallenger,
  color,
  setColor,
  fcolor,
  setFColor,
  progress,
  setProgress,
}) => {
  const onSelectRelChallenger = (e, { value }) => {
    e.preventDefault();
    setRelChallenger(value);
    console.log(relChallenger);
  };
  const onSelectTagChallenger = (e, { value }) => {
    e.preventDefault();
    setTagChallenger(value);
    console.log(tagChallenger);
  };
  const moveHref = () => { document.location.href = "/" };

  const onUpload = (e) => {
    console.log(e);
    onSubmit(e);
  };
  const colorPick = (e) => {
    console.log(color);
    onSubmit(e);
  };
  const gradientSettings = {
    opacity: false,
  };

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
                <div
                  style={{
                    backgroundColor: color,
                    height: "100%",
                    transition: "ease all 500ms",
                  }}
                >
                  <TextInput
                    placeholder="Text Challenge"
                    {...textContent}
                    style={{ color: fcolor }}
                  />
                  {/* <textarea
                    style={
                      ({ color: fcolor },
                      { backgroundColor: "transparent" },
                      { fontSize: "30px" })
                    }
                    required
                  ></textarea> */}
                  {/* <textarea
                    placeholder="Text Challenge"
                    {...textContent}
                    style={{ color: fcolor }}
                  ></textarea> */}
                </div>
              </ContentBox>
              <div>
                <ColorPicker
                  defaultValue={color}
                  view={"gradient"}
                  onChange={(color) => {
                    setColor(color.value);
                  }}
                />
              </div>
              <div>
                <ColorPicker
                  defaultValue={fcolor}
                  view={"gradient"}
                  icon={"edit-tools"}
                  gradientSettings={gradientSettings}
                  onChange={(fcolor) => {
                    setFColor(fcolor.value);
                  }}
                />
              </div>
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
                <BTN onClick={onUpload} text="업로드 중..." />
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
