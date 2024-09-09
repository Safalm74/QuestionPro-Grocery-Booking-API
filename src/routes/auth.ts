import express from "express";
import * as AuthController from "../controllers/auth";
import { validateReqBody } from "../middlewares/validation";
import { authLogInBodySchema } from "../schema/auth";

const router = express();

//Route to handle login
router.post(
  "/login",
  validateReqBody(authLogInBodySchema),
  AuthController.login
);

// //Route to handle new access token from refresh token
router.post("/refreshAccessToken", AuthController.refreshAccessToken);

export default router;
