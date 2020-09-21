import { prisma } from "../../../generated/prisma-client";

export default {
  Hashtag: {
    posts: ({ id }) => prisma.hashtag({ id }).posts(),
    postCount: (parent) =>
      prisma
        .postsConnection({
          where: { hashtags_some: { id: parent.id } },
        })
        .aggregate()
        .count(),
  },
};
