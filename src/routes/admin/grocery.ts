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
} from "../../schema/grocery";

const router = express();

router.post(
  "/",
  validateReqBody(groceryBodySchema),
  GroceryController.createGrocery
);

router.get(
  "/",
  validateReqQuery(getGroceryQuerySchema),
  GroceryController.getGroceriesForAdmin
);

router.put(
  "/:id",
  validateReqParams(groceryParamSchema),
  validateReqBody(groceryBodySchema),
  GroceryController.updateGrocery
);

router.delete(
  "/:id",
  validateReqParams(groceryParamSchema),
  GroceryController.deleteGrocery
);

export default router;
