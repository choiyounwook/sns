import React, { useState } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Input from "../../Components/Input";
import ImageInput from "../../Components/ImageInput";
import Button from "../../Components/Button";
import { Dropdown } from "semantic-ui-react";
import Loader from "../../Components/Loader";



const Wrapper = styled.div`
  padding: 3vw;
  margin: 0 4vw;
  @media only screen and (max-width:${(props) => props.theme.sm})
`;
const Section = styled.div`
  width: 100%;
  margin: 15px auto;
`;

const PostBox = styled.div`
  width: 100%;
  background-color: rgba(0,0,0,0);
  margin: 3vw auto;
  border-radius: 10px;
`;

const ContentBox = styled.div`
  width: 100%;
`;


const CaptionInput = styled.textarea`
  border: 0;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  width:100%;
  height 10vh;
  font-size: 12px;
  padding: 0px 15px;
  resize: none;
`;

const CompleteButton = styled.button`
  height:10vh;
`;

const HashTags = styled.div`

`
const HashTag = styled.span`

`

export default ({
  action,
  id,
  setAction,
  setCreate,
  create,
  audio,
  onSubmit,
  relChallenger,
  tagChallenger,
  loading,
  data,
  setRelChallenger,
  setTagChallenger,
  category,
  pid,
  hashtags,
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
    setCreate(true);
    console.log(e)
    onSubmit(e);
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
    if (category === "video") {
      return (
        <Wrapper>
          <PostBox>
          {action === "CreatePost" && (
            <>
            <ContentBox>
              <ImageInput></ImageInput>
            </ContentBox>
            <h1>"video"</h1>
            <CaptionInput
              placeholder="video"/>
            <Section>
              <Dropdown
                placeholder="video"
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
                  placeholder="video"
                  fluid
                  multiple
                  search
                  selection
                  options={userOptions}
                  defaultValue={relChallenger}
                  onChange={onSelectRelChallenger}
                />
              </Section>
            <Button onClick={onUpload} text="업로드"/>
              
            </>)}
          {action !== "CreatePost" ? (<h1>하위</h1>) : (<h1>바위</h1>)}
          </PostBox>
        </Wrapper>
      );
    } else if (category === "audio") {
      return (
        <Wrapper>
          <PostBox>
          {action === "CreatePost" && (
            <>
            <ContentBox>
              <ImageInput></ImageInput>
            </ContentBox>
            <h1>"audio"</h1>
            <CaptionInput
              placeholder="audio"/>
            <Section>
              <Dropdown
                placeholder="audio"
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
                  placeholder="audio"
                  fluid
                  multiple
                  search
                  selection
                  options={userOptions}
                  defaultValue={relChallenger}
                  onChange={onSelectRelChallenger}
                />
              </Section>
            <Button onClick={onUpload} text="업로드"/>
              
            </>)}
          {action !== "CreatePost" ? (<h1>하위</h1>) : (<h1>바위</h1>)}
          </PostBox>
        </Wrapper>
      );

    } else if (category === "image") {
      return (
        <Wrapper>
          <PostBox>
          {action === "CreatePost" && (
            <>
            <ContentBox>
              <ImageInput></ImageInput>
            </ContentBox>
          <h1>pid : {pid}</h1>
          <h1>category : {category}</h1>
          <HashTags>
          {hashtags.map(hashtag => (
            <HashTag key={hashtag.id}>
              {hashtag.tag_name}
            </HashTag>
          ))}
        </HashTags>
          <h1>한마디 남기기</h1>
            <CaptionInput
              placeholder="image image"/>
            <Section>
              <Dropdown
                placeholder="text"
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
                  placeholder=" image image image image image image image image image image image image"
                  fluid
                  multiple
                  search
                  selection
                  options={userOptions}
                  defaultValue={relChallenger}
                  onChange={onSelectRelChallenger}
                />
              </Section>
            <Button onClick={onUpload} text="업로드"/>
              
            </>)}
          </PostBox>
        </Wrapper>
      );

    } else {
      return (
        <Wrapper>
          <PostBox>
          {action === "CreatePost" && (
            <>
            <ContentBox>
              <ImageInput></ImageInput>
            </ContentBox>
            <CaptionInput
              placeholder="text text text text text text vtext text vtext text"/>
            <Section>
              <Dropdown
                placeholder="text text text text text text vtext text vtext text"
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
                  placeholder="text text text text text text vtext text vtext text"
                  fluid
                  multiple
                  search
                  selection
                  options={userOptions}
                  defaultValue={relChallenger}
                  onChange={onSelectRelChallenger}
                />
              </Section>
            <Button onClick={onUpload} text="업로드"/>
              
            </>)}
          {action !== "CreatePost" ? (<h1>하위</h1>) : (<h1>바위</h1>)}
          </PostBox>
        </Wrapper>
      );

    }
  } else {
      return (
      <Wrapper>
        하위
      </Wrapper>
      )
    }
};










// return (
//   <Wrapper>
//     <button onCLick={() => setCategory("video")}>video</button>
//     <button onCLick={() => setCategory("audio")}>audio</button>
//     <button onCLick={() => setCategory("photo")}>photo</button>
//     <button onCLick={() => setCategory("text")}>text</button>
//     <PostBox>
//     {action === "CreatePost" && (
//       <>
//       <ContentBox>
//         <ImageInput></ImageInput>
//       </ContentBox>
//       <h1>{category} {category}</h1>
//       <CaptionInput
//         placeholder={category}/>
//       <Section>
//         <Dropdown
//           placeholder={category}
//           fluid
//           multiple
//           search
//           selection
//           defaultValue={tagChallenger}
//           options={userOptions}
//           onChange={onSelectTagChallenger}
//         />
//       </Section>
//       <Section>
//           <Dropdown
//             placeholder={category}
//             fluid
//             multiple
//             search
//             selection
//             options={userOptions}
//             defaultValue={relChallenger}
//             onChange={onSelectRelChallenger}
//           />
//         </Section>
//       <Button onClick={onUpload} text="업로드"/>
        
//       </>)}
//     {action !== "CreatePost" ? (<h1>하위</h1>) : (<h1>바위</h1>)}
//     </PostBox>
//   </Wrapper>
// );