import { verifyAccessToken } from "./tokensVerfication.js";
import { configureErrorResponse } from "../utils.js/responseConfigurations.js";

export const authenticate = async(request, response, next) => {
        try {            
            const bearer = request.headers.authorization;
            if (!bearer) {
                return configureErrorResponse(response, 401, "You are not authorized to access this page!");
            }
            
            const token = bearer.split(" ")[1];
            if (!token) {
                return configureErrorResponse(response, 400, "Token doesn't exist");
            }

            try {
                const user = await verifyAccessToken(token);
                
                if (user) {
                    request.user = user;
                    next();
                } else {
                    return configureErrorResponse(response, 401, "Invalid or expired token");
                }
            } catch (error) {
                serverErrorsHandler(response, error);
            }
        } catch (error) {
            serverErrorsHandler(response, error);
        }
}