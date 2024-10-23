import express from "express";
import userRoutes from "./users.router.js";
import commentRoute from "./comments.router.js";
import imagesRouter from "./images.router.js";
import saveImageRouter from "./saveImages.router.js";

const rootRouter = express.Router()

rootRouter.use('/users', userRoutes)
rootRouter.use('/comments',commentRoute)
rootRouter.use('/images',imagesRouter)
rootRouter.use('/saveImage',saveImageRouter)

export default rootRouter
