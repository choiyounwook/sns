import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
    files: ({ id }) => prisma.post({ id }).files(),
    comments: ({ id }) => prisma.post({ id }).comments(),
    user: ({ id }) => prisma.post({ id }).user(),
    nextPosts:({ id }) => prisma.post({ id }).nextPosts(),
    prePosts:({ id }) => prisma.post({ id }).prePosts(),
    relChallenger: ({ id }) => prisma.post({ id }).relChallenger(),
    preChallenger: ({ id }) => prisma.post({ id }).preChallenger(),
    nextChallenger: ({ id }) => prisma.post({ id }).nextChallenger(),
    tagChallenger: ({ id }) => prisma.post({ id }).tagChallenger(),
    likes: ({ id }) => prisma.post({ id }).likes(),
    hashtags:({ id }) => prisma.post({ id }).hashtags(),
    scope:({ id }) => prisma.post({ id }).scope(),
    isLiked: (parent, _, { request }) => {
      const { user } = request;
      const { id } = parent;
      return prisma.$exists.like({
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id
            }
          }
        ]
      });
    },
    likeCount: parent =>
      prisma
        .likesConnection({
          where: { post: { id: parent.id } }
        })
        .aggregate()
        .count(),
    commentCount: parent =>
      prisma
        .commentsConnection({
          where: { post: { id: parent.id } }
        })
        .aggregate()
        .count(),
    nextPostCount: parent =>
      prisma
      .postsConnection({
        where:{prePosts_some:{id: parent.id} }
      })
      .aggregate()
      .count(),
    prePostCount: parent =>
      prisma
      .postsConnection({
        where:{nextPosts_some:{id: parent.id} }
      })
      .aggregate()
      .count(),


  }
};
