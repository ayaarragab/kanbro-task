import User from "../models/user.js";

export async function verifyAccessToken(token) {
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded?.id) {
            const user = await User.findById(decoded.id);
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
    try {
        const decoded = jwt.verify(token, process.env.RJWT_SECRET_KEY);
        if (decoded?.id) {
            const user = await User.findById(decoded.id);
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