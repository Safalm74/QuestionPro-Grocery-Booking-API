import * as OrderServices from "../services/order";
import { Response, NextFunction } from "express";
import { Request } from "../interfaces/auth";
import { IOrderQuery } from "../interfaces/order";
import HttpStatusCode from "http-status-codes";

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

export async function updateOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { body } = req;
  } catch (error) {
    next(error);
  }
}

export async function deleteOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
  } catch (error) {}
}
