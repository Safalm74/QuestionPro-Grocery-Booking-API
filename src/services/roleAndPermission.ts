import { RolesAndPermissionsModel } from "../models/roleAndPermission";

/**
 * Service function to get permissions for a specific role.
 *
 * @param role - The role for which to fetch permissions (optional).
 * @returns The permissions associated with the specified role.
 * @throws NotFoundError if no permissions are found for the given role.
 */
export function getPermisionsForRole(role?: string) {
  return RolesAndPermissionsModel.get(role);
}
