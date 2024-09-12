import { Response, NextFunction } from "express";
import { Request } from "../interfaces/auth";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("RequestLogger");

/**
 * Middleware function to log incoming HTTP requests.
 * Logs the HTTP method (GET, POST, etc.) and the requested URL.
 *
 * @param {Request} req - The HTTP request object, containing the method and URL.
 * @param {Response} res - The HTTP response object .
 * @param {NextFunction} next - Callback to pass control to the next middleware.
 */
export function requestLogger(req: Request, res: Response, next: NextFunction) {
  logger.info(`${req.method}:${req.url}`);

  // Proceed to the next middleware function
  next();
}
