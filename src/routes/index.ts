import express from "express";
import userRouter from "./user";
import authRouter from "./auth";
import adminRouter from "./admin";
import groceryRouter from "./grocery";
import orderRouter from "./order";
import orderItemRouter from "./orderItem";
import { authenticate, checkRole } from "../middlewares/auth";

const router = express();

// User-related routes
router.use("/user", userRouter);

// Authentication routes
router.use("/auth", authRouter);

// Admin routes with authentication and role check
router.use("/admin", authenticate, checkRole("admin"), adminRouter);

// Grocery-related routes
router.use("/grocery", groceryRouter);

// Order-related routes
router.use("/order", orderRouter);

// Order item-related routes
router.use("/order-items", orderItemRouter);

export default router;
