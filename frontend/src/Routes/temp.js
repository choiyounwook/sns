import React, { useState } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Input from "../Components/Input";
import AudioImageInput from "../Components/AudioImageInput";
import Button from "../Components/Button";
import { Dropdown } from "semantic-ui-react";
import Loader from "../Components/Loader";
import {Frame} from "../Components/Icons"
import Audio from "../Components/Audio/Audio"
import { Modal } from "semantic-ui-react";
const Wrapper = styled.div`
  padding: 3vw;
  margin: 0 4vw;
  @media only screen and (max-width: ${(props) => props.theme.sm});
`;
const Section = styled.div`
  width: 100%;
  margin: 15px auto;
`;

const PostBox = styled.div`
  width: 86vw;
  background-color: rgba(0, 0, 0, 0);
  margin: 3vw auto;
  border-radius: 10px;
`;

const ContentBox = styled.div`
  width: 86vw;
  // height: 86vw;
`;

const CaptionInput = styled.textarea`
  border: 0;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  width:86vw;
  height 5vh;
  font-size: 12px;
  padding: 0px 15px;
  resize: none;
`;

const CompleteButton = styled.button`
  height: 10vh;
`;


const AudioWrapper = styled.div`
  width:100%;
  height:100%;
`
const Blank = styled.div`
  width:100%;
  height:100%;
`

const Img = styled.img`
  width:86vw;
  height: 86vw;
`


// const AudioInput = () => {


  // return (
  //   <AudioWrapper>
  //       {audio.preview ? (
  //         <>
  //           <input type="file" id="audio" accept="audio/*"></input>
  //         </>
  //       ) : (
  //         <label htmlFor="audio">
  //           <input
  //             type="file"
  //             id="audio"
  //             accept="audio/*"
  //             onChange={handleChange}
  //           />
  //         </label>
  //       )}

      
  //   </AudioWrapper>
  // );
// }

const ListItem = styled.div`
  width:30px;
  height:30px;
  background-color:black;
`


function exampleReducer(state, action) {
  switch (action.type) {
    case "close":
      return { open: false };
    case "open":
      return { open: true, size: action.size };
    default:
      throw new Error("Unsupported action...");
  }
}

const PostModal = ({videourl,imgurl}) => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;
  return (
    <>
      <ListItem onClick={() => dispatch({ type: "open", size: "tiny" })}></ListItem>
      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: "close" })}
      >
        <Modal.Content>
        <Audio
          videourl={videourl}
          imgurl={imgurl}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => dispatch({ type: "close" })}>
            모달끄기
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};




export default ({

}) => {
  const [audio, setAudio] = useState({ preview: "", raw: "" });

const audioHandleChange = e => {
  if (e.target.files.length) {
    setAudio({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0]
    });
    console.log(URL.createObjectURL(e.target.files[0]))
    console.log(e.target.files)
  }
};

  const [image, setImage] = useState({ preview: "", raw: "" });
  
  const handleChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
      console.log(URL.createObjectURL(e.target.files[0]))
      console.log(e.target.files)
    }
  }
  
    return (
      <Wrapper>
        <PostBox>
          <ContentBox>
            {/* <AudioImageInput /> */}
            <label htmlFor="photo">
        {image.preview ? (
          <Img src={image.preview} alt={"dummy"}/>
        ) : (
          <Blank><Frame/></Blank>
        )}
      </label>
      <input
        type="file"
        id="photo"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleChange}
      />
            {/* <AudioInput/> */}
            <input type="file" id="video" accept="audio/*"
            onChange={audioHandleChange}/>
        {audio.preview && image.preview && (<ListItem as={PostModal}
                  videourl={audio.preview}
                  imgurl={image.preview} />)}
          </ContentBox>
        </PostBox>
      </Wrapper>
    );
  }
