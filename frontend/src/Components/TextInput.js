import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.textarea`
  border: 0;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: transparent;
  width: 100%;
  height: 100%;
  font-size: 30px;
  text-align: center;
  padding: 0px 15px;
  color:${(props) => props.fcolor}
`;

const TextArea = ({
  placeholder,
  required = true,
  value,
  onChange,
  type = "textarea",
  className,
}) => (
  <Container
    className={className}
    placeholder={placeholder}
    required={required}
    value={value}
    onChange={onChange}
    type={type}
  />
);

TextArea.propTypes = {
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default TextArea;
