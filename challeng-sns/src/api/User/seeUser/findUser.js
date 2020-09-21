import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    findUser: async (_, args) => {
      const { email } = args;
      console.log(email)
      console.log(prisma.user({ email }))
      return prisma.user({ email });
    }
  }
};
