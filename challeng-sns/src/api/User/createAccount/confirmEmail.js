import { prisma } from "../../../../generated/prisma-client";
import { generateToken, sendConfirmEmail } from "../../../utils";

export default {
  Mutation: {
    confirmEmail: async (_, args) => {
      const { email, keyForVerify } = args;
      const user = await prisma.user({ email });
      console.log(user.keyForVerify)
      try {
        // await sendConfirmEmail(email, keyForVerify);
        if(user.keyForVerify==keyForVerify){
            await prisma.updateUser({ data: { confirmEmail:true }, where: { email:email } });
            return true;
        } else {
            throw Error("Wrong email/secret combination");
          }
      } catch (e) {
        console.log(e);
      }
    
    }
  }
};
