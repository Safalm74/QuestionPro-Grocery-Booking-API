import express from "express";
import * as orderController from "../../controllers/order";
import { authenticate, authorize } from "../../middlewares/auth";

const router = express.Router();

router.get(
  "/",
  authenticate,
  authorize("order: read"),
  orderController.getAdminOrder
);

router.put(
  "/:id",
  authenticate,
  authorize("order: update"),
  orderController.updateOrder
);

router.delete(
  "/:id",
  authenticate,
  authorize("order: delete"),
  orderController.deleteOrder
);

export default router;
