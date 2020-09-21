import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      console.log(args);
      let { nickname, bio, avatar } = args;
      const { user } = request;

      if (avatar === "") {
        avatar =
          "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png";
      }
      if (nickname == "") {
        await prisma.updateUser({
          where: { id: user.id },
          data: { nickname: user.username, bio: bio, avatar: avatar },
        });
        return true;
      } else {
        await prisma.updateUser({
          where: { id: user.id },
          data: { nickname: nickname, bio: bio, avatar: avatar },
        });
        return true;
      }
    },
  },
};
