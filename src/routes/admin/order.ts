import express from "express";
import * as orderController from "../../controllers/order";
import { authenticate, authorize } from "../../middlewares/auth";
import {
  validateReqBody,
  validateReqParams,
  validateReqQuery,
} from "../../middlewares/validation";
import {
  getOrderQuerySchema,
  orderParamSchema,
  orderStatusBodySchema,
} from "../../schema/order";

const router = express.Router();

router.get(
  "/",
  validateReqQuery(getOrderQuerySchema),
  authenticate,
  authorize("order: read"),
  orderController.getAdminOrder
);

router.patch(
  "/status/:id",
  validateReqParams(orderParamSchema),
  validateReqBody(orderStatusBodySchema),
  authenticate,
  authorize("order: update"),
  orderController.updateOrderQuantityByAdmin
);

router.delete(
  "/:id",
  validateReqParams(orderParamSchema),
  authenticate,
  authorize("order: delete"),
  orderController.deleteOrder
);

export default router;
