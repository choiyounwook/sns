import React, { useState } from "react";
import styled from "styled-components";
import { Frame } from "./Icons";
import Carousel from "flat-carousel";
import "../Styles/carousel.css";

// const Img = styled.img`
//   width: 100%;
// `;
const Wrapper = styled.div`
  width: 25vh;
  height: 25vh;
  margin: auto;
  margin-bottom: 30px;
`;
const Blank = styled.div`
  width: 86vw;
  @media only screen and (max-width:${(props) => props.theme.sm}) {
  }
  @media only screen and (min-width:${(props) => props.theme.sm}) {
    width:400px;
  }
  `

const Img = styled.div`
  width:100%;
  height: 100%;
  @media only screen and (min-width:${(props) => props.theme.sm}) {
    // width:200px;
    // height: 200px;
  }
`

const ProfileImageInput = ({currentAvatar}) => {
  const [image, setImage] = useState({ preview: currentAvatar, raw: "" });

  const handleChange = (e) => {
    if (e.target.files.length) {
        setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };
// var previews = Object.keys(image.preview).map(key => image.preview[key])
console.log(image.preview);
console.log(1)
console.log(currentAvatar)
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
      <label htmlFor="photo" style={{
        height:"100%",
        width:"100%",
      }}>
        {/* {(image.preview || currentAvatar) ? ( */}
          {/* <> */}
              {/* {previews.map((pre, index) => ( */}
                <Img src={image.preview} alt={"dummy"} 
                style={{
                  backgroundImage: `url(${image.preview})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  borderRadius: `100%`,
                }}/>
              {/* ))} */}
            
          {/* </> */}
        {/* ) : ( */}
          {/* <Blank> */}
            {/* <Frame /> */}
          {/* </Blank> */}
        {/* )} */}
      <input
        type="file"
        id="photo"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleChange}
        // multiple
        />
        </label>
      {/* <br /> */}
      {/* <button onClick={handleUpload}>Upload</button> */}
    </Wrapper>
  );
};

export default ProfileImageInput;
