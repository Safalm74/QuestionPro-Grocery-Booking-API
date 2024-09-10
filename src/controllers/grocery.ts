import * as GroceryService from "../services/grocery";
import { Response, NextFunction } from "express";
import { Request } from "../interfaces/auth";
import HttpStatusCode from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";
import { BadRequestError } from "../error/BadRequestError";
import { IGroceryQuery } from "../interfaces/grocery";

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

    console.log(data);

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
    const { id } = req.params;
    const { body } = req;
    const data = await GroceryService.updateGrocery();
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
    const { id } = req.params;
    const data = await GroceryService.deleteGrocery();
    res.status(HttpStatusCode.OK).json(data);
  } catch (error) {
    next(error);
  }
}
