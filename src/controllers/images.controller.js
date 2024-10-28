import { PrismaClient } from "@prisma/client";
import { status } from "../../utils/const.js";

const prisma = new PrismaClient({
    log: ["query"]
});

export const imagesController = {
  getAllImages: async (req, res, next) => {
    try {
      let images = await prisma.hinh_anh.findMany();
      return res.status(status.OK).json(images);
    } catch (error) {
      return res.status(status.INTERNAL_SERVER).json({ message: `${error}` });
    }
  },
  findImageByName: async (req, res, next) => {
    try {
        let { name } = req.query
        let searchString = `${name}`
        let images = await prisma.hinh_anh.findMany({
            where:{
                ten_hinh:{
                    contains: `${searchString}`
                }
            }
        })
        // let images = await prisma.$queryRaw`SELECT * FROM hinh_anh WHERE ten_hinh LIKE ${searchString}`
        if(images.length === 0){
            return res.status(status.NOT_FOUND).json({message: "Name is not found"})
        }
        return res.status(status.OK).json(images)
    } catch (error) {
        return res.status(status.INTERNAL_SERVER).json({ message: `${error}` });
    }
  },
  getImageInfoAndItsOwner: (req, res, next) => {
    
  }
};
