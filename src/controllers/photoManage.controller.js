import { PrismaClient } from "@prisma/client";
import { status } from "../../utils/const.js";

const prisma = new PrismaClient();

// trang quản lý ảnh

export const photoManage = {
  // get thông tin user
  getInfoUser: async (req, res) => {
    try {
      let { ho_ten = "" } = req.query;
      let users = await prisma.nguoi_dung.findMany({
        where: {
          ho_ten: {
            contains: ho_ten,
          },
        },
      });

      if (users.length === 0) {
        return res.status(status.NOT_FOUND).json({ message: "User not found" });
      }
      return res.status(status.OK).json(users);
    } catch (error) {
      return res.status(status.INTERNAL_SERVER).json({ message: `${error}` });
    }
  },
  //   GET danh sách ảnh đã lưu theo user id
  getSavedImages: async (req, res) => {
    try {
      let { nguoi_dung_id } = req.params;
      let saveImage = await prisma.luu_anh.findMany({
        where: {
          nguoi_dung_id: Number(nguoi_dung_id),
        },
      });
      if (saveImage.length === 0) {
        return res.status(status.NOT_FOUND).json({ message: "User not found" });
      }
      return res.status(status.OK).json(saveImage);
    } catch (error) {
      return res.status(status.INTERNAL_SERVER).json({ message: `${error}` });
    }
  },
  //  GET danh sách ảnh đã tạo theo user id
  getListCreatedImage: async (req, res) => {
    try {
      let { nguoi_dung_id } = req.params;
      let images = await prisma.hinh_anh.findMany({
        where: {
          nguoi_dung_id: Number(nguoi_dung_id),
        },
      });
      if (images.length === 0) {
        return res.status(status.NOT_FOUND).json({ message: "User not found" });
      }
      return res.status(status.OK).json(images);
    } catch (error) {
      return res.status(status.INTERNAL_SERVER).json({ message: `${error}` });
    }
  },
  // DELETE xóa ảnh đã tạo theo id ảnh
  deleteImage: async (req, res) => {
    try {
      let { hinh_id } = req.params;
      let hinh = await prisma.hinh_anh.findFirst({
        where: {
          hinh_id: Number(hinh_id),
        },
      });
      if (!hinh) {
        return res
          .status(status.NOT_FOUND)
          .json({ message: "Image not found" });
      }
      await prisma.hinh_anh.delete({
        where: {
          hinh_id: Number(hinh_id),
        },
      });
      return res.status(status.OK).json({ message: "Delete success" });
    } catch (error) {
      return res.status(status.INTERNAL_SERVER).json({ message: `${error}` });
    }
  },
};
