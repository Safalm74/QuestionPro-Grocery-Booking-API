import { UUID } from "crypto";

export interface IOrderItems {
  id?: UUID;
  orderId: UUID;
  groceryId: UUID;
  description: string;
  quantity: number;
  pricePerUnit?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
}
