import React, { useState } from "react";
import styled from "styled-components";
import {Frame} from "./Icons"
import Audio from "./Audio/Audio"
import AudioImageInput from "./AudioImageInput"

// const Audio = styled.iframe`
//   width:86vw;
//   height: 86vw;
//   background-color: violet;
// `
const AudioWrapper = styled.div`
  width:100%;
  height:100%;
`
const Blank = styled.div`
  width:100%;
  height:100%;
`

const AudioInput = () => {
  const [audio, setAudio] = useState({ preview: "", raw: "" });
  
  const handleChange = e => {
    if (e.target.files.length) {
      setAudio({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
      console.log(URL.createObjectURL(e.target.files[0]))
      console.log(e.target.files)
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
    <AudioWrapper>
        {audio.preview ? (
          <>
            <Audio
              videourl={audio.preview}
              imgurl="https://cdn.pixabay.com/photo/2016/06/16/09/34/death-1460981_960_720.png"
              />
          </>
        ) : (
          <label htmlFor="audio">
            <input
              type="file"
              id="audio"
              accept="audio/*"
              onChange={handleChange}
            />
          </label>
        )}

      {/* <br /> */}
      {/* <button onClick={handleUpload}>Upload</button> */}
      
    </AudioWrapper>
  );
}


export default AudioInput