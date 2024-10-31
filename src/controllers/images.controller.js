import { PrismaClient } from "@prisma/client";
import { status } from "../../utils/const.js";

const prisma = new PrismaClient({
  log: ["query"],
});

export const imagesController = {
  getAllImages: async (req, res, next) => {
    try {
      let newAccessToken = res.locals.access_token
      let images = await prisma.hinh_anh.findMany();
      return res.status(status.OK).json({images, data: newAccessToken});
    } catch (error) {
      return res.status(status.INTERNAL_SERVER).json({ message: `${error}` });
    }
  },
  findImageByName: async (req, res, next) => {
    try {
      let { name } = req.query;
      let searchString = `${name}`;
      let images = await prisma.hinh_anh.findMany({
        where: {
          ten_hinh: {
            contains: `${searchString}`,
          },
        },
      });
      // let images = await prisma.$queryRaw`SELECT * FROM hinh_anh WHERE ten_hinh LIKE ${searchString}`
      if (images.length === 0) {
        return res
          .status(status.NOT_FOUND)
          .json({ message: "Name is not found" });
      }
      return res.status(status.OK).json(images);
    } catch (error) {
      return res.status(status.INTERNAL_SERVER).json({ message: `${error}` });
    }
  },
  getImageInfoAndItsOwner: async (req, res, next) => {
    try {
      let { id } = req.body;
      let image = await prisma.hinh_anh.findMany({
        where: {
          hinh_id: id,
        },
        select: {
          hinh_id: true,
          ten_hinh: true,
          mo_ta: true,
          nguoi_dung: {
            select: {
              nguoi_dung_id: true,
              email: true,
              ho_ten: true,
              tuoi: true,
              anh_dai_dien: true,
            },
          },
        },
      });
      return res.status(status.OK).json(image);
    } catch (error) {
      return res.status(status.INTERNAL_SERVER).json({ message: `${error}` });
    }
  },
  getCommentsByImageID: async (req, res, next) => {
    try {
      let { imageID } = req.params;
      let image = await prisma.hinh_anh.findMany({
        where: {
          hinh_id: Number(imageID),
        },
        select: {
          hinh_id: true,
          ten_hinh: true,
          mo_ta: true,
          binh_luan: {
            select: {
              binh_luan_id: true,
              ngay_binh_luan: true,
              noi_dung: true,
            },
          },
        },
      });
      return res.status(status.OK).json(image);
    } catch (error) {
      return res.status(status.INTERNAL_SERVER).json({ message: `${error}` });
    }
  },
  checkSaveImage: async (req, res, next) => {
    try {
      let { imageID } = req.params;
      let isNotSave = await prisma.hinh_anh.findMany({
        where: {
          hinh_id: Number(imageID),
          luu_anh: {
            none: {},
          },
        },
      });
      if (isNotSave.length) {
        return res
          .status(status.NOT_FOUND)
          .json({ message: `Image is not saved`, data: isNotSave });
      }
      return res
        .status(status.OK)
        .json({ message: `Image is saved`, data: isNotSave });
    } catch (error) {
      return res.status(status.INTERNAL_SERVER).json({ message: `${error}` });
    }
  },
  saveCommentWithImage: async (req, res, next) => {
    try {
      let { user_id, image_id, comment } = req.body;
      let isCheckUserIDAndImageIDExisted = await prisma.binh_luan.findMany({
        where: {
          AND: {
            nguoi_dung_id: user_id,
            hinh_id: image_id,
          },
        },
      });

      let saveComment;
      if (isCheckUserIDAndImageIDExisted.length == 0) {
        saveComment = await prisma.binh_luan.create({
          data: {
            hinh_anh: { connect: { hinh_id: image_id } },
            noi_dung: comment,
            ngay_binh_luan: new Date().toISOString(),
            nguoi_dung: {
              connect: {
                nguoi_dung_id: user_id,
              },
            },
          },
        });
      } else {
        saveComment = await prisma.binh_luan.update({
          data: {
            noi_dung: comment,
          },
          where: {
            nguoi_dung_id_hinh_id: {
              nguoi_dung_id: user_id,
              hinh_id: image_id,
            },
          },
        });
      }
      return res
        .status(status.OK)
        .json({ message: `Update successfully`, data: saveComment });
    } catch (error) {
      return res.status(status.INTERNAL_SERVER).json({ message: `${error}` });
    }
  },


};
