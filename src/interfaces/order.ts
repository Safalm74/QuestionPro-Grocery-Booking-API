import { UUID } from "crypto";
import { IBaseQuery } from "./baseQuery";
import { IOrderItems } from "./orderItem";

export interface IOrder {
  id?: UUID;
  status?: "pending" | "completed" | "cancelled";
  items: IOrderItems[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
}

export interface IOrderQuery extends IBaseQuery {
  userId?: UUID;
}
