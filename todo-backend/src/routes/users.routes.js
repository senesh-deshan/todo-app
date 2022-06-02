import express from 'express';
import userControllers from '../controllers/users.controllers.js'

const userRouter = express.Router();

userRouter.get('/details', userControllers.userDetails);
userRouter.post('/register', userControllers.userRegister);
userRouter.post('/login', userControllers.userLogin);
userRouter.post('/logout', userControllers.userLogout);

export default userRouter;
