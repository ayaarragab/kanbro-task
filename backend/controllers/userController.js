import serverErrorHandler from "../utils.js/serverErrorsHandler.js";
import { loginHandler, registerHandler } from "../services/userService.js";
import { configureSuccessResponse,
        configureErrorResponse,
        configureResponseWithCookies } from "../utils.js/responseConfigurations.js";
import { extractAndValidate } from "../utils.js/helpers.js";
import { verifyRefreshToken } from "../auth/tokensVerfication.js";
import { generateAccessToken } from "../auth/tokensGeneration.js";

export const register = async (request, response) => {
    try {
        const { username, password } = extractAndValidate(request, response);
        const user = await registerHandler(username, password);
        if (!user)
            return configureErrorResponse(response, 400, 'User already exists');
        return configureSuccessResponse(response, "You've registered successfully", data);
    } catch (error) {
        serverErrorHandler(response, error);
    }
}

export const login = async (request, response) => {
    try {
        const { username, password } = extractAndValidate(request, response);
        try {
            const result = await loginHandler(username, password);
            
            if (result) {
                return configureResponseWithCookies(response, result);
            } else if(result && typeof result === 'string'){
                return configureErrorResponse(response, 400, result);
            } else {
                return configureErrorResponse(response, 401, "You've to register first");
            }
        } catch (error) {
            serverErrorHandler(response, error);            
        }
    } catch (error) {
        serverErrorHandler(response, error);
    }
}

export const regenerateAccessToken = async (request, response) => {
    try {
        console.log(request.cookies);
        
        const refreshToken = request.cookies.refresh_token;
        const userData = request.body.data;
        if (!refreshToken) {
            configureErrorResponse(response, 401, "You don't have a refresh token");
        }
        const res = await verifyRefreshToken(refreshToken);
        if (res) {
            try {
                const newAccessToken = generateAccessToken(userData.id);
                configureSuccessResponse(response, 'New Access Token Generated Successfully', { 'access_token': newAccessToken })
            } catch (error) {
                serverErrorHandler(response, error);
            }
        }
    } catch (error) {
        serverErrorHandler(response, error);
    }
}

export const logout = async (request, response) => {
    
}