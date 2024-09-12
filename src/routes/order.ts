import express from "express";
import * as orderController from "../controllers/order";
import { authenticate } from "../middlewares/auth";
import { validateReqBody, validateReqParams } from "../middlewares/validation";
import {
  getOrderQuerySchema,
  orderBodySchema,
  orderStatusBodySchema,
} from "../schema/order";

const router = express.Router();

router.post(
  "/",
  authenticate,
  validateReqBody(orderBodySchema),
  orderController.createOrder
);

router.get(
  "/",
  authenticate,
  validateReqParams(getOrderQuerySchema),
  orderController.getOrder
);

router.patch(
  "/:id",
  authenticate,
  validateReqParams(getOrderQuerySchema),
  validateReqBody(orderStatusBodySchema),
  orderController.updateOrder
);

router.delete(
  "/:id",
  validateReqParams(getOrderQuerySchema),
  authenticate,
  orderController.deleteOrder
);

export default router;
