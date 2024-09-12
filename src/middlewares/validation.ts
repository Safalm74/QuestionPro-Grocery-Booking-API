import { Schema } from "joi";
import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../error/BadRequestError";

/**
 * Middleware to validate the request query parameters against a given schema.
 * If validation fails, a BadRequestError is passed to the next middleware.
 * Otherwise, it sanitizes the query and allows the request to proceed.
 *
 * @param {Schema} schema - The Joi schema against which the query is validated.
 * @returns {(req: Request, res: Response, next: NextFunction) => void} Middleware function.
 */
export function validateReqQuery(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Validate the request query using the provided schema
    const { error, value } = schema.validate(req.query);

    // If validation fails, pass a BadRequestError to the next middleware
    if (error) {
      next(new BadRequestError(error.message));

      return;
    }

    // If validation succeeds, assign the validated value to req.query
    req.query = value;

    // Proceed to the next middleware
    next();
  };
}

/**
 * Middleware to validate the request body against a given schema.
 * If validation fails, a BadRequestError is passed to the next middleware.
 * Otherwise, it sanitizes the body and allows the request to proceed.
 *
 * @param {Schema} schema - The Joi schema against which the body is validated.
 * @returns {(req: Request, res: Response, next: NextFunction) => void} Middleware function.
 */
export function validateReqBody(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Validate the request body using the provided schema
    const { error, value } = schema.validate(req.body);

    // If validation fails, pass a BadRequestError to the next middleware
    if (error) {
      next(new BadRequestError(error.message));

      return;
    }

    // If validation succeeds, assign the validated value to req.body
    req.body = value;

    // Proceed to the next middleware
    next();
  };
}

/**
 * Middleware to validate the request route parameters (req.params) against a given schema.
 * If validation fails, a BadRequestError is passed to the next middleware.
 * Otherwise, it sanitizes the params and allows the request to proceed.
 *
 * @param {Schema} schema - The Joi schema against which the params are validated.
 * @returns {(req: Request, res: Response, next: NextFunction) => void} Middleware function.
 */
export function validateReqParams(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Validate the request params using the provided schema
    const { error, value } = schema.validate(req.params);

    // If validation fails, pass a BadRequestError to the next middleware
    if (error) {
      next(new BadRequestError(error.message));

      return;
    }

    // If validation succeeds, assign the validated value to req.params
    req.params = value;

    // Proceed to the next middleware
    next();
  };
}
