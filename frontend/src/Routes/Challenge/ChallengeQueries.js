import { gql } from "apollo-boost";

export const CHALLENGE = gql`
  query challenge($id: String!) {
    seeChallenge(id: $id) {
      id
      location
      caption
      category
      textContent
      hashtags {
        id
        tag_name
      }
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
      nextPostCount
      prePostCount
      nextPosts {
        id
        user {
          id
          avatar
          username
          nickname
          isFollowing
          isSelf
          bio
        }
      }
      prePosts {
        id
        user {
          id
          avatar
          username
          nickname
          isFollowing
          isSelf
          bio
        }
      }
      likes{
        user{
          id
          avatar
          username
          nickname
          isFollowing
          isSelf
          bio
        }
      }
    }
  }
`;
