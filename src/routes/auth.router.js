import express from 'express'
import { auth } from '../controllers/auth.controller.js'

const authRoute = express.Router()

authRoute.post('/login', auth.authLogin)

export default authRoute