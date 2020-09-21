import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        followingUser: async (_, args) =>
          prisma.user({id:args.id}).following({
            first:args.limit,
            skip: args.cur
          })
        }
  };
  