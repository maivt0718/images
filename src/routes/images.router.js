import express from "express";
import { imagesController } from "../controllers/images.controller.js";
import { middlewareAsyncToken } from "../../config/jwt.js";

const imagesRouter = express.Router();

imagesRouter.get(
  "/getAllImages",
  middlewareAsyncToken,
  imagesController.getAllImages
);
imagesRouter.get("/getImagesByName", imagesController.findImageByName);
imagesRouter.get(
  "/getImagesAndItsOwner",
  imagesController.getImageInfoAndItsOwner
);
imagesRouter.get(
  "/getCommentsByImageID/:imageID",
  imagesController.getCommentsByImageID
);
imagesRouter.get("/checkSaveImage/:imageID", imagesController.checkSaveImage);
imagesRouter.post(
  "/saveCommentWithImage",
  imagesController.saveCommentWithImage
);

export default imagesRouter;
