
import { Router } from 'express';

const userRouter = Router();

userRouter.get("/", (req,res) => res.send("OK"));

export default userRouter;