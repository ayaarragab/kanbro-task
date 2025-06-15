import serverErrorHandler from "../utils.js/helper.js";
import User from "../models/user.js";
import { registerHandler } from "../auth/registerUser.js";
import { loginHandler } from "../auth/loginUser.js";


export const register = async (request, response) => {
    try {
        const username = request.body.username;
        const password = request.body.password;
        if (!username || !password) {
            return response.status(401).json(
                {
                    "status": "error",
                    "message": "An error occurred.",
                    "error": {
                        "code": 401,
                        "details": "username and password are required! One of them is missing."
                    }
                }
            )
        }
        const user = await registerHandler(username, password);
        if (!user) {
            return response.status(400).json(
                {
                    "status": "error",
                    "message": "An error occurred.",
                    "error": {
                        "code": 400,
                        "details": "This username was used before."
                    }
                }
            )
        }
        return response.status(200).json(
            {
                "status": "success",
                "message": "You've registered successfully.",
                "data": user
            }
        )
    } catch (error) {
        serverErrorHandler(response, error);
    }
}

export const login = async (request, response) => {
    try {
        const username = request.body.username;
        const password = request.body.password;
        if (!username || !password) {
            return response.status(400).json(
                {
                    "status": "error",
                    "message": "An error occurred.",
                    "error": {
                        "code": 401,
                        "details": "username and password are required! One of them is missing."
                    }
                }
            )
        }
        const user = await loginHandler(username, password);
        if (user) {
            return response.status(200).json(
                {
                    "status": "success",
                    "message": "You've registered successfully.",
                    "token": "authorization token",
                    "data": {
                        user
                    }
                }
            )
        }
        return response.status(401).json(
            {
                "status": "falied",
                "message": "You've to register first",
            }
        )
    } catch (error) {
        serverErrorHandler(response, error);
    }
}