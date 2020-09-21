import { prisma } from "../../../../generated/prisma-client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export default {
  Mutation: {
    login: async (_, args) => {
      const { email, passwd } = args;
      //console.log(email, passwd)

      const user = await prisma.user({ email });
      //console.log(user.email)
      if (!user) {
        throw new Error("유저가 없습니다.");
      }
      console.log(user.passwd);
      console.log(args.passwd);
      const passwdMatch = await bcrypt.compare(args.passwd, user.passwd);
      console.log(passwdMatch);
      if (!passwdMatch) {
        throw new Error("비밀번호가 틀립니다.");
      }
      console.log(process.env.JWT_SECRET);
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      console.log(token);
      return token;
    },
  },
};
