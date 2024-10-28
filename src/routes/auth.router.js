import express from 'express'
import { auth } from '../controllers/auth.controller.js'
import { uploadCloud } from '../../config/uploadAvarta.js'

const authRoute = express.Router()

authRoute.post('/login', auth.authLogin)
authRoute.post('/register', uploadCloud.single('picture'), auth.authRegister)

export default authRoute