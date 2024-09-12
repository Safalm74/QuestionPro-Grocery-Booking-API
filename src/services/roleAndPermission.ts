import { RolesAndPermissionsModel } from "../models/roleAndPermission";

export function getPermisionsForRole(role?: string) {
  return RolesAndPermissionsModel.get(role);
}
