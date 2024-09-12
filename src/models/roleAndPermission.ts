import BaseModel from "./base";

/**
 * RolesAndPermissionsModel class provides methods for interacting with the roles_and_permissions table in the database.
 * It extends the BaseModel class to inherit database connection methods.
 */
export class RolesAndPermissionsModel extends BaseModel {
  //table name
  static tableName = "roles_and_permissions";

  /**
   * Retrieves permissions associated with a specific role from the database.
   *
   * @param {string} [role] - The role to filter permissions by (optional).
   * @returns {Promise<any[]>} The retrieved permissions for the specified role.
   */
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
