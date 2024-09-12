import express from "express";
import * as orderController from "../controllers/order";
import { authenticate, authorize } from "../middlewares/auth";
import { validateReqBody, validateReqParams } from "../middlewares/validation";
import {
  getOrderQuerySchema,
  orderBodySchema,
  orderStatusBodySchema,
} from "../schema/order";

const router = express.Router();

router.post(
  "/",
  validateReqBody(orderBodySchema),
  authenticate,
  authorize("order: create"),
  orderController.createOrder
);

router.get(
  "/",
  validateReqParams(getOrderQuerySchema),
  authenticate,
  authorize("order: read"),
  orderController.getOrder
);

router.patch(
  "/:id",
  validateReqParams(getOrderQuerySchema),
  validateReqBody(orderStatusBodySchema),
  authenticate,
  authorize("order: update"),
  orderController.updateOrder
);

router.delete(
  "/:id",
  validateReqParams(getOrderQuerySchema),
  authenticate,
  authorize("order: delete"),
  orderController.deleteOrder
);

export default router;
