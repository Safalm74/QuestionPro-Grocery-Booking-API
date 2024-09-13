import * as OrderItemService from "../services/orderItem";
import { Response, NextFunction } from "express";
import { Request } from "../interfaces/auth";
import HttpStatusCode from "http-status-codes";
import { UUID } from "crypto";

/**
 * @swagger
 * /order-items/{orderId}:
 *   get:
 *     summary: Get order item by ID
 *     description: Retrieve a specific order item by its unique ID.
 *     tags:
 *       - Order Item
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         description: UUID of the order to get order items of the order
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Order item retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 name:
 *                   type: string
 *                   description: Name of the order item
 *                 price:
 *                   type: number
 *                   description: Price of the order item
 *                 quantity:
 *                   type: number
 *                   description: Quantity ordered
 *       400:
 *         description: Invalid ID supplied
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Order item not found
 *       500:
 *         description: Internal server error
 */
export async function getOrderItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params as { id: UUID };
    const data = await OrderItemService.get(id);

    res.status(HttpStatusCode.OK).json(data);
  } catch (error) {
    next(error);
  }
}
