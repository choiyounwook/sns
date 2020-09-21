import { gql } from "apollo-boost";

export const SEARCH = gql`
  query search($term: String!) {
    HashtagPost(tag_name: $term) {
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