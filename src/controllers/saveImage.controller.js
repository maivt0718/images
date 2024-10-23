import { PrismaClient } from "@prisma/client";
import { status } from "../../utils/const.js";

const prisma = new PrismaClient

export const saveImagesController = {
    getAllSaveImagesInfo: async (req, res, next) => {
       try {
        let all = await prisma.luu_anh.findMany()
        return res.status(status.OK).json(all)
       } catch (error) {
            return res.status(status.INTERNAL_SERVER).json({message: `${error}`})
       }

    }
}