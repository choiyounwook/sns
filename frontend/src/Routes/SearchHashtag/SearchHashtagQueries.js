import { gql } from "apollo-boost";

export const SEARCH = gql`
  query search($term: String!, $limit: Int!, $cur: Int!) {
    searchHashtag(term: $term, limit: $limit, cur: $cur) {
      id
      tag_name
      postCount
      posts {
        id
        location
        caption
        category
        textContent
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
        nextPosts{
          user{
          id
          avatar
          username
          isFollowing
          isSelf
          bio}
        }
        prePosts{
          user{
          id
          avatar
          username
          isFollowing
          isSelf
          bio}
        }
      }
    }
  }
`;