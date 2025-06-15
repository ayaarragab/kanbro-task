import User from "../models/user.js";
import serverErrorsHandler from "../utils.js/helper.js";

async function findUserByUsername(username) {

    return await User.findOne({ username });
}


export async function loginHandler(username, password) {
    try {
        const isExist = await findUserByUsername(username);
        if (!isExist)
            return false;
        const fUser = await User.findOne({ username });
        if (fUser) {
            return fUser;
        }
    } catch (error) {
        serverErrorsHandler(response, error);
    }
}