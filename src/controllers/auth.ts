import { Request, Response, NextFunction } from "express";
import * as AuthService from "../services/auth";
import HttpStatusCode from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";
import { BadRequestError } from "../error/BadRequestError";

const logger = loggerWithNameSpace("Auth Controller");

/**
 * Responds with access token and refresh token if credentials 
  are correct else error is responded
 * @param req 
 * @param res 
 * @param next 
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
 * Responds with access token and refresh token if credentials 
  are correct else error is responded
 * @param req 
 * @param res 
 * @param next 
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
