import User from "../models/user.js";

async function findUserByUsername(username) {

    return await User.findOne({ username });
}


export async function registerHandler(username, password) {
    try {
        const isExist = await findUserByUsername(username);
        if (isExist)
            return false;
        const newUser = await User.create({ username, password });
        await newUser.save();
        if (newUser) {
            return newUser;
        }
    } catch (error) {
        console.log(error);
        
        return false;
    }
}