import { gql } from "apollo-boost";

export const DEL_USER = gql`
  mutation deleteAccount($passwd: String!) {
    deleteAccount(passwd: $passwd)
  }
`;
export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;