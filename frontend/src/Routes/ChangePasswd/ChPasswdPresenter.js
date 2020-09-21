import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import {isEmail, isLength, isAlphanumeric} from "validator";
import { Form } from 'semantic-ui-react'

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

const Form1 = styled(Box)`
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

export default (({ 
  passwd, 
  passwdCheck, 
  newPasswd, 
  onSubmit,
  passMessage,
  setPassMessage,
  newpassMessage, 
  setNewpassMessage,
  passCMessage, 
  setPassCMessage,
  button1, 
  setButton1,
  setPasswd,
  setNewPasswd,
  setPasswdCheck
}) => {
  if(isLength(passwd,{min:8,max:13})){
    setPassMessage("");

  }else{
    setPassMessage("비밀번호는 8 자리 이상 13 자리 이하입니다.");
  }
  if(isLength(newPasswd,{min:8,max:13})){
    setNewpassMessage("");

  }else{
    setNewpassMessage("비밀번호는 8 자리 이상 13 자리 이하입니다.");
  }
  if(passwdCheck==newPasswd){
    setPassCMessage("");

  }else{
    setPassCMessage("비밀번호가 일치하지 않습니다.");
  }
  if(passMessage==""&&passCMessage==""&&newpassMessage=="")
  {
    setButton1(false);
  }else
  {
    setButton1(true);
  }

  const Cpwd = (e) => {
    setPasswd(e.target.value);};

    const Npwd = (e) => {
      setNewPasswd(e.target.value);
      };
    const NpwdC = (e) => {
      setPasswdCheck(e.target.value);
    };
  return (
    <Wrapper>
    <Form1>
      {
        <>
          <Helmet>
            <title>Change Password | ChallengeSNS</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder={"Password"} {...passwd} type="Password" onChange={Cpwd} />
            <div style={{ color: "red", fontSize: "12px" }}>
              {passMessage}
            </div>
            <Input
              placeholder={"New Password"}
              {...newPasswd}
              type="Password"
              onChange={Npwd}
            />
            <div style={{ color: "red", fontSize: "12px" }}>
              {newpassMessage}
            </div>
            <label htmlFor="confirmPasswordInput"></label>
            <Input
              placeholder={"passwdCheck"}
              {...passwdCheck}
              type="Password"
              onChange={NpwdC}
            />
             <div style={{ color: "red", fontSize: "12px" }}>
              {passCMessage}
            </div>
            <Button text={"Change"} Disabled={button1}/>
          </form>
        </>
      }
    </Form1>
  </Wrapper>
  );
});
