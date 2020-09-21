import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    nextChallenge: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { id, pid } = args;
      const post = await prisma.$exists.post({ id, user: { id: user.id } });
      if (post) {
        await prisma.updatePost({
          where: { id },
          data: {
            prePosts: {
              connect: {
                id: pid,
              },
            },
          },
        });
      } else {
        throw Error("잘못된 요청입니다");
      }
    },
  },
};
