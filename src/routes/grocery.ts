import express from "express";
import * as GroceryController from "../controllers/grocery";
import { validateReqQuery } from "../middlewares/validation";
import { getGroceryQuerySchema } from "../schema/grocery";

const router = express();

// Get groceries
router.get(
  "/",
  validateReqQuery(getGroceryQuerySchema),
  GroceryController.getGrocery
);

export default router;
