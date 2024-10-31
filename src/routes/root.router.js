import express from "express";
import userRoutes from "./users.router.js";
import commentRoute from "./comments.router.js";
import imagesRouter from "./images.router.js";
import saveImageRouter from "./saveImages.router.js";
import authRoute from "./auth.router.js";
import photoManagementPageRoutes from "./photoManagementPage.router.js";
const rootRouter = express.Router();

rootRouter.use("/users", userRoutes);
rootRouter.use("/comments", commentRoute);
rootRouter.use("/images", imagesRouter);
rootRouter.use("/saveImage", saveImageRouter);
rootRouter.use("/auth", authRoute);
rootRouter.use("/photoManagementPage", photoManagementPageRoutes);
export default rootRouter;
