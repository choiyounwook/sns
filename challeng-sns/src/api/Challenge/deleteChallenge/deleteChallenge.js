import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteChallenge: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      const post = await prisma.$exists.post({ id, user: { id: user.id } });
      if (post) {
        return prisma.deletePost({ id });
      } else {
        throw Error("You can't do that");
      }
    },
  },
};
