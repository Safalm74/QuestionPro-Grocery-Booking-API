import { UUID } from "crypto";

export interface IOrderItems {
  id?: UUID;
  orderId: UUID;
  groceryId: UUID;
  quantity: number;
  pricePerUnit?: number;
  createdAt?: Date;
}
