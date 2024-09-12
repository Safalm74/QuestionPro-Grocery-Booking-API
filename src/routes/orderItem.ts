import express from "express";
import * as orderItemController from "../controllers/orderItem";
import { validateReqParams } from "../middlewares/validation";
import { orderParamSchema } from "../schema/order";

const router = express.Router();

router.get(
  "/:id",
  validateReqParams(orderParamSchema),
  orderItemController.getOrderItem
);

export default router;
