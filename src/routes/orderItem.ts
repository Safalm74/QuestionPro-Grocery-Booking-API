import express from "express";
import * as orderItemController from "../controllers/orderItem";
import { validateReqParams } from "../middlewares/validation";
import { orderParamSchema } from "../schema/order";
import { authenticate, authorize } from "../middlewares/auth";

const router = express.Router();

router.get(
  "/:id",
  validateReqParams(orderParamSchema),
  authenticate,
  authorize("orderItem: read"),
  orderItemController.getOrderItem
);

export default router;
