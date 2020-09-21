import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seePost: async (_, args) =>
        prisma.user({username:args.username}).posts({
          orderBy: "createdAt_DESC"
        })
      }
};
