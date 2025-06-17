import  generateTokens  from "../auth/tokensGeneration.js";
import { fillRefreshToken } from "./helpers.js";


export function configureSuccessResponse(response, message, data=[]) {
    return response.status(200).json({
        "status": "success",
        message,
        data,
    })
}


export function configureErrorResponse(response, status, message) {
    return response.status(status).json({
        "status": "error",
        message,
    })   
}


export async function configureResponseWithCookies(response, data) {
    const { accessToken, refreshToken } = generateTokens(data.id);
    await fillRefreshToken(data, refreshToken);
    response.cookie('access_token', accessToken, {
        httpOnly: false,
        sameSite: 'Strict',
        maxAge: 2 * 60 * 1000 * 60
    })
    .cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return configureSuccessResponse(response, "You've logged in successfully", data)
}