import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.button`
  width: 100%;
  max-width:60px;
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  background-color: ${(props) => props.theme.livingCoral};
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  cursor: pointer;
  margin:10px
  @media only screen and (max-width: ${(props) => props.theme.sm}) {
  }
`;

const Button = ({ text, onClick }) => (
  <Container onClick={onClick}>{text}</Container>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
};


export default ({ isFollowing, onClick }) => (
  <Button text={isFollowing ? "Unfollow" : "Follow"} onClick={onClick} style={{
    maxWidth:"60px",
  }}/>
);
