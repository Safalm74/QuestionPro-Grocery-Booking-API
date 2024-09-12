import { IGetUserQuery, IUser } from "../interfaces/user";
import UserModel from "../models/user";

import bcrypt from "bcrypt";
import loggerWithNameSpace from "../utils/logger";
import { UUID } from "crypto";
import config from "../config";
import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NotFoundError";

const logger = loggerWithNameSpace("service: user");

/**
 * Service function to create a new user.
 *
 * @param user - The user data to create.
 * @returns The created user.
 * @throws BadRequestError if the email is already used.
 */
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

/**
 * Service function to retrieve users based on query.
 *
 * @param query - The query parameters to filter users.
 * @returns The list of users matching the query.
 */
export async function getUsers(query: IGetUserQuery) {
  logger.info("Getting all users");

  return UserModel.get(query);
}

/**
 * Service function to retrieve a user by email.
 *
 * @param email - The email of the user to retrieve.
 * @returns The user matching the email.
 */
export function getUserByEmail(email: string) {
  logger.info("Getting a user by email");

  return UserModel.getByEmail(email);
}

/**
 * Service function to update a user.
 *
 * @param id - The ID of the user to update.
 * @param user - The updated user data.
 * @returns The updated user.
 * @throws NotFoundError if the user does not exist.
 */
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

/**
 * Service function to delete a user.
 *
 * @param id - The ID of the user to delete.
 * @returns The result of the deletion operation.
 * @throws NotFoundError if the user does not exist.
 */
export async function deleteUser(id: UUID) {
  logger.info("Deleting a user");

  const existingUser = (await getUsers({ id: id })).data[0];

  if (!existingUser) {
    throw new NotFoundError("user not found");
  }

  return UserModel.delete(id);
}
