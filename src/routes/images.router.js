import express from 'express'
import { imagesController } from '../controllers/images.controller.js'

const imagesRouter = express.Router()

imagesRouter.get('/getAllImages', imagesController.getAllImages)
imagesRouter.get('/getImagesByName', imagesController.findImageByName)


export default imagesRouter