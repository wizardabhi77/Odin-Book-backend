
import { Router } from 'express';
import userController from '../controllers/userController.js';
import passport from 'passport';

const auth = passport.authenticate("jwt", {session: false});

const userRouter = Router();

userRouter.get("/user", auth, userController.getUserById);
userRouter.get("/friends", auth, userController.getFriends);
userRouter.get("/feed", auth, userController.getFeed);
userRouter.get("/post/user", auth, userController.getUserPosts);



userRouter.post("/login", userController.postLogin);
userRouter.post("/register", userController.postRegister);
userRouter.post("/follow", auth, userController.postFollow);
userRouter.post("/unfollow", auth, userController.postUnFollow);
userRouter.post("/post", auth, userController.postPost);
userRouter.post("/post/delete", auth, userController.postDeletePost);

export default userRouter;