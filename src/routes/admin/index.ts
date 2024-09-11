import express from "express";
import groceryRouter from "./grocery";
import orderRouter from "./order";

const router = express();

router.use("/grocery", groceryRouter);

router.use("/order", orderRouter);

export default router;
