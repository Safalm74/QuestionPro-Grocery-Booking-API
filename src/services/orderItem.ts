import { UUID } from "crypto";
import { IOrderItems } from "../interfaces/orderItem";
import { OrderItemsModel } from "../models/orderItem";

export async function create(data: IOrderItems[]) {
  return await OrderItemsModel.create(data);
}

export async function get(id?: UUID, orderId?: UUID) {
  return await OrderItemsModel.get(id, orderId);
}

export async function update(id: UUID, data: IOrderItems) {
  return await OrderItemsModel.update(id, data);
}

export async function deleteOrderItem(id: UUID) {
  return await OrderItemsModel.delete(id);
}
