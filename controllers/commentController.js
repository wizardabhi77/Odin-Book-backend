
import db from '../scripts/commentScript.js';

async function postComment(req, res) {

    const uid = req.user.id;

    const { postId, text } = req.body;

    const comment = await db.createComment(uid, postId, text);

    res.json(comment);
}

async function postDeleteComment(req, res) {

    const { commentId } = req.body;

    const comment = await db.deleteComment(commentId);

    res.json(comment);
}

async function getComment(req, res) {

    const postId = req.params.postId;

    const comments = await db.findComments(postId);

    res.json(comments);
}


export default {
    postComment,
    postDeleteComment,
    getComment
}