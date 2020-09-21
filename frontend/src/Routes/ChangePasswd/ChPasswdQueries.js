import { gql } from "apollo-boost";

export const SET_PASSWD = gql`
  mutation changePasswd($passwd: String!, $newPasswd: String!) {
    changePasswd(passwd: $passwd, newPasswd: $newPasswd)
  }
`;
