import { UUID } from "crypto";
import { IOrderItems } from "../interfaces/orderItem";
import BaseModel from "./base";

/**
 * OrderItemsModel class provides methods for interacting with the order_items table in the database.
 * It extends the BaseModel class to inherit database connection methods.
 */
export class OrderItemsModel extends BaseModel {
  //table name
  static tableName = "order_items";

  /**
   * Creates new order item entries in the database.
   *
   * @param {IOrderItems[]} data - An array of order item data to create.
   * @returns {Promise<any>} The created order item entries.
   */
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

  /**
   * Retrieves order items from the database based on optional filters.
   *
   * @param {UUID} [orderId] - The ID of the order to filter by (optional).
   * @param {UUID} [id] - The ID of the order item to filter by (optional).
   * @returns {Promise<any[]>} The retrieved order items.
   */
  static async get(orderId?: UUID, id?: UUID) {
    const query = this.queryBuilder().select("*").table(this.tableName);

    // Filter by ID if provided
    if (id) {
      query.where({ id });
    }

    // Filter by order ID if provided
    if (orderId) {
      query.where({ orderId });
    }

    return await query;
  }

  /**
   * Updates an existing order item in the database.
   *
   * @param {UUID} id - The ID of the order item to update.
   * @param {IOrderItems} data - The new data for the order item.
   * @returns {Promise<any>} The updated order item entry.
   */
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

  /**
   * Soft deletes an order item by updating its deleted_at timestamp.
   *
   * @param {UUID} id - The ID of the order item to delete.
   * @returns {Promise<any>} The updated order item entry with the deleted timestamp.
   */
  static async delete(id: UUID) {
    const query = this.queryBuilder()
      .update({ deleted_at: new Date() })
      .table(this.tableName)
      .where({ id })
      .returning("*");

    // Order by created time in descending order to get the latest entries first
    query.orderBy("created_time", "desc");

    return await query;
  }
}
