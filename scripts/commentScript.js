import { prisma } from '../lib/prisma.js';

async function createComment(uid, postId, text) {

    const comment = await prisma.comment.create({
        data: {
            text: text,
            userId: uid,
            postId: postId
        },
        include: {
            user: true
        }
    });

    return comment

}

async function deleteComment(commentId) {

    const comment = await prisma.comment.delete({
        where: {
            id : Number(commentId)
        }
    });

    return comment;
}

async function findComments(postId) {

    const comments = await prisma.comment.findMany({
        where: {
            postId: Number(postId)
        },
        include: {
            user: true
        }
    });

    return comments;
}


export default {
    createComment,
    deleteComment,
    findComments
}