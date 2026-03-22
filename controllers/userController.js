
import db from '../scripts/userScript.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

async function getUser (req, res) {

    const username = req.body.username;

    const user = await db.findUserByName(username);

    res.json(user);
}

async function postLogin (req, res) {

    passport.authenticate("local", {session: false}, (err, user) => {
        if (err || !user){
            return res.status(404).json({message: "Invalid Credentials"});
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expriresIn: "7d" }
        );

        res.json({ token, user })
    })
}

async function postRegister(req, res) {

    const {username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.createUser(username, email, hashedPassword);

    res.json(user.username);
}

export default {
    getUser,
    postLogin,
    postRegister
}