import express from "express";
import { userController } from "../controllers/user.controller.js";
import { uploadCloud } from "../../config/uploadAvarta.js";
import { middlewareAsyncToken } from "../../config/jwt.js";

const userRoutes = express.Router();

userRoutes.get("/getAllUser", middlewareAsyncToken, userController.getAllUser);

userRoutes.post(
  "/uploadAvartaToCloud", middlewareAsyncToken,
  uploadCloud.single(`picture`),
  (req, res) => {
    let file = req.file;
    return res.status(200).json(file);
  }
);
// PUT thông tin cá nhân của user
userRoutes.put("/updateUser/:nguoi_dung_id", middlewareAsyncToken, userController.updateUser);
export default userRoutes;
