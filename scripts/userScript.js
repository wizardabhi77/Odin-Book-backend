
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
        }
    });

    return user;
}



export default {

    createUser,
    findUserByName,
    findUserById
}