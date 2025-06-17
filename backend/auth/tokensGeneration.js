import jwt from "jsonwebtoken";

export function generateAccessToken(id) {
    try {
        const accessToken = jwt.sign({ id }, "accessSecret", {
            expiresIn: "2h",
        });
        return accessToken;
    } catch (error) {
        console.log(error);
    }
}

function generateRefreshToken(id) {
    try {
        const refreshToken = jwt.sign({ id }, "accessSecret", {
            expiresIn: "7d",
        });
        return refreshToken;
    } catch (error) {
        console.log(error);
    }
}

export default function generateTokens(id) {
    const refreshToken = generateRefreshToken(id);
    const accessToken = generateAccessToken(id);
    return { accessToken, refreshToken };
}