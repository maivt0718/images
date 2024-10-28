import express from 'express'
import { userController } from '../controllers/user.controller.js'
import { uploadCloud } from '../../config/uploadAvarta.js'

const userRoutes = express.Router()

userRoutes.get('/getAllUser', userController.getAllUser)
userRoutes.post('/uploadAvartaToCloud', uploadCloud.single(`picture`), (req, res) => {
    let file = req.file;
    return res.status(200).json(file);
})

export default userRoutes