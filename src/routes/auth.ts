import express from "express";
import * as AuthController from "../controllers/auth";
import { Request } from "../interfaces/auth";
import { Response } from "express";
const router = express();

//Route to handle login
router.post("/login", AuthController.login);

// //Route to handle new access token from refresh token
// router.get("/refreshAccessToken", AuthController.refreshAccessToken);

export default router;
