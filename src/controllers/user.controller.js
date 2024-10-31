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

      return res
        .status(status.OK)
        .json({ message: "User updated successfully" });
    } catch (error) {
      return res.status(status.INTERNAL_SERVER).json({ message: `${error}` });
    }
  },
};
