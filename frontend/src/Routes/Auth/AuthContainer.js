import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation, useQuery } from "react-apollo-hooks";
// import { sendConfirmEmail } from "../../utils";
import {
  LOG_IN,
  FIND_PASSWD,
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOCAL_LOG_IN,
  CONFIRM_EMAIL,
  SEE_USER,
  FIND_USER,
} from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const nickname = useInput("");
  const username = useInput("");
  const passwd = useInput("");
  const passwdCheck = useInput("");
  const secret = useInput("");
  const email = useInput("");
  const keyForVerify = useInput("");
  const [nickMessage, setNickMessage] =useState("");
  const [emailMessage, setEmailMessage] =useState("");
  const [pwdMessage, setPwdMessage] =useState("");
  const [pwdCMessage, setPwdCMessage] =useState("");
  const [userMessage, setUserMessage] =useState("");
  const [sumButton, setSumButton] =useState(true);
  const logIn = useMutation(LOG_IN, {
    variables: { email: email.value, passwd: passwd.value },
  });

  const findPasswdMutation = useMutation(FIND_PASSWD, {
    variables: { email: email.value },
  });

  const confirmEmailMutation = useMutation(CONFIRM_EMAIL, {
    variables:{
      email: email.value,
      keyForVerify: keyForVerify.value,
    }
  });

  const createAccountMutation = useMutation(CREATE_ACCOUNT, {
    variables: {
      nickname: nickname.value,
      email: email.value,
      username: username.value,
      passwd: passwd.value,
    },
  });
  const confirmSecretMutation = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secret: secret.value,
     
    },
  });
  const {data, fetchMore} = useQuery(FIND_USER,{
    variables:{
      email: email.value
    }
  })
  const localLogInMutation = useMutation(LOCAL_LOG_IN);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "" && passwd.value !== "") {
        try {
          const {
            data: { login: token },
          } = await logIn();
          if (token !== "" && token !== undefined) {
            // toast.success("Check your inbox for changing your password");
            // setTimeout(() => setAction("checkEmail"), 3000);
            // console.log(token)
            try {
              if(data){
                console.log("data:"+`${data.findUser.confirmEmail}`)
                if(`${data.findUser.confirmEmail}`=="false"){
                  // sendConfirmEmail(email.value, `${data.seeUser.keyForVerify}`)
                  setTimeout(() => setAction("confirmEmail"), 3000);
                  toast.error("Can't confirm email,check again");
                  // throw Error()
                }else{
                  localLogInMutation({ variables: { token } });
                  window.location.reload()
                }
                

              }
            } catch {
              toast.error("Can't confirm email,check again");
              
          }        
          } else {
            throw Error();
          }
        } catch {
          toast.error("Cant LogIn, try again");
        }
      } else if (email.value === "") {
        toast.error("Email is required");
      } else if (passwd.value === "") {
        toast.error("password is required");
      }
    } else if (action === "signUp") {
      if (
        nickname.value !== "" &&
        email.value !== "" &&
        passwd.value !== "" &&
        username.value !== ""
      ) {
        try {
          const {
            data: { createAccount },
          } = await createAccountMutation();
          console.log(email.value)
          console.log(createAccount);
          
          if (!createAccount) {
            toast.error("Can't create account");
          } else {
            console.log(createAccount)
            
            toast.success(
              "Account created! Check your inbox for authentication"
            );
            setTimeout(() => setAction("confirmEmail"), 3000);
          }
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error("All field are required");
      }
    } else if (action === "findPasswd") {
      if (email.value !== "") {
        try {
          const {
            data: { findPasswd },
          } = await findPasswdMutation();
          if (!findPasswd) {
            toast.error("This account does not exist, try again");
          } else {
            toast.success("Check your inbox for changing your password");
            setTimeout(() => setAction("logIn"), 3000);
          }
        } catch {
          toast.error("Can't request secret, try again");
        }
      }
    } else if (action === "confirm") {
      if (secret.value !== "") {
        try {
          const {
            data: { confirmSecret: token },
          } = await confirmSecretMutation();
          if (token !== "" && token !== undefined) {
            localLogInMutation({ variables: { token } });
            
          } else {
            throw Error();
          }
        } catch {
          toast.error("Cant confirm secret,check again");
        }
      }
    }else if(action==="confirmEmail"){
      if(keyForVerify.value !== ""){
        try {
          const {
            data:{confirmEmail: token}
          }=await confirmEmailMutation();
          if(token !=="" && token !== undefined ){
            toast.success(
              "Account created! Check your email for authentication"
            );
            localStorage.removeItem(token)
            setTimeout(()=>4000)
            window.location.reload()
            // localLogInMutation({variables:{email: email.value, passwd: passwd.value}});
          }else{
            throw Error();
          }
          
        } catch  {
          toast.error("Can't confirm email,check again");
        }
      }
    } else if(action==="checkEmail"){
    //   if(email.value !==""){
    //     try {
    //       const{
    //         data: {
    //           seeUser: confirm
    //         }
    //       }=await seeUserQuery();
    //       if(confirm){
    //         localLogInMutation({variables:{email: email.value, passwd: passwd.value}});
    //         window.location.reload()
    //       }else{
    //         throw Error()
    //       }
          
    //     } catch {
    //       toast.error("Can't confirm email,check again");
          
    //   }

    // }

    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      nickname={nickname}
      email={email}
      username={username}
      passwd={passwd}
      passwdCheck={passwdCheck}
      secret={secret}
      keyForVerify={keyForVerify}
      onSubmit={onSubmit}
      nickMessage={nickMessage} 
      setNickMessage={setNickMessage}
      emailMessage={emailMessage} 
      setEmailMessage={setEmailMessage}
      pwdMessage={pwdMessage} 
      setPwdMessage={setPwdMessage}
      pwdCMessage={pwdCMessage} 
      setPwdCMessage={setPwdCMessage}
      userMessage={userMessage} 
      setUserMessage={setUserMessage}
      sumButton={sumButton} 
      setSumButton={setSumButton}
    />
  );
};
