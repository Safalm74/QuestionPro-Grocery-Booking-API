import express from "express";
import * as orderController from "../../controllers/order";
import { authenticate } from "../../middlewares/auth";

const router = express.Router();

router.get("/", authenticate, orderController.getAdminOrder);

router.put("/:id", authenticate, orderController.updateOrder);

router.delete("/:id", authenticate, orderController.deleteOrder);

export default router;
