import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        followersUser: async (_, args) =>
          prisma.user({id:args.id}).followers({
            first:args.limit,
            skip: args.cur
          })
        
        }
  };
  