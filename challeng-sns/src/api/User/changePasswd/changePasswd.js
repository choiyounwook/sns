import bcrypt from "bcryptjs";
import { prisma } from "../../../../generated/prisma-client";

var _default = {
  Mutation: {
    changePasswd: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { passwd, newPasswd } = args;
      console.log(passwd);
      const passwdMatch = await bcrypt.compare(passwd, user.passwd);

      if (!passwdMatch) {
        throw new Error("비밀번호가 일치하지 않습니다.");
      }
      try {
        const hashedPassword = await bcrypt.hash(newPasswd, 5);
        console.log(hashedPassword);

        await prisma.updateUser({
          data: { passwd: hashedPassword },
          where: { id: user.id },
        });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
exports["default"] = _default;
