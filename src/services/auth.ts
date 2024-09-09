import config from "../config";
import { UnauthicatedError } from "../error/UnauthenticatedError";
import { IUser } from "../interfaces/user";
import { getUserByEmail } from "./user";
import bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import loggerWithNameSpace from "../utils/logger";
import { ITokenPlayLoad } from "../interfaces/auth";

const logger = loggerWithNameSpace("Auth Service");

/**
 * service function to login:
 * @param body
 * @returns user details, new access and refresh token
 */
export async function login(body: Pick<IUser, "email" | "password">) {
  //to await bcrypt compare
  //getting existing user
  logger.info("Attempting to get user by email");

  const existingUser = (await getUserByEmail(body.email))[0];

  //checking if user exists
  if (!existingUser) {
    logger.error("requested user does not exist");

    throw new UnauthicatedError("Invalid email or password");
  }
  //comparing hashed password with incoming password
  logger.info("Checking password");

  const isValidPassword = await bcrypt.compare(
    body.password,
    existingUser.password
  );

  //checking if password entered is correct
  if (!isValidPassword) {
    logger.error("password does not match");

    throw new UnauthicatedError("Invalid email or password");
  }

  logger.info("creating payload");

  //creating payload to generate tokens
  const payload: ITokenPlayLoad = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
    role: existingUser.role,
  };

  //generating access token using config jwt secret
  logger.info("creating access token");

  const accessToken = await sign(payload, config.jwt.jwt_secret!, {
    expiresIn: config.jwt.accessTokenExpiry,
  });

  //generating refresh token using config jwt secret
  logger.info("creating refresh token");

  const refreshToken = await sign(payload, config.jwt.jwt_secret!, {
    expiresIn: config.jwt.refreshTokenExpiry,
  });

  logger.info("Successfully logged in");

  const responsePayload = {
    accessToken,
    refreshToken,
  };

  //returning access and refresh token
  return responsePayload;
}
