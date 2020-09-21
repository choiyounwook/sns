import React, { useState } from "react";
import styled from "styled-components";
import {Frame} from "./Icons"

const Img = styled.iframe`
  width:86vw;
  height: 86vw;
  @media only screen and (min-width:${(props) => props.theme.sm}) {
    width:600px;
    height: 600px;
  }
`
const Wrapper = styled.div`
  width:100%;
  height:100%;
`
const Blank = styled.div`
  width: 86vw;
  @media only screen and (max-width:${(props) => props.theme.sm}) {
  }
  @media only screen and (min-width:${(props) => props.theme.sm}) {
    width:600px;
  }
`

const VideoInput = () => {
  const [image, setImage] = useState({ preview: "", raw: "" });
  
  const handleChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };
  
  // const handleUpload = async e => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("image", image.raw);
  
  //   await fetch("YOUR_URL", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "multipart/form-data"
  //     },
  //     body: formData
  //   });
  // };
  return (
    <Wrapper>
      <label htmlFor="video">
        {image.preview ? (
          <>
            <Img src={image.preview} alt={"dummy"}/>
            <label>다시선택!
              <input
                type="file"
                id="video"
                accept="video/*"
                style={{ display: "none" }}
                onChange={handleChange}
              />
            </label>
          </>
        ) : (
          <Blank>
            <Frame/>
          </Blank>
        )}
      </label>
      <input
        type="file"
        id="video"
        accept="video/*"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      {/* <br /> */}
      {/* <button onClick={handleUpload}>Upload</button> */}
    </Wrapper>
  );
}


export default VideoInput