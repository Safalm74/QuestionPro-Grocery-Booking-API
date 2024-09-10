import express from "express";
import groceryRouter from "./grocery";

const router = express();

router.use("/grocery", groceryRouter);

export default router;
