import { UUID } from "crypto";
import { IOrderItems } from "../interfaces/orderItems";
import { OrderItemsModel } from "../models/orderItems";

export async function create(data: IOrderItems[]) {
  return await OrderItemsModel.create(data);
}

export async function get(id?: UUID) {
  return await OrderItemsModel.get(id);
}

export async function update(id: UUID, data: IOrderItems) {
  return await OrderItemsModel.update(id, data);
}

export async function deleteOrderItem(id: UUID) {
  return await OrderItemsModel.delete(id);
}
