import { prisma } from "../../../../generated/prisma-client";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendConfirmEmail } from "../../../utils";
import confirmEmail from "./confirmEmail";
export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, nickname, passwd, bio = "" } = args;
      const exists = await prisma.$exists.user({
        OR: [{ email }, { nickname }],
      });
      if (exists) {
        throw Error("This ID / email is already taken");
      }
      const hashedPassword = await bcrypt.hash(passwd, 5);
      // await prisma.confirmEmail({
      //   email: email});
      const key_for_verify = crypto
        .randomBytes(256)
        .toString("base64")
        .substr(50, 5);
      console.log(key_for_verify);
      await prisma.createUser({
        username,
        nickname,
        passwd: hashedPassword,
        email,
        confirmEmail: false,
        keyForVerify: key_for_verify,
      });
      await sendConfirmEmail(email, key_for_verify);
      return true;
    },
  },
};
