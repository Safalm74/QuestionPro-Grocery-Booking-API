import { IGetUserQuery, IUser } from "../interfaces/user";
import UserModel from "../models/user";

import bcrypt from "bcrypt";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("service: user");

export async function createUser(user: IUser) {
  logger.info("Creating a new user");

  let newUser: IUser;

  const hashSaltValue = 10;

  const password = await bcrypt.hash(user.password, hashSaltValue);

  newUser = {
    ...user,
    password,
  };

  return await UserModel.create(newUser);
}

export async function getUsers(query: IGetUserQuery) {
  return UserModel.get(query);
}

export function updateUser() {
  logger.info("Updating a user");
}

export function deleteUser() {
  logger.info("Deleting a user");
}
