import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    HashtagPost: async (_, args) =>
      prisma.hashtags({
        where: {
          OR: [
            { tag_name: args.tag_name }
          ]
        }
      })
  }
};
