import { generateSecret, sendSecretMail } from "../../../utils";
import bcrypt from "bcryptjs";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    findPasswd: async (_, args) => {
      const { email } = args;
      const passwd = generateSecret();
      try {
        await sendSecretMail(email, passwd);
        const hashedPassword = await bcrypt.hash(passwd, 5);
        console.log(hashedPassword);

        await prisma.updateUser({
          data: { passwd: hashedPassword },
          where: { email },
        });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
