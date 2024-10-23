import express from 'express'
import { commenntController } from '../controllers/comments.controller.js'


const commentRoute = express.Router()

commentRoute.use('/getAllComments', commenntController.getAllComments)

export default commentRoute