import React, { useState } from "react";
import styled from "styled-components";
import {Frame} from "./Icons"

const Img = styled.img`
  width:86vw;
  height: 86vw;
`
const Wrapper = styled.div`
  width:100%;
  height:100%;
`
const Blank = styled.div`
  width:100%;
  height:100%;
`

const AudioImageInput = () => {
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

      {/* <br /> */}
      {/* <button onClick={handleUpload}>Upload</button> */}
    </Wrapper>
  );
}


export default AudioImageInput