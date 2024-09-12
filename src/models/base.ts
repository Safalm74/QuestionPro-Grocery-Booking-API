import { Knex } from "knex";
import db from "../utils/db";

/**
 * BaseModel class provides a base structure for models to interact with the database.
 * It initializes a shared database connection and provides a query builder interface.
 */
export default class BaseModel {
  static connection: Knex = db;

  static queryBuilder() {
    return this.connection;
  }
}
