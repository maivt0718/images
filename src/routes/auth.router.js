import express from 'express'
import { auth } from '../controllers/auth.controller.js'

const authRoute = express.Router()

authRoute.post('/login', auth.authLogin)
authRoute.post('/register', auth.authRegister)

export default authRoute