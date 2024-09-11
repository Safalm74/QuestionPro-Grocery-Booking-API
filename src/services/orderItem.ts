import { UUID } from "crypto";
import { IOrderItems } from "../interfaces/orderItem";
import { OrderItemsModel } from "../models/orderItem";

export async function create(data: IOrderItems[]) {
  return await OrderItemsModel.create(data);
}

export async function get(orderId?: UUID, id?: UUID) {
  return await OrderItemsModel.get(orderId, id);
}

export async function update(id: UUID, data: IOrderItems) {
  return await OrderItemsModel.update(id, data);
}

export async function deleteOrderItem(id: UUID) {
  return await OrderItemsModel.delete(id);
}
