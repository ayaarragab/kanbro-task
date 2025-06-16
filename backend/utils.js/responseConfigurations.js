/**
 * Utility functions for configuring HTTP responses in an Express.js application.
 *
 * This module provides functions to send success and error responses, as well as
 * responses with cookies, to clients. It includes:
 * - `configureSuccessResponse`: Sends a success response with optional data.
 * - `configureErrorResponse`: Sends an error response with a status code and message.
 * - `configureResponseWithCookie`: Sends a success response with cookies for authentication tokens.
 *
 * @module responseConfigurations
 */

import  generateTokens  from "../auth/tokensGeneration.js";
import { fillRefreshToken } from "./helpers.js";


/**
 * Configures and sends a success response to the client.
 *
 * @param {Object} response - The response object from the Express framework.
 * @param {number} status - The HTTP status code for the response.
 * @param {string} message - A message describing the success of the operation.
 * @param {Array} [data=[]] - Optional data to include in the response body.
 */
export function configureSuccessResponse(response, message, data=[]) {
    return response.status(200).json({
        "status": "success",
        message,
        data,
    })
}


/**
 * Configures an error response by setting the HTTP status code and sending a JSON object
 * with an error status and message.
 *
 * @param {Object} response - The response object from an Express.js route handler.
 * @param {number} status - The HTTP status code to set for the response.
 * @param {string} message - The error message to include in the response body.
 */
export function configureErrorResponse(response, status, message) {
    return response.status(status).json({
        "status": "error",
        message,
    })   
}


/**
 * Configures an HTTP response with cookies and a success message.
 *
 * @param {Object} response - The HTTP response object to configure.
 * @param {Object} data - The data to include in the response body.
 *
 * @description
 * This function generates access and refresh tokens using the `generateTokens` function
 * and attaches them as cookies to the response. It also configures the response with
 * a success message and status code. The cookies are set with specific attributes:
 * - `access_token`: Not HTTP-only, secure, strict same-site policy, short expiration.
 * - `refresh_token`: HTTP-only, secure, strict same-site policy, long expiration.
 */
export async function configureResponseWithCookies(response, data) {
    const { accessToken, refreshToken } = generateTokens(data.id);
    await fillRefreshToken(data, refreshToken);
    response.cookie('access_token', accessToken, {
        httpOnly: false,
        secure: true,
        sameSite: 'Strict',
        maxAge: 15
    })
    .cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return configureSuccessResponse(response, "You've logged in successfully", data)
}