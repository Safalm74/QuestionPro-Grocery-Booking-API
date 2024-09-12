import { JWTMalformed } from "../error/JWTMalformed";
import { JWTInvalidSignatureError } from "../error/JWTInvalidSignatureError";
import { JsonWebTokenError, verify } from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { Request } from "../interfaces/auth";
import config from "../config";
import { UnauthicatedError } from "../error/UnauthenticatedError";
import { ForbiddenError } from "../error/ForbiddenError";
import loggerWithNameSpace from "../utils/logger";
import { IUser } from "../interfaces/user";
import { getPermisionsForRole } from "../services/roleAndPermission";

const logger = loggerWithNameSpace("Auth Middleware");

/**
 * Middleware function to authenticate a user using JWT.
 * Extracts and verifies the JWT from the request headers.
 * If the token is valid, attaches the user to the request object.
 * If the token is missing or invalid, an error is passed to the next middleware.
 *
 * @param {Request} req - The HTTP request object, which contains the headers and user information.
 * @param {Response} res - The HTTP response object.
 * @param {NextFunction} next - Callback to pass control to the next middleware function.
 */
export function authenticate(req: Request, res: Response, next: NextFunction) {
  logger.info("Authenticating user by email");

  //extracting authorization from request header
  const { authorization } = req.headers;

  logger.info("Checking if token exists");
  //checking if token is provided in authorization
  if (!authorization) {
    logger.error("No token provided");
    next(new UnauthicatedError("Un-Authenticated"));
  }

  /*
      the incoming token must have format of:
        "Bearer <token>"
      to ensure this, 
      refresh token is splitted by (" ")
      then checked if token[0]==="Bearer"
      and splitted token is of length 2
    */
  const token = authorization?.split(" ");

  if (token?.length !== 2 || token[0] !== "Bearer") {
    logger.error("Invalid token");
    next(new UnauthicatedError("Un-Authenticated"));

    return;
  }
  logger.info("verifying token");
  try {
    //JWT verify verifies the token and returns decoded token if verified
    const user = verify(token[1], config.jwt.jwt_secret!) as Omit<
      IUser,
      "password"
    >;

    logger.info("Verified token");

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Middleware function to check the user's role.
 * Verifies if the user's role matches the required role for accessing a specific route.
 *
 * @param {string} role - The role required to access the route.
 * @returns {Function} - The middleware function to check the role.
 */
export function checkRole(role: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!;

    // If the user's role does not match the required role, return a Forbidden error
    if (role != user.role) {
      next(new ForbiddenError("Not allowed to access this route"));

      return;
    }

    next();
  };
}

/**
 * Middleware function to check the user's permission.
 * Verifies if the user has the required permission for accessing a specific route.
 *
 * @param {string} permission - The permission required to access the route.
 * @returns {Function} - The middleware function to check the permission.
 */
export function authorize(permission: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!;

    const permissions = await getPermisionsForRole(user.role);

    //checking if permission required includes for user
    if (!permissions.includes(permission)) {
      logger.error("Permission not granted");

      next(new ForbiddenError("Forbidden"));

      return;
    }
    logger.info("Authorized");

    next();
  };
}
