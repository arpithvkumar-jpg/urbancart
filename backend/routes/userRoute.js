import express from 'express';
import authUser from '../middleware/auth.js'
import { loginUser, registerUser, adminLogin, googleLogin, getUserProfile, updateUserAddress } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/google-login', googleLogin)
userRouter.post('/admin', adminLogin)
userRouter.get('/profile', authUser, getUserProfile)
userRouter.post('/update-address', authUser, updateUserAddress)

export default userRouter;