import { UUID } from "crypto";
import { IGrocery, IGroceryQuery } from "../interfaces/grocery";
import BaseModel from "./base";

/**
 * GroceryModel class provides methods for interacting with the groceries table in the database.
 * It extends the BaseModel class to inherit database connection methods.
 */
export class GroceryModel extends BaseModel {
  // table name
  static tableName = "groceries";

  /**
   * Creates a new grocery entry in the database.
   *
   * @param {IGrocery} data - The grocery data to create.
   * @param {UUID} userId - The ID of the user creating the grocery.
   * @returns {Promise<any>} The created grocery entry.
   */
  static async create(data: IGrocery, userId: UUID) {
    const groceryToCreate = {
      imageUrl: data.imageUrl,
      name: data.name,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      createdBy: userId,
    };

    const query = this.queryBuilder()
      .insert(groceryToCreate)
      .into(this.tableName)
      .returning("*");

    return await query;
  }

  /**
   * Retrieves groceries from the database with optional filtering and pagination.
   *
   * @param {IGroceryQuery} filter - The filter criteria for querying groceries.
   * @returns {Promise<{ data: any[]; total: number }>} An object containing the queried data and total count.
   */
  static async get(filter: IGroceryQuery) {
    const { id: id, page, size } = filter;
    const query = this.queryBuilder().select("*").table(this.tableName);

    // Apply pagination if page and size are provided
    if (page && size) {
      query.limit(size!).offset((page! - 1) * size!);
    }

    // Filter by ID if provided
    if (id) {
      query.where({ id: id });
    }

    const data = {
      data: await query,
      total: await this.queryBuilder().count().from(this.tableName),
    };

    return data;
  }

  /**
   * Updates the quantity of a grocery item in the database.
   *
   * @param {UUID} id - The ID of the grocery item to update.
   * @param {number} quantity - The new quantity for the grocery item.
   * @param {UUID} userId - The ID of the user making the update.
   * @returns {Promise<any>} The updated grocery entry.
   */
  static async updateQuantity(id: UUID, quantity: number, userId: UUID) {
    const query = this.queryBuilder()
      .update({ quantity: quantity, updated_at: new Date() })
      .table(this.tableName)
      .where({ id })
      .returning("*");

    return await query;
  }

  /**
   * Updates a grocery entry in the database.
   *
   * @param {UUID} id - The ID of the grocery item to update.
   * @param {IGrocery} data - The new data for the grocery item.
   * @param {UUID} userId - The ID of the user making the update.
   * @returns {Promise<any>} The updated grocery entry.
   */
  static async update(id: UUID, data: IGrocery, userId: UUID) {
    const groceryToUpdate = {
      imageUrl: data.imageUrl,
      name: data.name,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      updated_at: new Date(),
    };
    const query = this.queryBuilder()
      .update(groceryToUpdate)
      .table(this.tableName)
      .where({ id })
      .returning("*");

    return await query;
  }

  /**
   * Soft deletes a grocery item by updating its deleted_at timestamp.
   *
   * @param {UUID} id - The ID of the grocery item to delete.
   * @returns {Promise<any>} The updated grocery entry with the deleted timestamp.
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
