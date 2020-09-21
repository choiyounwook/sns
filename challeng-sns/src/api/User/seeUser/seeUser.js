import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: async (_, args) => {
      const { username } = args;
      console.log(username)
      console.log(prisma.user({ username }))
      return prisma.user({ username });
    }
  }
};
