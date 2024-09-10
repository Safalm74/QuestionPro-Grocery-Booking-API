import { IGrocery } from "../interfaces/grocery";
import { GroceryModel } from "../models/grocery";

export function createGrocery(data: IGrocery) {
  return GroceryModel.create(data);
}

export function getGroceries() {
  return GroceryModel.get();
}

export function updateGrocery() {}

export function deleteGrocery() {}
