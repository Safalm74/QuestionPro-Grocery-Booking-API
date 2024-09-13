import * as OrderServices from "../services/order";
import { Response, NextFunction } from "express";
import { Request } from "../interfaces/auth";
import { IOrder, IOrderQuery } from "../interfaces/order";
import HttpStatusCode from "http-status-codes";
import { UUID } from "crypto";

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Create a new order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     groceryId:
 *                       type: string
 *                       description: ID of the order item
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID of the order
 *                 status:
 *                   type: string
 *                   description: Status of the order
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the order was created
 *                 createdBy:
 *                   type: string
 *                   description: ID of the user who created the order
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the order was last updated (if any)
 *                 updatedBy:
 *                   type: string
 *                   description: ID of the user who last updated the order (if any)
 *                 deletedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the order was deleted (if any)
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
export async function createOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { body } = req;
    const data = await OrderServices.createOrder(body, req.user!.id!);

    res.status(HttpStatusCode.CREATED).json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * @swagger
 * /admin/order:
 *   get:
 *     summary: Get orders for admin
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: Filter by order ID
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
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID of the order
 *                       status:
 *                         type: string
 *                         description: Status of the order
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: The date and time when the order was created
 *                       createdBy:
 *                         type: string
 *                         description: ID of the user who created the order
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: The date and time when the order was last updated (if any)
 *                       updatedBy:
 *                         type: string
 *                         description: ID of the user who last updated the order (if any)
 *                       deletedAt:
 *                         type: string
 *                         format: date-time
 *                         description: The date and time when the order was deleted (if any)
 *                 total:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       count:
 *                         type: number
 *                         description: Total count of the orders
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
export async function getAdminOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const filter = req.query as IOrderQuery;

    const data = await OrderServices.getOrder(filter);
    res.status(HttpStatusCode.OK).json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * @swagger
 * /order:
 *   get:
 *     summary: Get orders for a user
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: Filter by order ID
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
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID of the order
 *                       status:
 *                         type: string
 *                         description: Status of the order
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: The date and time when the order was created
 *                       createdBy:
 *                         type: string
 *                         description: ID of the user who created the order
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: The date and time when the order was last updated (if any)
 *                       updatedBy:
 *                         type: string
 *                         description: ID of the user who last updated the order (if any)
 *                       deletedAt:
 *                         type: string
 *                         format: date-time
 *                         description: The date and time when the order was deleted (if any)
 *                 total:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       count:
 *                         type: number
 *                         description: Total count of the orders
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
export async function getOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const filter = req.query as IOrderQuery;
    const userId = req.user!.id!;

    const data = await OrderServices.getOrder(filter, userId);
    res.status(HttpStatusCode.OK).json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * @swagger
 * /order/status/{id}:
 *   patch:
 *     summary: Update order status
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: Updated order status
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID of the order
 *                 status:
 *                   type: string
 *                   description: Status of the order
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the order was created
 *                 createdBy:
 *                   type: string
 *                   description: ID of the user who created the order
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the order was last updated (if any)
 *                 updatedBy:
 *                   type: string
 *                   description: ID of the user who last updated the order (if any)
 *                 deletedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the order was deleted (if any)
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
export async function updateOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params as { id: UUID };
    const status = req.body as Pick<IOrder, "status" | "updatedBy">;
    const userId = req.user!.id! as UUID;

    const data = await OrderServices.updateStatus(id, status, userId);

    res.status(HttpStatusCode.OK).json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * @swagger
 * /admin/order/status/{id}/:
 *   patch:
 *     summary: Update order quantity by admin
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 description: Updated quantity for the order
 *     responses:
 *       200:
 *         description: Order quantity updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID of the order
 *                 status:
 *                   type: string
 *                   description: Status of the order
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the order was created
 *                 createdBy:
 *                   type: string
 *                   description: ID of the user who created the order
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the order was last updated (if any)
 *                 updatedBy:
 *                   type: string
 *                   description: ID of the user who last updated the order (if any)
 *                 deletedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the order was deleted (if any)
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
export async function updateOrderQuantityByAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params as { id: UUID };
    const status = req.body as Pick<IOrder, "status" | "updatedBy">;
    const userId = req.user!.id! as UUID;

    const data = await OrderServices.updateStatusByAdmin(id, status, userId);

    res.status(HttpStatusCode.OK).json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * @swagger
 * /admin/order/{id}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
export async function deleteOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params as { id: UUID };

    const data = await OrderServices.deleteOrder(id);

    res.status(HttpStatusCode.NO_CONTENT).json(data);
  } catch (error) {
    next(error);
  }
}
