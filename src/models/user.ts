import { UUID } from "crypto";
import { IGetUserQuery, IUser } from "../interfaces/user";
import BaseModel from "./base";

/**
 * UserModel class provides methods for interacting with the users table in the database.
 * It extends the BaseModel class to inherit database connection methods.
 */
export default class UserModel extends BaseModel {
  //table name
  static tableName = "users";

  /**
   * Creates a new user in the database.
   *
   * @param {IUser} data - The user data to be created.
   * @returns {Promise<any>} The created user record.
   */
  static async create(data: IUser) {
    const userToCreate = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: data.address,
      role: data.role,
    };

    const query = this.queryBuilder()
      .insert(userToCreate)
      .into(this.tableName)
      .returning([
        "id",
        "email",
        "name",
        "role",
        "address",
        "phone",
        "created_at",
        "deleted_at",
        "updated_at",
      ]);

    return await query;
  }

  /**
   * Retrieves users from the database based on the provided filters.
   *
   * @param {IGetUserQuery} filter - The filters to apply when retrieving users.
   * @returns {Promise<{ data: any[]; total: number }>} The retrieved users and total count.
   */
  static async get(filter: IGetUserQuery) {
    const { id: id, page, size } = filter;
    const query = this.queryBuilder()
      .select(
        "id",
        "email",
        "name",
        "role",
        "address",
        "phone",
        "created_at",
        "deleted_at",
        "updated_at"
      )
      .table(this.tableName);

    // Apply pagination if page and size are provided
    if (page && size) {
      query.limit(size!).offset((page! - 1) * size!);
    }

    // Filter by ID if provided
    if (id) {
      query.where({ id: id });
    }

    // Order by created time in descending order to get the latest entries first
    query.orderBy("created_time", "desc");

    const data = {
      data: await query,
      total: await this.queryBuilder().count().from(this.tableName),
    };

    return data;
  }

  /**
   * Retrieves a user by their email address.
   *
   * @param {string} email - The email address of the user.
   * @returns {Promise<any>} The user record with the specified email.
   */
  static getByEmail(email: string) {
    const query = this.queryBuilder()
      .select("email", "password", "role", "id", "name")
      .table(this.tableName)
      .where({ email: email });

    return query;
  }

  /**
   * Updates an existing user's information.
   *
   * @param {UUID} id - The ID of the user to update.
   * @param {IUser} data - The new data for the user.
   * @returns {Promise<any>} The updated user record.
   */
  static async update(id: UUID, data: IUser) {
    const userToUpdate = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: data.address,
      updated_at: new Date(),
    };

    const query = this.queryBuilder()
      .update(userToUpdate)
      .from(this.tableName)
      .where("id", id)
      .returning([
        "id",
        "email",
        "name",
        "role",
        "address",
        "phone",
        "created_at",
        "deleted_at",
        "updated_at",
      ]);

    return await query;
  }

  /**
   * Marks a user as deleted by setting the deleted_at timestamp.
   *
   * @param {UUID} id - The ID of the user to delete.
   * @returns {Promise<any>} The updated user record.
   */
  static async delete(id: UUID) {
    const query = this.queryBuilder()
      .update({ deleted_at: new Date() })
      .from(this.tableName)
      .where("id", id)
      .returning([
        "id",
        "email",
        "name",
        "role",
        "address",
        "phone",
        "created_at",
        "deleted_at",
        "updated_at",
      ]);

    return await query;
  }
}
