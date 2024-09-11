import express from "express";
import userRouter from "./user";
import authRouter from "./auth";
import adminRouter from "./admin";
import groceryRouter from "./grocery";
import orderRouter from "./order";

const router = express();

router.use("/user", userRouter);

router.use("/auth", authRouter);

router.use("/admin", adminRouter);

router.use("/grocery", groceryRouter);

router.use("/order", orderRouter);

export default router;
