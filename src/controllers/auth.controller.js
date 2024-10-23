import { PrismaClient } from "@prisma/client";
import { status } from "../../utils/const.js";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

export const auth = {
  authLogin: async (req, res, next) => {
    const { email = "", id = "", mat_khau } = req.body;
    console.log(email, id, mat_khau)
    try {
      let user = await prisma.nguoi_dung.findFirst({
        where: {
          OR: [{ nguoi_dung_id: Number(id) }, { email }],
        },
      });

      if(!user){
        return res.status(status.FOUND).json({message: "Please check id/email"});
      }

      const passwordMatch = await bcrypt.compare(mat_khau,user.mat_khau) || user.mat_khau == mat_khau
      if(passwordMatch)
        return res.status(status.FOUND).json(`User found`);

      return res.status(status.NOT_AUTHORISE).json(`Passwword is wrong`);
    } catch (error) {
      return res.status(status.INTERNAL_SERVER).json({ message: `${error}` });
    }
  },
};
