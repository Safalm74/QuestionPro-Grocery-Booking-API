import { UUID } from "crypto";
import { IOrderItems } from "../interfaces/orderItem";
import { OrderItemsModel } from "../models/orderItem";
import { NotFoundError } from "../error/NotFoundError";
/**
 * Service function to create order items.
 *
 * @param data - The order items to create.
 * @returns The created order items.
 */
export async function create(data: IOrderItems[]) {
  return await OrderItemsModel.create(data);
}

/**
 * Service function to retrieve order items.
 *
 * @param orderId - The ID of the order to filter by (optional).
 * @param id - The ID of the specific order item to retrieve (optional).
 * @returns The requested order items.
 * @throws NotFoundError if no order items are found for the given IDs.
 */
export async function get(orderId?: UUID, id?: UUID) {
  return await OrderItemsModel.get(orderId, id);
}

/**
 * Service function to update an order item.
 *
 * @param id - The ID of the order item to update.
 * @param data - The updated order item data.
 * @returns The updated order item.
 * @throws NotFoundError if the order item does not exist.
 */
export async function update(id: UUID, data: IOrderItems) {
  const existingOrderItem = (await get(undefined, id))[0];
  if (!existingOrderItem) {
    throw new NotFoundError(`Order item ${id} not found`);
  }

  return await OrderItemsModel.update(id, data);
}

/**
 * Service function to delete an order item.
 *
 * @param id - The ID of the order item to delete.
 * @returns The result of the deletion operation.
 * @throws NotFoundError if the order item does not exist.
 */
export async function deleteOrderItem(id: UUID) {
  const existingOrderItem = (await get(undefined, id))[0];
  if (!existingOrderItem) {
    throw new NotFoundError(`Order item ${id} not found`);
  }

  return await OrderItemsModel.delete(id);
}
