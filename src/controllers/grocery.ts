import * as GroceryService from "../services/grocery";
import { Response, NextFunction } from "express";
import { Request } from "../interfaces/auth";
import HttpStatusCode from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";
import { BadRequestError } from "../error/BadRequestError";
import { IGroceryQuery } from "../interfaces/grocery";
import { UUID } from "crypto";

const logger = loggerWithNameSpace("Grocery Controller");
/**
 * @swagger
 * /admin/grocery:
 *   post:
 *     summary: Create a new grocery item
 *     description: Create a new grocery item with the provided details.
 *     tags: [Grocery]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the grocery item
 *                 example: Apple
 *               description:
 *                 type: string
 *                 description: Description of the grocery item
 *                 example: Fruit
 *               price:
 *                 type: number
 *                 description: Price of the grocery item
 *                 example: 10
 *               quantity:
 *                 type: number
 *                 description: Quantity of the grocery item
 *                 example: 10
 *     responses:
 *       200:
 *         description: Grocery item created successfully
 *       400:
 *         description: Bad request
 */
export async function createGrocery(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("Request: createGrocery");
  try {
    const { body } = req;
    const userId = req.user!.id!;
    const data = await GroceryService.createGrocery(body, userId);

    res.status(HttpStatusCode.CREATED).json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * @swagger
 * /grocery:
 *   get:
 *     summary: Get a list of groceries
 *     description: Retrieve a list of groceries based on query filters.
 *     tags: [Grocery]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: Filter by grocery ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Pagination page number
 *       - in: query
 *         name: size
 *         schema:
 *           type: number
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of groceries
 *       400:
 *         description: Bad request
 */
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

/**
 * @swagger
 * /admin/grocery:
 *   get:
 *     summary: Get a list of groceries for admin
 *     description: Retrieve a list of groceries for admin users based on query filters.
 *     tags: [Grocery]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: Filter by grocery ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Pagination page number
 *       - in: query
 *         name: size
 *         schema:
 *           type: number
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of groceries for admin
 *       400:
 *         description: Bad request
 */
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

/**
 * @swagger
 * /admin/grocery/{id}:
 *   put:
 *     summary: Update a grocery item
 *     description: Update the details of an existing grocery item.
 *     tags: [Grocery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The grocery ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the grocery item
 *                 example: Apple Updated
 *               description:
 *                 type: string
 *                 description: Description of the grocery item
 *                 example: Fruit
 *               price:
 *                 type: number
 *                 description: Price of the grocery item
 *                 example: 10
 *               quantity:
 *                 type: number
 *                 description: Quantity of the grocery item
 *                 example: 10
 *     responses:
 *       200:
 *         description: Grocery item updated successfully
 *       400:
 *         description: Bad request
 */
export async function updateGrocery(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("Request: updateGrocery");
  try {
    const { id } = req.params as { id: UUID };
    const { body } = req;
    const userId = req.user!.id! as UUID;
    const data = await GroceryService.updateGrocery(id, body, userId);
    res.status(HttpStatusCode.OK).json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * @swagger
 * /admin/grocery/quantity/{id}:
 *   patch:
 *     summary: Update grocery quantity
 *     description: Update the quantity of a specific grocery item.
 *     tags: [Grocery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The grocery ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Quantity updated successfully
 *       400:
 *         description: Bad request
 */
export async function updateQuantity(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("Request: updateQuantity");
  try {
    const { id } = req.params as { id: UUID };
    const { body } = req;
    const userId = req.user!.id! as UUID;
    const data = await GroceryService.updateQuantity(id, body.quantity, userId);

    res.status(HttpStatusCode.OK).json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * @swagger
 * /admin/grocery/{id}:
 *   delete:
 *     summary: Delete a grocery item
 *     description: Delete a specific grocery item by its ID.
 *     tags: [Grocery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The grocery ID
 *     responses:
 *       200:
 *         description: Grocery item deleted successfully
 *       400:
 *         description: Bad request
 */
export async function deleteGrocery(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("Request: deleteGrocery");
  try {
    const { id } = req.params as { id: UUID };
    const data = await GroceryService.deleteGrocery(id);
    res.status(HttpStatusCode.NO_CONTENT).json(data);
  } catch (error) {
    next(error);
  }
}
