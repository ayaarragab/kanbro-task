import User from "../models/user.js";
import serverErrorsHandler from "../utils.js/helper.js";

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
        serverErrorsHandler(response, error);
    }
}