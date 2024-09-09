import { IUser } from "../interfaces/user";
import UserModel from "../models/user";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("services:user");

export async function createUser(userToCreate: IUser) {
  logger.info("Creating a new user");

  UserModel.create(userToCreate);
}

export function getUsers() {
  logger.info("Fetching all users");
}

export function updateUser() {
  logger.info("Updating a user");
}

export function deleteUser() {
  logger.info("Deleting a user");
}
