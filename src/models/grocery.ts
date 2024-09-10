import { IGrocery } from "../interfaces/grocery";
import BaseModel from "./base";

export class GroceryModel extends BaseModel {
  static tableName = "groceries";

  static async create(data: IGrocery) {
    const groceryToCreate = {
      name: data.name,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
    };

    const query = this.queryBuilder()
      .insert(groceryToCreate)
      .into(this.tableName)
      .returning("*");

    return await query;
  }

  static async get() {}

  static async update() {}

  static async delete() {}
}
