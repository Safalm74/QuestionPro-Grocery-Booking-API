import express from "express";
import * as userController from "../controllers/user";
import * as userSchema from "../schema/user";
import {
  validateReqBody,
  validateReqParams,
  validateReqQuery,
} from "../middlewares/validation";

const router = express.Router();

//route to create user
router.post(
  "/",
  validateReqBody(userSchema.createUserBodySchema),
  userController.createUser
);

//route to get all users
router.get(
  "/",
  validateReqQuery(userSchema.getUserQuerySchema),
  userController.getUsers
);

//route to update user
router.put(
  "/:id",
  validateReqParams(userSchema.userParamSchema),
  validateReqBody(userSchema.updateUserBodySchema),
  userController.updateUser
);

//route to delete user
router.delete(
  "/:id",
  validateReqParams(userSchema.userParamSchema),
  userController.deleteUser
);

export default router;
