import { prisma } from "../../../../generated/prisma-client";
import bcrypt from "bcryptjs";

var _default = {
  Mutation: {
    deleteAccount: async (_, args, { request, isAuthenticated }) => {
      const { passwd } = args;
      isAuthenticated(request);
      const { user } = request;

      console.log(user.id);
      console.log(passwd);
      const passwdMatch = await bcrypt.compare(passwd, user.passwd);

      if (!passwdMatch) {
        throw new Error("비밀번호가 일치하지 않습니다.");
      }
      console.log("asd");

      await prisma.deleteUser({
        id: user.id,
      });
      return true;
    },
  },
};
exports["default"] = _default;
