import { UUID } from "crypto";
import { IOrderItems } from "../interfaces/orderItem";
import BaseModel from "./base";

export class OrderItemsModel extends BaseModel {
  static tableName = "order_items";

  static async create(data: IOrderItems[]) {
    const orderItemToCreate = data.map((item) => {
      return {
        orderId: item.orderId,
        groceryId: item.groceryId,
        quantity: item.quantity,
        pricePerUnit: item.pricePerUnit,
      };
    });

    const query = this.queryBuilder()
      .insert(orderItemToCreate)
      .into(this.tableName)
      .returning("*");

    const result = await query;
  }

  static async get(id?: UUID, orderId?: UUID) {
    const query = this.queryBuilder().select("*").table(this.tableName);

    if (id) {
      query.where({ id });
    }

    if (orderId) {
      query.where({ orderId });
    }

    return await query;
  }

  static async update(id: UUID, data: IOrderItems) {
    const orderItemToUpdate = {
      orderId: data.orderId,
      groceryId: data.groceryId,
      quantity: data.quantity,
      pricePerUnit: data.pricePerUnit,
      UpdatedAt: new Date(),
    };

    const query = this.queryBuilder()
      .update(orderItemToUpdate)
      .table(this.tableName)
      .where({ id })
      .returning("*");

    return await query;
  }

  static async delete(id: UUID) {
    const query = this.queryBuilder()
      .update({ deleted_at: new Date() })
      .table(this.tableName)
      .where({ id })
      .returning("*");

    return await query;
  }
}
