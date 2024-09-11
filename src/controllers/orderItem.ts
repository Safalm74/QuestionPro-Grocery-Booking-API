import * as OrderItemService from "../services/orderItem";
import { Response, NextFunction } from "express";
import { Request } from "../interfaces/auth";
import { IOrderItems } from "../interfaces/orderItem";
import HttpStatusCode from "http-status-codes";
import { UUID } from "crypto";

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
