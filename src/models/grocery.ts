import { UUID } from "crypto";
import { IGrocery, IGroceryQuery } from "../interfaces/grocery";
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

  static async get(filter: IGroceryQuery) {
    const { id: id, page, size } = filter;
    const query = this.queryBuilder().select("*").table(this.tableName);

    if (page && size) {
      query.limit(size!).offset((page! - 1) * size!);
    }

    if (id) {
      query.where({ id: id });
    }

    return await query;
  }

  static async update(id: UUID, data: IGrocery) {
    const groceryToUpdate = {
      name: data.name,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
    };
    const query = this.queryBuilder()
      .update(groceryToUpdate)
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
