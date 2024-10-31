import express from 'express'
import { commenntController } from '../controllers/comments.controller.js'
import { middlewareAsyncToken } from '../../config/jwt.js'


const commentRoute = express.Router()

commentRoute.get('/getAllComments', middlewareAsyncToken,commenntController.getAllComments)

export default commentRoute