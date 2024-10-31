import express from 'express'
import { auth } from '../controllers/auth.controller.js'
import { uploadCloud } from '../../config/uploadAvarta.js'

const authRoute = express.Router()

authRoute.post('/login', auth.authLogin)
authRoute.post('/extend_token', auth.extendAsyncToken)
authRoute.post('/register', uploadCloud.single('picture'), auth.authRegister)

export default authRoute