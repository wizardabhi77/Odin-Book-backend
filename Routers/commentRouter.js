
import { Router } from 'express'
import commentController from '../controllers/commentController.js';
import passport from 'passport';

const auth = passport.authenticate("jwt", {session: false});

const commentRouter = Router();

commentRouter.get("/comment/:postId", auth, commentController.getComment);

commentRouter.post("/comment/create", auth, commentController.postComment);
commentRouter.post("/comment/delete", auth, commentController.postDeleteComment);

export default commentRouter;