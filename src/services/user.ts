import { IGetUserQuery, IUser } from "../interfaces/user";
import UserModel from "../models/user";

import bcrypt from "bcrypt";
import loggerWithNameSpace from "../utils/logger";
import { UUID } from "crypto";
import config from "../config";

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
  logger.info("Getting all users");

  return UserModel.get(query);
}

export async function updateUser(id: UUID, user: IUser) {
  logger.info("Updating a user");

  const password = await bcrypt.hash(user.password, config.bcryptSalt);
  user.password = password;

  return await UserModel.update(id, user);
}

export async function deleteUser(id: UUID) {
  logger.info("Deleting a user");

  return UserModel.delete(id);
}
