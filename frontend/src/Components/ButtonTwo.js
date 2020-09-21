import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.button`
  width: 45%;
  margin-left: 5px;
  // max-width:60px;
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  background-color: ${(props) => props.theme.livingCoral};
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  cursor: pointer;
  @media only screen and (max-width: ${(props) => props.theme.sm}) {
  }
`;

const Button = ({ text, onClick, Disabled }) => (
  <Container onClick={onClick} disabled={Disabled}>{text}</Container>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button;
