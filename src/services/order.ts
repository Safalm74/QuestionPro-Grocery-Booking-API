import { UUID } from "crypto";
import { IOrder, IOrderQuery } from "../interfaces/order";
import { OrderModel } from "../models/order";
import * as orderItemService from "./orderItem";
import { getGroceries, updateQuantity } from "./grocery";
import { InsufficientQuantityError } from "../error/insufficientQuantity";
import { NotFoundError } from "../error/NotFoundError";
import { BadRequestError } from "../error/BadRequestError";

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

export async function getOrder(filter: IOrderQuery, userId?: UUID) {
  filter.userId = userId;

  const data = await OrderModel.get(filter);

  if (filter.id && !data[0]) {
    throw new NotFoundError("Order does not exist");
  }

  return data;
}

export async function updateStatus(
  id: UUID,
  data: Pick<IOrder, "status" | "updatedBy">,
  userId: UUID
) {
  data.updatedBy = userId;

  const existingOrder = (await OrderModel.get({ id }))[0];
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

export async function deleteOrder(id: UUID) {
  const existingOrder = (await OrderModel.get({ id }))[0];

  if (!existingOrder) {
    throw new NotFoundError("Order does not exist");
  }

  return await OrderModel.delete(id);
}
