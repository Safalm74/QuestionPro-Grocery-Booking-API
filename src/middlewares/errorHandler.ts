import { NextFunction, Response } from "express";
import { Request } from "../interfaces/auth";
import HttpStatusCode from "http-status-codes";
import { UnauthicatedError } from "../error/UnauthenticatedError";
import { ForbiddenError } from "../error/ForbiddenError";
import { NotFoundError } from "../error/NotFoundError";
import { BadRequestError } from "../error/BadRequestError";
import { JsonWebTokenError } from "jsonwebtoken";
import { JWTExpiredError } from "../error/JWTExpiredError";
import { JWTMalformed } from "../error/JWTMalformed";
import { JWTInvalidSignatureError } from "../error/JWTInvalidSignatureError";

/**
 * error handler for 404
 */
export function notFoundError(req: Request, res: Response) {
  return res.status(HttpStatusCode.NOT_FOUND).json({
    message: "Not Found",
  });
}

/**
 * error handler for generic errors
 * @param error
 * @param req
 * @param res
 * @param next
 * @returns
 */
export function genericErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof UnauthicatedError) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      message: error.message,
    });
  }
  if (error instanceof ForbiddenError) {
    return res.status(HttpStatusCode.FORBIDDEN).json({
      message: error.message,
    });
  }
  if (error instanceof NotFoundError) {
    return res.status(HttpStatusCode.NOT_FOUND).json({
      message: error.message,
    });
  }

  if (error instanceof BadRequestError) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      message: error.message,
    });
  }

  if (error instanceof JsonWebTokenError) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      message: error.message,
    });
  }

  if (error instanceof JWTExpiredError) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      message: error.message,
    });
  }

  if (error instanceof JWTMalformed) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      message: error.message,
    });
  }

  if (error instanceof JWTInvalidSignatureError) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      message: error.message,
    });
  }

  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    error: error,
  });
}
