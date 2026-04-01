
import db from '../scripts/userScript.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cloudinary from '../config/cloudinary.js';


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

async function getFeed(req, res) {

    const uid = req.user.id;

    const feed = await db.findFeed(uid);

    res.json(feed);
}

async function getUserPosts(req, res) {

    const uid = req.user.id;

    const userPosts = await db.findUserPosts(uid);

    res.json(userPosts);
}

async function getLikes(req, res) {

    const postId = req.body.postId;

    const likeCount = await db.findLikes(postId);

    res.json(likeCount);
}



//post

async function postLogin (req, res) {

    const user = req.user;

    const token = jwt.sign(
        {id: user.id, username: user.username},
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.json({token, user });
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

async function postPost(req, res) {

    const userId = req.user.id;
    const { title,content } = req.body;

    const post = await db.createPost(userId, title, content);

    res.json(post);
}

async function postDeletePost(req, res) {

    const { postId } = req.body;

    const post = await db.deletePost(postId);

    res.json(post);
}

async function postLike(req, res) {

    const { postId } = req.body;
    const uid = req.user.id;

    const like = await db.createLike(postId, uid);

    res.json(like);
}

async function postDislike(req, res) {

    const { postId } = req.body;
    const uid = req.user.id;

    const like = await db.deleteLike(postId, uid);

    res.json(like);
}

async function postEditUser(req, res) {

    const { username, email, password } = req.body;


    const uid = req.user.id;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.updateUser(username, email, hashedPassword, imagePath, uid);

    res.json(user);

}

async function postProfilePic(req, res) {

    try {
        if(!req.file){
            return res.status(404).json({error: "file not uploaded"});
        }

        const uid = req.user.id;

        const result = await cloudinary.uploader.upload(req.file.path);

        const imageUrl = result.secure_url;

        const user = await db.updateProfilePic(imageUrl, uid);

        res.json(user);
    }catch (error) {
         console.log("ERROR:", error);
        console.log("ERROR MESSAGE:", error.message);
        console.log("ERROR STACK:", error.stack);

        res.status(500).json({ error: error.message });
    }

}



export default {
    getUserById,
    getFriends,
    getFeed,
    getUserPosts,
    getLikes,
    postLogin,
    postRegister,
    postFollow,
    postUnFollow,
    postPost,
    postDeletePost,
    postLike,
    postDislike,
    postEditUser,
    postProfilePic
}