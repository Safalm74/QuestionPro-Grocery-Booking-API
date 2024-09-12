import express from "express";
import userRouter from "./user";
import authRouter from "./auth";
import adminRouter from "./admin";
import groceryRouter from "./grocery";
import orderRouter from "./order";
import orderItemRouter from "./orderItem";
import { authenticate, checkRole } from "../middlewares/auth";

const router = express();

router.use("/user", userRouter);

router.use("/auth", authRouter);

router.use("/admin", authenticate, checkRole("admin"), adminRouter);

router.use("/grocery", groceryRouter);

router.use("/order", orderRouter);

router.use("/order-items", orderItemRouter);

export default router;
