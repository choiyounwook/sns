import React,{ useState } from "react";
import DelAccPresenter from "./ChPasswdPresenter";
import { useMutation } from "react-apollo-hooks";
import { SET_PASSWD } from "./ChPasswdQueries";
import { toast } from "react-toastify";
import useInput from "../../Hooks/useInput";

export default () => {
  const [passwd, setPasswd] = useState("");
  const [newPasswd, setNewPasswd ] = useState("");
  const [passwdCheck, setPasswdCheck] = useState("");
  const [passMessage, setPassMessage] = useState("");
  const [newpassMessage, setNewpassMessage] = useState("");
  const [passCMessage, setPassCMessage] = useState("");
  const [button1, setButton1] = useState(true);
  const setPasswd1 = useMutation(SET_PASSWD, {
    variables: { passwd: passwd, newPasswd: newPasswd },
  });

  const onSubmit = async (e) => {
    if (passwd !== "") {
      try {
        const {
          data: { changePasswd },
        } = await setPasswd1();
        console.log(changePasswd);
        if (!changePasswd) {
          toast.error("Error");
          throw Error();
        } else {
          //변경완료 확인창 띄우기
          // setTimeout(() => setAction("profile"), 3000);
          window.location.href = "/";
        }
      } catch {
        toast.error("패스워드가 일치하지 않습니다");
      }
    } else if (
      passwd === "" &&
      newPasswd === "" &&
      passwdCheck === ""
    ) {
      toast.error("password is required");
    }
  };
  return (
    <DelAccPresenter
      passwd={passwd}
      newPasswd={newPasswd}
      passwdCheck={passwdCheck}
      onSubmit={onSubmit}
      passMessage={passMessage} 
      setPassMessage={setPassMessage}
      newpassMessage={newpassMessage} 
      setNewpassMessage={setNewpassMessage}
      passCMessage={passCMessage} 
      setPassCMessage={setPassCMessage}
      button1={button1}
      setButton1={setButton1}
      setPasswd={setPasswd}
      setNewPasswd={setNewPasswd}
      setPasswdCheck={setPasswdCheck}
    />
  );
};
