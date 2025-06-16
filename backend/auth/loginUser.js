import User from "../models/user.js";

async function findUserByUsername(username, password) {

    return await User.findOne({ username, password });
}


export async function loginHandler(username, password) {
    try {
        const isExist = await findUserByUsername(username, password);
        if (!isExist)
            return false;
        return true;
    } catch (error) {
        return false;
    }
}