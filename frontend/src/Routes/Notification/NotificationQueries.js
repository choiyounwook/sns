import { gql } from "apollo-boost";

export const USER = gql`
  query USER($username: String!) {
    seeUser(username: $username) {
      username
      relChallenger {
        id
        user {
          username
          avatar
          nickname
        }
      }
      tagChallenger {
        id
        user {
          username
          avatar
          nickname
        }
      }
    }
  }
`;
