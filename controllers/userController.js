
import db from '../scripts/userScript.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

async function getUserById (req, res) {

    const uid = req.user.id;

    const user = await db.findUserById(uid);

    res.json(user);
}

async function getFriends(req, res) {

    const uid = req.user.id;

    const friends = await db.findFriends(uid);

    res.json(friends);
}



async function postLogin (req, res) {

    passport.authenticate("local", {session: false}, (err, user) => {
        if (err || !user){
            return res.status(404).json({message: "Invalid Credentials"});
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ token, user })
    })(req, res);
}

async function postRegister(req, res) {

    
    const {username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.createUser(username, email, hashedPassword);

    res.json(user.username);
}

async function postFollow(req, res) {

    const userId = req.user.id;
    const { followId } = req.body;

    const follow = await db.createFollow(userId, followId);

    res.json(follow);
}

async function postUnFollow(req, res) {

    const userId = req.user.id;
    const { followId } = req.body;

    const follow = await db.deleteFollow(userId, followId);

    res.json(follow);
}

export default {
    getUserById,
    getFriends,
    postLogin,
    postRegister,
    postFollow,
    postUnFollow
}