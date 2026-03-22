
import Express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import userRouter from './Routers/userRouter.js';

const server = Express();

server.use(Express.json());
server.use(cors());
server.use(Express.urlencoded({extended: true}))

server.get("/", userRouter);


const PORT = process.env.PORT || 5050;

server.listen(PORT, (err) => {

    if(err) {
        throw new Error(err.message);
    }

    console.log("SERVER UP AND RUNNING AT ", PORT);
})

