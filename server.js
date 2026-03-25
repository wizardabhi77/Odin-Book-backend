
import Express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import passport from './config/passport.js';
import userRouter from './Routers/userRouter.js';
import commentRouter from './Routers/commentRouter.js';

const server = Express();

server.use(Express.json());
server.use(cors());
server.use(Express.urlencoded({extended: true}));
server.use(passport.initialize());

server.use("/", userRouter);

server.use("/", commentRouter);


const PORT = process.env.PORT || 5050;

server.listen(PORT, (err) => {

    if(err) {
        throw new Error(err.message);
    }

    console.log("SERVER UP AND RUNNING AT ", PORT);
})

