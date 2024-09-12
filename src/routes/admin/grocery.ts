import express from "express";
import * as GroceryController from "../../controllers/grocery";
import {
  validateReqBody,
  validateReqParams,
  validateReqQuery,
} from "../../middlewares/validation";
import {
  getGroceryQuerySchema,
  groceryBodySchema,
  groceryParamSchema,
  groceryQuantityBodySchema,
} from "../../schema/grocery";
import { authenticate, authorize } from "../../middlewares/auth";

const router = express();

router.post(
  "/",
  validateReqBody(groceryBodySchema),
  authenticate,
  authorize("grocery: create"),
  GroceryController.createGrocery
);

router.get(
  "/",
  validateReqQuery(getGroceryQuerySchema),
  authenticate,
  authorize("grocery: read"),
  GroceryController.getGroceriesForAdmin
);

router.put(
  "/:id",
  validateReqParams(groceryParamSchema),
  validateReqBody(groceryBodySchema),
  authenticate,
  authorize("grocery: update"),
  GroceryController.updateGrocery
);

router.patch(
  "/quantity/:id",
  validateReqParams(groceryParamSchema),
  validateReqBody(groceryQuantityBodySchema),
  authenticate,
  authorize("grocery: update"),
  GroceryController.updateQuantity
);

router.delete(
  "/:id",
  validateReqParams(groceryParamSchema),
  authenticate,
  authorize("grocery: delete"),
  GroceryController.deleteGrocery
);

export default router;
