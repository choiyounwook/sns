import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchPost: async (_, args) =>
      prisma.hashtag({id: args.term}).post({
        first:args.limit,
        skip: args.cur
      })
  }
};
