import { UUID } from "crypto";
import { IOrder, IOrderQuery } from "../interfaces/order";
import BaseModel from "./base";

export class OrderModel extends BaseModel {
  static tableName = "orders";

  static async create(data: IOrder) {
    const orderToCreate = {
      status: data.status,
      createdBy: data.createdBy,
    };
    const query = this.queryBuilder()
      .insert(orderToCreate)
      .into(this.tableName)
      .returning("*");

    return await query;
  }

  static async get(filter: IOrderQuery) {
    const { id: id, page, size } = filter;
    const query = this.queryBuilder().select("*").table(this.tableName);

    if (page && size) {
      query.limit(size).offset((page - 1) * size);
    }

    if (id) {
      query.where({ id });
    }

    return await query;
  }

  static async update(id: UUID, data: Pick<IOrder, "status" | "updatedBy">) {
    const orderToUpdate = {
      status: data.status,
      updatedBy: data.updatedBy,
      updatedAt: new Date(),
    };
    const query = this.queryBuilder()
      .update(orderToUpdate)
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
