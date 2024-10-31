import { PrismaClient } from "@prisma/client";
import { status } from "../../utils/const.js";
import bcrypt from "bcrypt";
import speakeasy from "speakeasy";
import {
  createRefTokenAsyncKey,
  createTokenAsyncKey,
} from "../../config/jwt.js";

const prisma = new PrismaClient();

export const auth = {
  authLogin: async (req, res, next) => {
    const { email = "", id = "", mat_khau } = req.body;
    try {
      let user = await prisma.nguoi_dung.findFirst({
        where: {
          OR: [{ nguoi_dung_id: Number(id) }, { email }],
        },
      });

      if (!user) {
        return res
          .status(status.FOUND)
          .json({ message: "Please check id/email" });
      }

      const passwordMatch =
        (await bcrypt.compareSync(mat_khau, user.mat_khau)) ||
        user.mat_khau == mat_khau;
      if (passwordMatch) {
        let access_token = createTokenAsyncKey(user.nguoi_dung_id);
        let refresh_token = createRefTokenAsyncKey(user.nguoi_dung_id);

        await prisma.nguoi_dung.update({
          data: {
            refresh_token,
          },
          where: {
            nguoi_dung_id: user.nguoi_dung_id,
          },
        });

        res.cookie("refresh_token", refresh_token, {
          httpOnly: true, // Cookie không thể truy cập từ javascript
          secure: false, // để chạy dưới localhost
          sameSite: "Lax", // để đảm bảo cookie được gửi trong các domain khác nhau
          maxAge: 7 * 24 * 60 * 60 * 1000, //thời gian tồn tại cookie trong browser
        });
        return res
          .status(status.FOUND)
          .json({ message: `User found`, data: access_token });
      }

      return res.status(status.NOT_AUTHORISE).json(`Passwword is wrong`);
    } catch (error) {
      return res.status(status.INTERNAL_SERVER).json({ message: `${error}` });
    }
  },
  authRegister: async (req, res, next) => {
    try {
      let { id = "", email, password } = req.body;

      let userExist = await prisma.nguoi_dung.findFirst({
        where: {
          OR: [{ nguoi_dung_id: Number(id) }, { email }],
        },
      });

      if (userExist) {
        return res
          .status(status.CLIENT_ERR)
          .json({ message: `Email or ID is existed` });
      }
      let file = req.file;
      if (!file) {
        // No file in the picture field
        return res
          .status(status.CLIENT_ERR)
          .json({ message: "No picture file provided" });
      }

      let secret = speakeasy.generateSecret({ length: 15 });
      let maxAge = 100;
      let minAge = 10;

      let newUser = await prisma.nguoi_dung.create({
        data: {
          email,
          anh_dai_dien: file.path,
          secret: secret.base32, // Use for MFA
          mat_khau: bcrypt.hashSync(password, 10),
          ho_ten: email.split("@")[0],
          tuoi: Math.floor(Math.random() * (maxAge - minAge + 1) + minAge),
        },
      });
      return res.status(status.OK).json({ message: { newUser } });
    } catch (error) {
      return res.status(status.INTERNAL_SERVER).json({ message: `${error}` });
    }
  },
  extendAsyncToken: async (req, res, next, shouldContinue = false) => {
    try {
      let { refresh_token } = req.cookies;
      if (!refresh_token) {
        return res
          .status(status.NOT_AUTHORISE)
          .json({ message: `Refrsh token is not found for extending` });
      }
      let user = await prisma.nguoi_dung.findFirst({
        where: { refresh_token },
      });
      if (!user) {
        return res
          .status(status.NOT_AUTHORISE)
          .json({ message: `Refresh token is not found` });
      }
      let newAccessTokenAsyncKey = createTokenAsyncKey(user.nguoi_dung_id);
      let newRefreshToken = createRefTokenAsyncKey(user.nguoi_dung_id);
      await prisma.nguoi_dung.update({
        data: { refresh_token: newRefreshToken },
        where: { nguoi_dung_id: user.nguoi_dung_id },
      });
      if(shouldContinue){
        res.cookie("refresh_token", newRefreshToken, {
          httpOnly: true, // Cookie không thể truy cập từ javascript
          secure: false, // để chạy dưới localhost
          sameSite: "Lax", // để đảm bảo cookie được gửi trong các domain khác nhau
          maxAge: 7 * 24 * 60 * 60 * 1000, //thời gian tồn tại cookie trong browser
        });
        res.locals.access_token = newAccessTokenAsyncKey
        return next()
      }
      return res
        .status(status.OK)
        .json({
          message: `Extend key is succeeded`,
          data: newAccessTokenAsyncKey,
        });
    } catch (error) {
      return res
        .status(status.INTERNAL_SERVER)
        .json({ message: `Extend token issues: ${error}` });
    }
  },
};
