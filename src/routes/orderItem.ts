import express from "express";
import * as orderItemController from "../controllers/orderItem";

const router = express.Router();

router.get("/:id", orderItemController.getOrderItem);

export default router;
