import { Request, Response, NextFunction } from "express";
import HttpStatusCode from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";
import * as UserService from "../services/user";

const logger = loggerWithNameSpace("User Controller");

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("Request: Add user");
  try {
    const { body } = req; //getting new user data from request body

    const req_user = await UserService.createUser(body);

    res.status(HttpStatusCode.CREATED).json(req_user);
  } catch (error) {
    next(error);
  }
}

export function getUsers(req: Request, res: Response, next: NextFunction) {}

export function updateUser(req: Request, res: Response) {
  res.send("Hello World! from update user");
}

export function deleteUser(req: Request, res: Response) {
  res.send("Hello World! from delete user");
}
