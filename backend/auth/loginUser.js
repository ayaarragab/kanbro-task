import User from "../models/user.js";
import bcrypt from "bcrypt";


async function findUserByUsername(username) {

    return await User.findOne({ username });
}

export async function comparePasswords(dbPassword, inputPassword) {
    const isValid = await bcrypt.compare(inputPassword, dbPassword);
    if (isValid) {
        return true;
    } else {
        return 'Password incorrect';
    }
}
export async function loginHandler(username, password) {
    try {
        const user = await findUserByUsername(username);
        if (!user)
            return false;
        const res = comparePasswords(user.password, password);
        if (typeof res === 'string') {
            return res;
        }
        return user;
    } catch (error) {
        return false;
    }
}