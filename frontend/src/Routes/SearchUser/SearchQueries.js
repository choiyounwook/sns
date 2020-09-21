import { gql } from "apollo-boost";

export const SEARCH = gql`
  query search($term: String!, $limit: Int!, $cur: Int!) {
    searchUser(term: $term, limit: $limit, cur: $cur) {
      id
      avatar
      username
      nickname
      isFollowing
      isSelf
      bio
    }
  }
`;