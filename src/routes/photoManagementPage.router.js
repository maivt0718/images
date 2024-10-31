import express from "express";
import { photoManage } from "../controllers/photoManage.controller.js";

const photoManagementPageRoutes = express.Router();

// get thông tin user
photoManagementPageRoutes.get("/getInfoUser", photoManage.getInfoUser);
// GET danh sách ảnh đã lưu theo user id
photoManagementPageRoutes.get(
  "/getSavedImages/:nguoi_dung_id",
  photoManage.getSavedImages
);
//  GET danh sách ảnh đã tạo theo user id
photoManagementPageRoutes.get(
  "/getListCreatedImage/:nguoi_dung_id",
  photoManage.getListCreatedImage
);
// DELETE xóa ảnh đã tạo theo id ảnh

photoManagementPageRoutes.delete(
  "/deleteImage/:hinh_id",
  photoManage.deleteImage
);
export default photoManagementPageRoutes;
