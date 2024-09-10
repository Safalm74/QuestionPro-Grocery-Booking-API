import { UUID } from "crypto";
import { IBaseQuery } from "./baseQuery";

export interface IOrder {
  id?: UUID;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
}

export interface IOrderQuery extends IBaseQuery {}
