import * as GroceryService from "../services/grocery";
import { Response, NextFunction } from "express";
import { Request } from "../interfaces/auth";
import HttpStatusCode from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";
import { BadRequestError } from "../error/BadRequestError";
import { IGroceryQuery } from "../interfaces/grocery";
import { UUID } from "crypto";

const logger = loggerWithNameSpace("Grocery Controller");

export async function createGrocery(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("Request: createGrocery");
  try {
    const { body } = req;
    const data = await GroceryService.createGrocery(body);

    res.status(HttpStatusCode.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export async function getGrocery(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("Request: getGrocery");
  try {
    const filter = req.query as IGroceryQuery;
    const data = await GroceryService.getGroceries(filter);

    res.status(HttpStatusCode.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export async function getGroceriesForAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("Request: getGrocery");
  try {
    const filter = req.query as IGroceryQuery;
    const data = await GroceryService.getGroceriesForAdmin(filter);

    res.status(HttpStatusCode.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export async function updateGrocery(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("Request: updateGrocery");
  try {
    const { id } = req.params as { id: UUID };
    const { body } = req;
    const data = await GroceryService.updateGrocery(id, body);
    res.status(HttpStatusCode.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export async function updateQuantity(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("Request: updateQuantity");
  try {
    const { id } = req.params as { id: UUID };
    const { body } = req;
    const data = await GroceryService.updateQuantity(id, body.quantity);

    res.status(HttpStatusCode.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export async function deleteGrocery(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("Request: deleteGrocery");
  try {
    const { id } = req.params as { id: UUID };
    const data = await GroceryService.deleteGrocery(id);
    res.status(HttpStatusCode.OK).json(data);
  } catch (error) {
    next(error);
  }
}
