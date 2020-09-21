import React from "react";
import styled from "styled-components";

import Loader from "../../Components/Loader";

const Wrapper = styled.div`
  margin-top: -60px;
  margin-bottom: 20px;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
export default ({ img, onChange, onClick }) => {
  return (
    <Wrapper>
      <input type="img" onChange={onChange} />
      <button onClick={onClick}>제출</button>
    </Wrapper>
  );
};
