import { PrismaClient } from "@prisma/client";
import { status } from "../../utils/const.js";

const prisma = new PrismaClient

export const imagesController = {
    getAllImages: async (req, res, next) => {
       try {
        let images = await prisma.hinh_anh.findMany()
        return res.status(status.OK).json(images)
       } catch (error) {
            return res.status(status.INTERNAL_SERVER).json({message: `${error}`})
       }
    }
}