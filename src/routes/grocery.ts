import express from "express";
import * as GroceryController from "../controllers/grocery";

const router = express();

router.get("/", GroceryController.getGrocery);

export default router;
