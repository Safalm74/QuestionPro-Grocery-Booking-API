import express from "express";
import * as userController from "../controllers/user";

const router = express.Router();

//route to create user
router.post("/", userController.createUser);

//route to get all users
router.get("/", userController.getUsers);

//route to update user
router.put("/:id", userController.updateUser);

//route to delete user
router.delete("/:id", userController.deleteUser);

export default router;
