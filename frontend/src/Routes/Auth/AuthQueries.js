import { gql } from "apollo-boost";

export const LOG_IN = gql`
  mutation login($email: String!, $passwd: String!) {
    login(email: $email, passwd: $passwd)
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $nickname: String!
    $email: String!
    $passwd: String!
    $username: String!
  ) {
    createAccount(
      nickname: $nickname
      email: $email
      passwd: $passwd
      username: $username
    )
  }
`;
export const FIND_PASSWD = gql`
  mutation findPasswd($email: String!) {
    findPasswd(email: $email)
  }
`;
export const CONFIRM_EMAIL = gql`
  mutation confirmEmail($keyForVerify: String!,$email: String!) {
    confirmEmail(keyForVerify: $keyForVerify, email: $email)
  }
`;
export const CONFIRM_SECRET = gql`
  mutation confirmSecret($secret: String!, $email: String!) {
    confirmSecret(secret: $secret, email: $email)
  }
`;

export const LOCAL_LOG_IN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;
export const FIND_USER=gql`
  query findUser($email:String!) {
    findUser(email: $email){
      confirmEmail
      keyForVerify
    }
  }
  `;
