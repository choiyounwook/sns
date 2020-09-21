import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchUser: async (_, args) =>
      prisma.users({
        where: {
          OR: [
            { username_contains: args.term },
            {nickname_contains: args.term }
          ]
        },
        first: args.limit,
        skip: args.cur
      })
  }
};
