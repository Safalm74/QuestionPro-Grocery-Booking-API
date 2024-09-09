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
