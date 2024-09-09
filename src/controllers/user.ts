import { Request, Response, NextFunction } from "express";
import HttpStatusCode from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";
import * as UserService from "../services/user";
import { UUID } from "crypto";

const logger = loggerWithNameSpace("Controller: user");

/**
 * @swagger
 * /user:
 *   post:
 *     tags: [User]
 *     summary: Create a new user
 *     description: Add a new user to the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: 9VnZv@example.com
 *               password:
 *                 type: string
 *                 example: Aapple!123456
 *               phone:
 *                 type: string
 *                 example: 123456789
 *               address:
 *                 type: string
 *                 example: 123 Main St
 *               role:
 *                 type: string
 *                 enum:
 *                   - admin
 *                   - user
 *                 example: user
 *     responses:
 *       201:
 *         description: User created successfully
 */
export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("Request: Add user");
  try {
    const { body } = req; //getting new user data from request body

    const req_user = await UserService.createUser(body);

    res.status(HttpStatusCode.CREATED).json(req_user);
  } catch (error) {
    next(error);
  }
}

/**
 * @swagger
 * /user:
 *   get:
 *     tags: [User]
 *     summary: Get all users
 *     description: Retrieve a list of users, you can set page number with size
 *     responses:
 *       200:
 *         description: A JSON array of user objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *                   address:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                   deleted_at:
 *                     type: string
 *                   updated_at:
 *                     type: string
 */
export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("Request: read users");

  try {
    const { query } = req;

    const data = await UserService.getUsers(query);

    res.json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     tags: [User]
 *     summary: Update a user
 *     description: Modify details of an existing user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's unique ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe update
 *               email:
 *                 type: string
 *                 example: 9VnZv@example.com
 *               password:
 *                 type: string
 *                 example: Aapple!123456
 *               phone:
 *                 type: string
 *                 example: 123456789
 *               address:
 *                 type: string
 *                 example: 123 Main St
 *               role:
 *                 type: string
 *                 enum:
 *                   - admin
 *                   - user
 *                 example: user
 *     responses:
 *       200:
 *         description: User updated successfully
 */
export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("Request: update user");

  try {
    const { body } = req;
    const { id } = req.params as { id: UUID };

    res.status(HttpStatusCode.OK).json(await UserService.updateUser(id, body));
  } catch (error) {
    next(error);
  }
}

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     tags: [User]
 *     summary: Delete a user
 *     description: Remove a user from the system
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's unique ID
 *     responses:
 *       204:
 *         description: User deleted successfully
 */
export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params as { id: UUID };

    res
      .status(HttpStatusCode.NO_CONTENT)
      .json(await UserService.deleteUser(id));
  } catch (error) {
    next(error);
  }
}
