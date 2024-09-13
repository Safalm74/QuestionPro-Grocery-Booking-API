import { Request, Response, NextFunction } from "express";
import * as AuthService from "../services/auth";
import HttpStatusCode from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";
import { BadRequestError } from "../error/BadRequestError";

const logger = loggerWithNameSpace("Auth Controller");

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logs in a user and returns access and refresh tokens.
 *     description: Responds with an access token and refresh token if the credentials are correct. Otherwise, an error is returned.
 *     tags: [Auth]
 *     requestBody:
 *       description: User login credentials.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: 9VnZv@example.com
 *               password:
 *                 type: string
 *                 example: Aapple!123456
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Successful login, returns access and refresh tokens.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                     refreshToken:
 *                       type: string
 *       401:
 *         description: UnauthicatedError.
 *       500:
 *         description: Internal server error.
 */
export async function login(req: Request, res: Response, next: NextFunction) {
  logger.info("Request: login");
  try {
    const { body } = req;
    const data = await AuthService.login(body);

    const refreshToken = "Bearer " + data.refreshToken;

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
    });

    logger.info("cookies sent");

    res.status(HttpStatusCode.OK).json({ data });
  } catch (error) {
    next(error);
  }
}

/**
 * @swagger
 * /auth/refreshAccessToken:
 *   post:
 *     summary: Refreshes the access token using the refresh token.
 *     description: Generates a new access token if a valid refresh token is provided.
 *     parameters:
 *       - in: cookie
 *         name: refreshToken
 *         description: Refresh token to be used for refreshing the access token.
 *         required: true
 *         schema:
 *           type: string
 *           description: JWT token.
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Successful refresh of access token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       400:
 *         description: No refresh token provided or invalid token.
 *       500:
 *         description: Internal server error.
 */
export async function refreshAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("Request: Refresh access token");
  try {
    const { refreshToken } = req.cookies;

    //checking if token is provided in authorization
    if (!refreshToken) {
      throw new BadRequestError("No token provided");
    }

    //generating new access token using the refresh token
    const data = await AuthService.refreshAccessToken(refreshToken);

    res.status(HttpStatusCode.OK).json(data);
  } catch (error) {
    next(error);
  }
}
