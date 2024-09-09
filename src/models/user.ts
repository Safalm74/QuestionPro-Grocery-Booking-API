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
      .returning("*");

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

  static async update(id: number, data: any) {
    const userToUpdate = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: data.address,
      role_id: data.roleId,
    };

    const query = this.queryBuilder()
      .update(userToUpdate)
      .from(this.tableName)
      .where("id", id)
      .returning("*");

    return await query;
  }

  static async delete(id: number) {
    const query = this.queryBuilder()
      .delete()
      .from(this.tableName)
      .where("id", id)
      .returning("*");
    return await query;
  }
}
