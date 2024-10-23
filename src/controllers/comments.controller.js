import { PrismaClient } from "@prisma/client";
import { status } from "../../utils/const.js";

const prisma = new PrismaClient

export const commenntController = {
    getAllComments: async (req, res, next) => {
       try {
        let comments = await prisma.binh_luan.findMany()
        return res.status(status.OK).json(comments)
       } catch (error) {
            return res.status(status.INTERNAL_SERVER).json({message: `${error}`})
       }

    }
}