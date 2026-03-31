
import { prisma } from '../lib/prisma.js';

//create

async function createUser (username, email, password) {

    const user = await prisma.users.create({
        data: {
            username: username,
            email : email,
            password : password
        }
    });

    return user;
}

async function createFollow (userId, followingId) {

    const follow = await prisma.follow.create({
        data: {
            followerId : userId,
            followingId: Number(followingId)
        }
    })

    return follow;
}

async function createPost (userId, title, content) {

    const post = await prisma.post.create({
        data: {
            title: title,
            content: content,
            userId: userId
        }
    });

    return post;
}

async function createLike(postId, uid) {

    const like = await prisma.likes.create({
        data: {
            userId: uid,
            postId: Number(postId)
        }
    })

    return like;
}

//delete

async function deleteFollow (userId, followindId) {

    const follow = await prisma.follow.deleteMany({
        where: {
            followerId: userId,
            followingId: Number(followindId)
        }
    });

    return follow;
}

async function deletePost(postId) {

    const post = await prisma.post.delete({
        where: {
            id : Number(postId)
        }
    });

    return post;
}




async function deleteLike(postId, uid) {

    const like = await prisma.likes.delete({
        where: {
            postId_userId: {
                postId: postId,
                userId: uid
            }
        }
        
    });
    
    return like;
}

//find

async function findUserByName (username) {

    const user = await prisma.users.findUnique({
        where: {
            username: username
        }
    });

    return user;
}

async function findUserById (id) {

    const user = await prisma.users.findUnique({
        where: {
            id : id
        },
        include: {
            followers: {
                include: { follower: true}
            },
            following: {
                include: { following: true}
            }
        }
    });

    return user;
}

async function findFriends(uid) {

    const friends = await prisma.users.findMany({
        where : {
            NOT:{
                followers: {
                    some: {
                        followerId : uid
                    }
                }
            },
            id : {
                not : uid
            }
        }
    });

    return friends;
}

async function findFeed(uid) {

    const following = await prisma.follow.findMany({
        where: {
            followerId : uid
        },
        select: {
            followingId: true
        }
    });
    

    const followingIds = following.map(f => f.followingId);

    

    const feed = await prisma.post.findMany({
        where: {
            userId : {
                in: [...followingIds, uid]
            }
        },
        include: {
        user: true,
        likes: {
            where: {
                userId: uid
            },
            select: {
                userId: true
            }
        },
        _count: {
            select: {
                likes: true,
                comments: true
            }
        }
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return feed;
}

async function findUserPosts(uid) {

    const userPosts = await prisma.post.findMany({
        where: {
            userId : uid
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return userPosts;
}

async function findLikes(postId) {

    const likes = await prisma.likes.count({
        where: {
            postId: postId
        }
    });

    return likes;
}


//update

async function updateUser(username, email, password, imgPath, uid) {

    const user = await prisma.users.update({
        where: {
            id: uid
        },
        data: {
            username: username,
            email: email,
            password: password,
            profilePic: imgPath
        }
    });

    return user;
}

async function updateProfilePic(imgPath, userId) {

    const user = await prisma.users.update({
        where: {
            id: userId
        },
        data: {
            profilePic: imgPath
        }
    });

    return user;
}

export default {

    createUser,
    createFollow,
    createPost,
    deleteFollow,
    deletePost,
    findUserByName,
    findUserById,
    findFriends,
    findFeed,
    findUserPosts,
    findLikes,
    createLike,
    deleteLike,
    updateUser,
    updateProfilePic
}