import React from "react";
import DelAccPresenter from "./DelAccPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { DEL_USER, LOG_OUT } from "./DelAccQueries";
import { toast } from "react-toastify";

export default () => {
  const passwd = useInput("");

  const deleteAcc = useMutation(DEL_USER, {
    variables: { passwd: passwd.value },
  });
  const logout = useMutation(LOG_OUT);

  const onSubmit = async (e) => {
    if (passwd.value !== "") {
      try {
        const {
          data: { deleteAccount },
        } = await deleteAcc();
        console.log(deleteAccount);
        if (deleteAccount) {
          // 추후 수정(탈퇴 안내 띄우고 LOG_OUT 호출하기)
          localStorage.removeItem("token");
          window.location.reload();
        } else {
          toast.error("Error");
          throw Error();
        }
      } catch {
        toast.error("패스워드가 일치하지 않습니다");
      }
    } else if (passwd.value === "") {
      toast.error("password is required");
    }
  };

  return <DelAccPresenter passwd={passwd} onSubmit={onSubmit} />;
};