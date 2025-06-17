import User from "../models/user.js";
import jwt from "jsonwebtoken";

export async function verifyAccessToken(token) {
    try {
        const valid = jwt.verify(token, "accessSecret");
        
        if (valid?.id) {
            const user = await User.findById(valid.id);
            if (user) {
                return user;
            }
            return false;
        }
    } catch (error) {
        console.log("Invalid or tampered token:", error.message);
    }
    return false;
}

export async function verifyRefreshToken(token) {
    // try {
    //     const decoded = jwt.verify(token, "accessSecret");
    //     if (decoded?.id) {
    //         const user = await User.findById(decoded.id);
    //         if (user) {
    //             return user;
    //         }
    //         return false;
    //     }
    // } catch (error) {
    //     console.log("Invalid or tampered token:", error.message);
    // }
    // return false;
}