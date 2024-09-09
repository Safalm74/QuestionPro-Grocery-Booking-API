import { UUID } from "crypto";
import { IGetUserQuery, IUser } from "../interfaces/user";
import BaseModel from "./base";

export default class UserModel extends BaseModel {
  static tableName = "users";

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

    if (page && size) {
      query.limit(size!).offset((page! - 1) * size!);
    }

    if (id) {
      query.where({ id: id });
    }

    return query;
  }

  static getByEmail(email: string) {
    const query = this.queryBuilder()
      .select("email", "password")
      .table(this.tableName)
      .where({ email: email });

    return query;
  }

  static async update(id: UUID, data: IUser) {
    const userToUpdate = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: data.address,
      role: data.role,
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
