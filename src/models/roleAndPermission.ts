import BaseModel from "./base";

export class RolesAndPermissionsModel extends BaseModel {
  static tableName = "roles_and_permissions";

  static async get(role?: string) {
    const query = this.queryBuilder()
      .select("permission")
      .table(this.tableName);

    if (role) {
      query.where({ role });
    }

    return await query;
  }
}
