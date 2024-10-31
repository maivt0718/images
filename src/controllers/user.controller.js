import { PrismaClient } from "@prisma/client";
import { status } from "../../utils/const.js";
import bcrypt from "bcrypt";
import speakeasy from "speakeasy";
import {
  createRefTokenAsyncKey,
  createTokenAsyncKey,
} from "../../config/jwt.js";
const prisma = new PrismaClient();

export const userController = {
  getAllUser: async (req, res, next) => {
    try {
      let users = await prisma.nguoi_dung.findMany();
      return res.status(status.OK).json(users);
    } catch (error) {
      return res.status(status.INTERNAL_SERVER).json({ message: `${error}` });
    }
  },
  // put thông tin người dùng
  updateUser: async (req, res, next) => {
    try {
      const { nguoi_dung_id } = req.params;
      const { ho_ten, mat_khau, tuoi, email, anh_dai_dien } = req.body;
      let users = await prisma.nguoi_dung.findFirst({
        where: {
          nguoi_dung_id: Number(nguoi_dung_id),
        },
        select: {
          nguoi_dung_id: true,
          ho_ten: true,
          mat_khau: true,
          tuoi: true,
          email: true,
          anh_dai_dien: true,
        },
      });
      if (!users) {
        return res.status(status.NOT_FOUND).json({ message: "User not found" });
      }
      const passwordMatch =
        (await bcrypt.compareSync(mat_khau, users.mat_khau)) ||
        users.mat_khau == mat_khau;
      if (passwordMatch) {
        let access_token = createTokenAsyncKey(users.nguoi_dung_id);
        let refresh_token = createRefTokenAsyncKey(users.nguoi_dung_id);

        await prisma.nguoi_dung.update({
          data: {
            ho_ten,
            mat_khau,
            tuoi,
            email,
            anh_dai_dien,
          },
          where: {
            nguoi_dung_id: Number(nguoi_dung_id),
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

      return res
        .status(status.OK)
        .json({ message: "User updated successfully" });
    } catch (error) {
      return res.status(status.INTERNAL_SERVER).json({ message: `${error}` });
    }
  },
};
