import { UUID } from "crypto";
import { IOrder, IOrderQuery } from "../interfaces/order";
import BaseModel from "./base";

/**
 * OrderModel class provides methods for interacting with the orders table in the database.
 * It extends the BaseModel class to inherit database connection methods.
 */
export class OrderModel extends BaseModel {
  //table name
  static tableName = "orders";

  /**
   * Creates a new order entry in the database.
   *
   * @param {IOrder} data - The order data to create.
   * @returns {Promise<any>} The created order entry.
   */
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

  /**
   * Retrieves orders from the database with optional filtering and pagination.
   *
   * @param {IOrderQuery} filter - The filter criteria for querying orders.
   * @returns {Promise<{ data: any[]; total: number }>} An object containing the queried data and total count.
   */
  static async get(filter: IOrderQuery) {
    const { id: id, page, size } = filter;
    const query = this.queryBuilder().select("*").table(this.tableName);

    if (page && size) {
      query.limit(size).offset((page - 1) * size);
    }

    // Filter by ID if provided
    if (id) {
      query.where({ id });
    }

    // Order by created time in descending order to get the latest entries first
    query.orderBy("created_at", "desc");

    const data = {
      data: await query,
      total: await this.queryBuilder()
        .count()
        .from(this.tableName)
        .where({ deleted_at: null }),
    };

    return data;
  }

  /**
   * Updates an order entry in the database.
   *
   * @param {UUID} id - The ID of the order to update.
   * @param {Pick<IOrder, "status" | "updatedBy">} data - The new data for the order.
   * @returns {Promise<any>} The updated order entry.
   */
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

  /**
   * Soft deletes an order by updating its deleted_at timestamp.
   *
   * @param {UUID} id - The ID of the order to delete.
   * @returns {Promise<any>} The updated order entry with the deleted timestamp.
   */
  static async delete(id: UUID) {
    const query = this.queryBuilder()
      .update({ deleted_at: new Date() })
      .table(this.tableName)
      .where({ id })
      .returning("*");
    return await query;
  }
}
