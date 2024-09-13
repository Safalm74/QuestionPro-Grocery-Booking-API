import { UUID } from "crypto";
import { IOrder, IOrderQuery } from "../interfaces/order";
import { OrderModel } from "../models/order";
import * as orderItemService from "./orderItem";
import { getGroceries, updateQuantity } from "./grocery";
import { InsufficientQuantityError } from "../error/insufficientQuantity";
import { NotFoundError } from "../error/NotFoundError";
import { BadRequestError } from "../error/BadRequestError";

/**
 * Service function to create a new order.
 *
 * @param data - The order data to create.
 * @param userId - The ID of the user creating the order.
 * @returns The created order.
 * @throws NotFoundError if any grocery item is not found.
 * @throws InsufficientQuantityError if any grocery item does not have enough quantity.
 */
export async function createOrder(data: IOrder, userId: UUID) {
  data.createdBy = userId;
  data.status = "pending";

  const order = (await OrderModel.create(data))[0] as IOrder;

  const orderItems = await Promise.all(
    data.items.map(async (item) => {
      const grocery = await getGroceries({ id: item.groceryId });

      if (!grocery[0]) {
        throw new NotFoundError(`Grocery item ${item.groceryId} not found`);
      }
      if (grocery[0].quantity < item.quantity) {
        throw new InsufficientQuantityError(
          `Insufficient quantity for grocery item ${item.groceryId}`
        );
      }

      const newQuantity = grocery[0].quantity - item.quantity;
      await updateQuantity(item.groceryId, newQuantity, userId);

      return {
        orderId: order.id!,
        groceryId: item.groceryId,
        quantity: item.quantity,
        pricePerUnit: (await getGroceries({ id: item.groceryId }))[0].price,
      };
    })
  );

  await orderItemService.create(orderItems);

  return order;
}

/**
 * Service function to get orders for a user.
 *
 * @param filter - Query parameters to filter orders.
 * @param userId - The ID of the user to filter orders by.
 * @returns List of orders for the user.
 * @throws NotFoundError if the order does not exist.
 */
export async function getOrder(filter: IOrderQuery, userId?: UUID) {
  filter.userId = userId;

  const data = (await OrderModel.get(filter)).data;

  if (filter.id && !data[0]) {
    throw new NotFoundError("Order does not exist");
  }

  return data;
}

/**
 * Service function to update the status of an existing order.
 *
 * @param id - The ID of the order to update.
 * @param data - The new status and updater ID.
 * @param userId - The ID of the user updating the order.
 * @returns The updated order.
 * @throws NotFoundError if the order does not exist.
 * @throws BadRequestError if trying to update a completed or cancelled order.
 */
export async function updateStatus(
  id: UUID,
  data: Pick<IOrder, "status" | "updatedBy">,
  userId: UUID
) {
  data.updatedBy = userId;

  const existingOrder = (await OrderModel.get({ id })).data[0];
  if (!existingOrder) {
    throw new NotFoundError("Order does not exist");
  }

  if (existingOrder.status === "completed") {
    throw new BadRequestError("Order already completed");
  }

  if (existingOrder.status === "cancelled") {
    throw new BadRequestError("Order already cancelled");
  }

  if (data.status === "cancelled") {
    const items = await orderItemService.get(id);

    items.forEach(async (item) => {
      const grocery = await getGroceries({ id: item.groceryId });
      const newQuantity = grocery[0].quantity + item.quantity;
      await updateQuantity(item.groceryId, newQuantity, userId);
    });
  }

  return await OrderModel.update(id, data);
}

export async function updateStatusByAdmin(
  id: UUID,
  data: Pick<IOrder, "status" | "updatedBy">,
  userId: UUID
) {
  data.updatedBy = userId;

  const existingOrder = (await OrderModel.get({ id })).data[0];
  if (!existingOrder) {
    throw new NotFoundError("Order does not exist");
  }

  if (existingOrder.status === "cancelled") {
    throw new BadRequestError("Order already cancelled");
  }

  if (data.status === "cancelled") {
    const items = await orderItemService.get(id);

    items.forEach(async (item) => {
      const grocery = await getGroceries({ id: item.groceryId });
      const newQuantity = grocery[0].quantity + item.quantity;
      await updateQuantity(item.groceryId, newQuantity, userId);
    });

    return await OrderModel.update(id, data);
  }
}
/**
 * Service function to delete an order.
 *
 * @param id - The ID of the order to delete.
 * @returns The result of the deletion operation.
 * @throws NotFoundError if the order does not exist.
 */
export async function deleteOrder(id: UUID) {
  const existingOrder = (await OrderModel.get({ id })).data[0];

  if (!existingOrder) {
    throw new NotFoundError("Order does not exist");
  }

  return await OrderModel.delete(id);
}
