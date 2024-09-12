import { Response, NextFunction } from "express";
import { Request } from "../interfaces/auth";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("RequestLogger");

/**
 * logger middleware
 * @param req
 * @param res
 * @param next
 */
export function requestLogger(req: Request, res: Response, next: NextFunction) {
  logger.info(`${req.method}:${req.url}`);

  next();
}
