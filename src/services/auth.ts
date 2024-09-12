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
 * Service function to log in a user.
 *
 * @param body - Contains the user's email and password.
 * @returns An object containing user details, access token, and refresh token.
 * @throws UnauthicatedError if the login fails.
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

/**
 * Service function to generate a new access token from a valid refresh token.
 *
 * @param RefreshToken - The refresh token to verify.
 * @returns An object containing the new access token.
 * @throws UnauthicatedError if the refresh token is invalid.
 */
export async function refreshAccessToken(RefreshToken: string) {
  const token = RefreshToken.split(" ");

  /*
        the incoming token must have format of:
          "Bearer <token>"
        to ensure this, 
        refresh token is splitted by (" ")
        then checked if token[0]==="Bearer"
        and splitted token is of length 2
      */
  if (token?.length !== 2 || token[0] !== "Bearer") {
    logger.error(`token format mismatch: ${token}`);

    throw new UnauthicatedError("Un-Authenticated");
  }

  logger.info(`Verifying refresh token`);
  //JWT verify verifies the token and returns decoded token  if verified
  const existingUserPayload = verify(
    token[1],
    config.jwt.jwt_secret!
  ) as ITokenPlayLoad;

  //creating payload to generate new access token
  logger.info("creating payload");

  //creating payload to generate tokens
  const payload: ITokenPlayLoad = {
    id: existingUserPayload.id,
    name: existingUserPayload.name,
    email: existingUserPayload.email,
    role: existingUserPayload.role,
  };

  //generating access token using config jwt secret
  logger.info("creating access token");

  const accessToken = await sign(payload, config.jwt.jwt_secret!, {
    expiresIn: config.jwt.accessTokenExpiry,
  });

  //returning access token
  return { accessToken };
}
