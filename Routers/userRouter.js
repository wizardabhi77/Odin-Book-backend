
import { Router } from 'express';
import userController from '../controllers/userController.js';
import passport from 'passport';

const auth = passport.authenticate("jwt", {session: false});

const userRouter = Router();

userRouter.get("/user", auth, userController.getUserById);
userRouter.get("/friends", auth, userController.getFriends);

userRouter.post("/login", userController.postLogin);
userRouter.post("/register", userController.postRegister)

export default userRouter;