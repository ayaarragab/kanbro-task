/**
 * Helper functions for userController.js
 */

/**
 * 
 * @param {*} request 
 * @param {*} response 
 * @returns response with 400 status if one of them or both of them doesn't exist
 */
export function extractAndValidate(request, response) {
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
        return { username, password };
}


/**
 * 
 * @param {*} user 
 * @param {*} refreshToken 
 */
export async function fillRefreshToken (user, refreshToken) {
    user.refresh_token = refreshToken;
    await user.save();
}


