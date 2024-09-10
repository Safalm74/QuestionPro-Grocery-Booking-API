import express from "express";
import * as GroceryController from "../../controllers/grocery";

const router = express();

router.post("/", GroceryController.createGrocery);

router.get("/", GroceryController.getGroceriesForAdmin);

router.put("/:id", GroceryController.updateGrocery);

router.delete("/:id", GroceryController.deleteGrocery);

export default router;
