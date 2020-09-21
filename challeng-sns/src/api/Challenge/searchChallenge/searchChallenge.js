import { prisma } from "../../../../generated/prisma-client";
export default {
  Query: {
    searchChallenge: async (_, args) =>
      prisma.hashtags({
        where: {
          OR: [
            { tag_name_contains: args.term }
          ]
        },
        first:args.limit,
        skip: args.cur
      })
  }
};
