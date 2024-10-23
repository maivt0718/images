import { PrismaClient } from "@prisma/client";
import { status } from "../../utils/const.js";

const prisma = new PrismaClient

export const userController = {
    getAllUser: async (req, res, next) => {
       try {
        let users = await prisma.nguoi_dung.findMany()
        return res.status(status.OK).json(users)
       } catch (error) {
            return res.status(status.INTERNAL_SERVER).json({message: `${error}`})
       }

    }
}