import React from "react";
import styled from "styled-components";

export default function Play(props) {
  const { handleClick } = props;
  
  return (
    <button className="player__button" onClick={() => handleClick()}>
      재생
    </button>
  );
}
