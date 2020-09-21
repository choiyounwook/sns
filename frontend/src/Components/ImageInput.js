import React, { useState } from "react";
import styled from "styled-components";
import { Frame } from "./Icons";
import Carousel from "flat-carousel";
import "../Styles/carousel.css";

// const Img = styled.img`
//   width: 100%;
// `;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const Blank = styled.div`
  width: 86vw;
  @media only screen and (max-width:${(props) => props.theme.sm}) {
  }
  @media only screen and (min-width:${(props) => props.theme.sm}) {
    width:600px;
  }
  `

const Img = styled.div`
  width:86vw;
  height: 86vw;
  @media only screen and (min-width:${(props) => props.theme.sm}) {
    width:600px;
    height: 600px;
  }
`

const ImageInput = () => {
  const [image, setImage] = useState({ preview: "", raw: "" });

  const handleChange = (e) => {
    if (e.target.files.length) {
        setImage({
        preview: e.target.files,
        raw: e.target.files[0],
      });
    }
  };
var previews = Object.keys(image.preview).map(key => image.preview[key])
console.log(previews);

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
        {image.preview ? (
          <>
            <Carousel>  
              {previews.map((pre, index) => (
                // <img
                //   key={index}
                //   className="demo-item"
                //   src={URL.createObjectURL(pre)}
                // />
                <Img src={image.preview} alt={"dummy"} 
                style={{
                  backgroundImage: `url(${URL.createObjectURL(pre)}`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}/>
              ))}
            </Carousel>
            
          </>
        ) : (
          <label htmlFor="photo">
          <Blank>
            <Frame />
          </Blank>
          </label>
        )}
      <input
        type="file"
        id="photo"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleChange}
        multiple
      />
      {/* <br /> */}
      {/* <button onClick={handleUpload}>Upload</button> */}
    </Wrapper>
  );
};

export default ImageInput;
