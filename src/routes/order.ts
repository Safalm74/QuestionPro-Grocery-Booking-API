import express from "express";
import * as orderController from "../controllers/order";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

router.post("/", authenticate, orderController.createOrder);

router.get("/", orderController.getOrder);

router.put("/:id", orderController.updateOrder);

router.delete("/:id", orderController.deleteOrder);

export default router;
