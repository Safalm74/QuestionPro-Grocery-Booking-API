import { Request, Response, NextFunction } from "express";
import HttpStatusCode from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";
import * as UserService from "../services/user";
import { UUID } from "crypto";

const logger = loggerWithNameSpace("Controller: user");

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

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("Request: read users");

  try {
    const { query } = req;

    const data = await UserService.getUsers(query);

    res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("Request: update user");

  try {
    const { body } = req;
    const { id } = req.params as { id: UUID };

    res.status(HttpStatusCode.OK).json(await UserService.updateUser(id, body));
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params as { id: UUID };

    res
      .status(HttpStatusCode.NO_CONTENT)
      .json(await UserService.deleteUser(id));
  } catch (error) {
    next(error);
  }
}
