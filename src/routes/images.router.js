import express from 'express'
import { imagesController } from '../controllers/images.controller.js'

const imagesRouter = express.Router()

imagesRouter.get('/getAllImages', imagesController.getAllImages)

export default imagesRouter