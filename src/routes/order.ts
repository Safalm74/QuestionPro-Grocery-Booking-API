import express from "express";
import * as orderController from "../controllers/order";
import { authenticate, authorize } from "../middlewares/auth";
import {
  validateReqBody,
  validateReqParams,
  validateReqQuery,
} from "../middlewares/validation";
import {
  getOrderQuerySchema,
  orderBodySchema,
  orderStatusBodySchema,
} from "../schema/order";

const router = express.Router();

//Route to create order
router.post(
  "/",
  validateReqBody(orderBodySchema),
  authenticate,
  authorize("order: create"),
  orderController.createOrder
);

//Route to get order
router.get(
  "/",
  validateReqQuery(getOrderQuerySchema),
  authenticate,
  authorize("order: read"),
  orderController.getOrder
);

//Route to update order status
router.patch(
  "/status/:id",
  validateReqParams(getOrderQuerySchema),
  validateReqBody(orderStatusBodySchema),
  authenticate,
  authorize("order: update"),
  orderController.updateOrder
);

export default router;
