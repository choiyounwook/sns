import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Input from "../Components/Input";
import Button from "../Components/Button";

const Wrapper = styled.div`
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
  max-width: 350px;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

export default ({ passwd, passwdCheck, newPasswd, onSubmit }) => (
  <Wrapper>
    <Form>
      {
        <>
          <Helmet>
            <title>Change Password | ChallengeSNS</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder={"Password"} {...passwd} type="Password" />
            <Input
              placeholder={"New Password"}
              {...newPasswd}
              type="Password"
            />
            <label htmlFor="confirmPasswordInput"></label>
            <Input
              placeholder={"passwdCheck"}
              {...passwdCheck}
              type="Password"
            />
            <Button text={"Change"} />
          </form>
        </>
      }
    </Form>
  </Wrapper>
);
