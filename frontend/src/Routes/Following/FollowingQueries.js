import { gql } from "apollo-boost";

export const FOLLOW = gql`
  query follow($id: String!, $limit: Int!, $cur: Int!) {
    followingUser(id: $id, limit: $limit, cur: $cur) {
      id
      avatar
      username
      nickname
      isFollowing
      isSelf
    }
  }
`;