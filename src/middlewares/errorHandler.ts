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
import { InsufficientQuantityError } from "../error/insufficientQuantity";

/**
 * Middleware function to handle 404 Not Found errors.
 * Sends a response with a 404 status code when a route is not found.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns {Response} - JSON response with a "Not Found" message.
 */
export function notFoundError(req: Request, res: Response) {
  return res.status(HttpStatusCode.NOT_FOUND).json({
    message: "Not Found",
  });
}

/**
 * Generic error handler middleware function.
 * It handles different types of known errors and sends an appropriate response
 * with a specific HTTP status code and error message.
 * If the error type is not recognized, it defaults to a 500 Internal Server Error.
 *
 * @param {Error} error - The error object passed by the previous middleware.
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @param {NextFunction} next - Callback to pass control to the next middleware.
 * @returns {Response} - JSON response with the corresponding error message and status code.
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

  if (error instanceof InsufficientQuantityError) {
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
