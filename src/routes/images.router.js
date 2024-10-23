import express from 'express'
import { imagesController } from '../controllers/images.controller.js'

const imagesRouter = express.Router()

imagesRouter.use('/getAllImages', imagesController.getAllImages)

export default imagesRouter