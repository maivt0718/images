import express from "express";
import { imagesController } from "../controllers/images.controller.js";
import { middlewareAsyncToken } from "../../config/jwt.js";

const imagesRouter = express.Router();

imagesRouter.get(
  "/getAllImages",
  middlewareAsyncToken,
  imagesController.getAllImages
);
imagesRouter.get("/getImagesByName", middlewareAsyncToken, imagesController.findImageByName);
imagesRouter.get(
  "/getImagesAndItsOwner", middlewareAsyncToken,
  imagesController.getImageInfoAndItsOwner
);
imagesRouter.get(
  "/getCommentsByImageID/:imageID", middlewareAsyncToken,
  imagesController.getCommentsByImageID
);
imagesRouter.get("/checkSaveImage/:imageID", middlewareAsyncToken, imagesController.checkSaveImage);
imagesRouter.post(
  "/saveCommentWithImage", middlewareAsyncToken,
  imagesController.saveCommentWithImage
);

export default imagesRouter;
