
import { prisma } from '../lib/prisma.js';



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

async function deleteFollow (userId, followindId) {

    const follow = await prisma.follow.deleteMany({
        where: {
            followerId: userId,
            followingId: Number(followindId)
        }
    });

    return follow;
}


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





export default {

    createUser,
    createFollow,
    deleteFollow,
    findUserByName,
    findUserById,
    findFriends
}