import { UUID } from "crypto";
import { IOrder, IOrderQuery } from "../interfaces/order";
import { OrderModel } from "../models/order";
import * as orderItemService from "./orderItem";
import { getGroceries, updateQuantity } from "./grocery";
import { InsufficientQuantityError } from "../error/insufficientQuantity";

export async function createOrder(data: IOrder, userId: UUID) {
  data.createdBy = userId;
  data.status = "pending";

  const order = (await OrderModel.create(data))[0] as IOrder;

  const orderItems = await Promise.all(
    data.items.map(async (item) => {
      const grocery = await getGroceries({ id: item.groceryId });
      if (grocery[0].quantity < item.quantity) {
        throw new InsufficientQuantityError(
          `Insufficient quantity for grocery item ${item.groceryId}`
        );
      }

      const newQuantity = grocery[0].quantity - item.quantity;
      await updateQuantity(item.groceryId, newQuantity);

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
  return await OrderModel.get(filter);
}

export async function updateStatus(
  id: UUID,
  data: Pick<IOrder, "status" | "updatedBy">,
  userId: UUID
) {
  data.updatedBy = userId;
  return await OrderModel.update(id, data);
}
