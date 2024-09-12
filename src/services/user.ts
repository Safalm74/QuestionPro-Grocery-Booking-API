import { IGetUserQuery, IUser } from "../interfaces/user";
import UserModel from "../models/user";

import bcrypt from "bcrypt";
import loggerWithNameSpace from "../utils/logger";
import { UUID } from "crypto";
import config from "../config";
import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NotFoundError";

const logger = loggerWithNameSpace("service: user");

export async function createUser(user: IUser) {
  logger.info("Creating a new user");

  let newUser: IUser;

  //to prevent multiple user with same email
  if ((await getUserByEmail(user.email)).length !== 0) {
    logger.error(`Email is already used:${user.email}`);

    throw new BadRequestError("Email is already used");
  }

  const password = await bcrypt.hash(user.password, config.bcryptSalt);

  newUser = {
    ...user,
    password,
  };

  //default role
  newUser.role = "user";

  return await UserModel.create(newUser);
}

export async function getUsers(query: IGetUserQuery) {
  logger.info("Getting all users");

  return UserModel.get(query);
}

export function getUserByEmail(email: string) {
  logger.info("Getting a user by email");

  return UserModel.getByEmail(email);
}

export async function updateUser(id: UUID, user: IUser) {
  logger.info("Updating a user");

  const existingUser = (await getUsers({ id: id })).data[0];

  if (!existingUser) {
    throw new NotFoundError("user not found");
  }

  const password = await bcrypt.hash(user.password, config.bcryptSalt);
  user.password = password;

  return await UserModel.update(id, user);
}

export async function deleteUser(id: UUID) {
  logger.info("Deleting a user");

  const existingUser = (await getUsers({ id: id })).data[0];

  if (!existingUser) {
    throw new NotFoundError("user not found");
  }

  return UserModel.delete(id);
}
