import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import LogoImage from "../../Styles/Images/tempLogo.png";
import {isEmail, isLength, isAlphanumeric} from "validator";
import {Logo} from "../../Components/Icons";

const LogoBox = styled.img`
  width: 100%;
  margin-bottom: 30px;
`;

const Wrapper = styled.div`
  margin-top: -60PX;
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
  @media only screen and (max-width:${(props) => props.theme.sm}) {
    max-width: 350px;
  };
  @media only screen and (min-width:${(props) => props.theme.sm}) {
    max-width: 400px;
  };
  @media only screen and (min-width:${(props) => props.theme.md}) {
    max-width: 450px;
  };
  @media only screen and (min-width:${(props) => props.theme.lg}) {
    max-width: 500px;
  };
  @media only screen and (min-width:${(props) => props.theme.xl}) {
    max-width: 600px;
  };
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  color: ${(props) => props.theme.livingCoral};
  cursor: pointer;
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
const LogoDiv = styled.div`
text-align: center;
margin-bottom: 30px;
fill: #FF6F61;
`;

export default (({
  action,
  nickname,
  email,
  passwd,
  passwdCheck,
  username,
  setAction,
  onSubmit,
  keyForVerify,
  nickMessage, 
  setNickMessage,
  emailMessage, 
  setEmailMessage,
  pwdMessage, 
  setPwdMessage,
  pwdCMessage, 
  setPwdCMessage,
  userMessage, 
  setUserMessage,
  sumButton, 
  setSumButton
}) => {
  if(action == "logIn")
  {
    return (
      <Wrapper>
      <Form1>
        <LogoDiv>
      <Logo width="200" height="200"/>
      </LogoDiv>
        <Helmet>
            <title>Log In | ChallengeSNS</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder={"Email"} {...email} type="email" />
            <Input placeholder={"Password"} {...passwd} type="password" />
            <Button text={"Log in"} />
          </form>
        </Form1>
        <StateChanger>
        {action === "logIn" ? (
          <>
            Don't have an account?{" "}
            <Link onClick={() => setAction("signUp")}>Sign up</Link>
            <br />
            <br />
            Did you forget your password?{" "}
            <Link onClick={() => setAction("findPasswd")}>Find password</Link>
          </>
        ) : (
          <>
            Have an account?{" "}
            <Link onClick={() => setAction("logIn")}>Log in</Link>
          </>
        )}
      </StateChanger>
        </Wrapper>
    );
  }else if(action == "signUp" ){
    if(isLength(nickname.value,{min:2,max:10})){
      setNickMessage("");
  
    }else{
      setNickMessage("닉네임은 2 글자 이상 10 글자 이하입니다.");}

    if(isEmail(email.value))
    {
      setEmailMessage("");
    }else{
      setEmailMessage("이메일 형식이 아닙니다.");
    }
    if(isLength(username.value,{min:2,max:10})&&isAlphanumeric(username.value)){
      setUserMessage("");
  
    }else{
      setUserMessage("아이디는 2 글자 이상 10 글자 이하이고, 영어와 숫자로 이루어져야 합니다.");}
    
    if(isLength(passwd.value,{min:8,max:13})){
      setPwdMessage("");
  
    }else{
      setPwdMessage("비밀번호는 8 자리 이상 13 자리 이하입니다.");}
      if(passwd.value==passwdCheck.value){
        setPwdCMessage("");
    
      }else{
        setPwdCMessage("비밀번호가 일치하지 않습니다.");
      }
      if(nickMessage==""&&emailMessage==""&&pwdMessage==""&&pwdCMessage==""&&userMessage=="")
      {
        console.log(`가능`);
        setSumButton(false);
      }else
      {
        console.log(`불가능`);
        setSumButton(true);
      }
    const onNick = (e) => {
      nickname.setValue(e.target.value);};
    const onEmail = (e) => {
        email.setValue(e.target.value);};
    const onPwd = (e) => {
        passwd.setValue(e.target.value);};
    const onPwdC = (e) => {
        passwdCheck.setValue(e.target.value);};
    const onUsername= (e) => {
        username.setValue(e.target.value);};

    return(
      <Wrapper>
      <Form1>
      <LogoDiv>
      <Logo width="200" height="200"/>
      </LogoDiv>
        <Helmet>
            <title>Sign Up | ChallengeSNS</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder={"Nickname"} {...nickname} onChange={onNick}/>
            <div style={{ color: "red", fontSize: "12px" }}>
              {nickMessage}
            </div>
            <Input placeholder={"Email"} {...email} type="email"onChange={onEmail} />
            <div style={{ color: "red", fontSize: "12px" }}>
              {emailMessage}
            </div>
            <Input placeholder={"Password"} {...passwd} type="Password" onChange={onPwd} />
            <div style={{ color: "red", fontSize: "12px" }}>
              {pwdMessage}
            </div>
            <label htmlFor="confirmPasswordInput"></label>
            <Input
              placeholder={"passwdCheck"}
              {...passwdCheck}
              type="Password"
              onChange={onPwdC}
            />
            <div style={{ color: "red", fontSize: "12px" }}>
              {pwdCMessage}
            </div>
            <Input placeholder={"ID"} {...username} onChange={onUsername} />
            <div style={{ color: "red", fontSize: "12px" }}>
              {userMessage}
            </div>
            <Button text={"Sign up"} Disabled={sumButton} />
          </form>
          </Form1>
          <StateChanger>
        {action === "logIn" ? (
          <>
            Don't have an account?{" "}
            <Link onClick={() => setAction("signUp")}>Sign up</Link>
            <br />
            <br />
            Did you forget your password?{" "}
            <Link onClick={() => setAction("findPasswd")}>Find password</Link>
          </>
        ) : (
          <>
            Have an account?{" "}
            <Link onClick={() => setAction("logIn")}>Log in</Link>
          </>
        )}
      </StateChanger>
          </Wrapper>
    );
  }else if(action == "findPasswd"){
    return(
      <Wrapper>
      <Form1>
      <LogoDiv>
      <Logo width="200" height="200"/>
      </LogoDiv>
        <Helmet>
            <title>Find Password | ChallengeSNS</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder={"Email"} {...email} type="email" />
            <Button text={"Find"} />
          </form>
          </Form1>
          <StateChanger>
        {action === "logIn" ? (
          <>
            Don't have an account?{" "}
            <Link onClick={() => setAction("signUp")}>Sign up</Link>
            <br />
            <br />
            Did you forget your password?{" "}
            <Link onClick={() => setAction("findPasswd")}>Find password</Link>
          </>
        ) : (
          <>
            Have an account?{" "}
            <Link onClick={() => setAction("logIn")}>Log in</Link>
          </>
        )}
      </StateChanger>
          </Wrapper>
    );
  }else if(action == "confirm")
  {
    return(
      <Wrapper>
      <Form1>
      <LogoDiv>
      <Logo width="200" height="200"/>
      </LogoDiv>
        <Helmet>
            <title>Confirm Secret | ChallengeSNS</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input
              placeholder="your new password"
              required
              {...passwd}
              type="Password"
            />
            <Button text={"Confirm"} />
          </form>
          </Form1>
          </Wrapper>
    );
  }else if(action == "confirmEmail")
  {
    return(
      <Wrapper>
      <Form1>
      <LogoDiv>
      <Logo width="200" height="200"/>
      </LogoDiv>
        <Helmet>
            <title>Confirm Email | ChallengeSNS</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input
              placeholder="write your code"
              required
              {...keyForVerify}
              type="Password"
            />
            <Button text={"Confirm"} />
          </form>
          </Form1>
          <StateChanger>
        {action === "logIn" ? (
          <>
            Don't have an account?{" "}
            <Link onClick={() => setAction("signUp")}>Sign up</Link>
            <br />
            <br />
            Did you forget your password?{" "}
            <Link onClick={() => setAction("findPasswd")}>Find password</Link>
          </>
        ) : (
          <>
            Have an account?{" "}
            <Link onClick={() => setAction("logIn")}>Log in</Link>
          </>
        )}
      </StateChanger>
          </Wrapper>
    );
  }

});
