import { prisma } from "../../../../generated/prisma-client";
export default {
    Query: {
      seeChallenge: async (_, args) =>
        prisma.posts({
          where: {
            OR: [
              { id: args.id }
            ]
          }
        })
    }
  };
  

