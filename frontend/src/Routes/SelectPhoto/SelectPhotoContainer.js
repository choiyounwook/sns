import React, { useState } from "react";
import styled from "styled-components";
import SelectPhotoPresenter from "./SelectPhotoPresenter";

const Wrapper = styled.div`
  margin-top: -60px;
  margin-bottom: 20px;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${(props) => props.theme.whiteBox}
  border-radius:0px;
  width: 100%;
  @media only screen and (max-width: ${(props) => props.theme.sm}) {
    max-width: 350px;
  }
  @media only screen and (min-width: ${(props) => props.theme.sm}) {
    max-width: 400px;
  }
  @media only screen and (min-width: ${(props) => props.theme.md}) {
    max-width: 450px;
  }
  @media only screen and (min-width: ${(props) => props.theme.lg}) {
    max-width: 500px;
  }
  @media only screen and (min-width: ${(props) => props.theme.xl}) {
    max-width: 600px;
  }
`;
export default () => {
  const [img, setImage] = useState(null);

  const onChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onClick = async () => {
    console.log(img);
  };

  return (
    <SelectPhotoPresenter>
      <input type="img" onChange={onChange} />
      <button onClick={onClick}>제출</button>
    </SelectPhotoPresenter>
  );
};
