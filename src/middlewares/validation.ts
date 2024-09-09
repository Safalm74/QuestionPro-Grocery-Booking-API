import { Schema } from "joi";
import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../error/BadRequestError";

/**
 * middleware to validate req query
 * @param schema
 * @returns
 */
export function validateReqQuery(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.query);

    if (error) {
      next(new BadRequestError(error.message));

      return;
    }

    req.query = value;

    next();
  };
}

/**
 * middleware to validate req body
 * @param schema
 * @returns
 */
export function validateReqBody(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      next(new BadRequestError(error.message));

      return;
    }

    req.body = value;

    next();
  };
}

/**
 * middleware to validate req params
 * @param schema
 * @returns
 */
export function validateReqParams(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.params);

    if (error) {
      next(new BadRequestError(error.message));

      return;
    }

    req.params = value;

    next();
  };
}
