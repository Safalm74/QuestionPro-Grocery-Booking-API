import { UUID } from "crypto";
import { IGrocery, IGroceryQuery } from "../interfaces/grocery";
import { GroceryModel } from "../models/grocery";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("service: grocery");

export function createGrocery(data: IGrocery) {
  return GroceryModel.create(data);
}

export async function getGroceriesForAdmin(filter: IGroceryQuery) {
  logger.info("Getting all groceries for admin");

  return await GroceryModel.get(filter);
}

export async function getGroceries(filter: IGroceryQuery) {
  logger.info("Getting all groceries");

  let data = await GroceryModel.get(filter);
  data = data.filter((grocery) => {
    return grocery.quantity > 0 && !grocery.deletedAt;
  });

  return data.map((grocery) => {
    return {
      id: grocery.id,
      name: grocery.name,
      description: grocery.description,
      price: grocery.price,
      quantity: grocery.quantity,
    };
  });
}

export async function updateGrocery(id: UUID, data: IGrocery) {
  return await GroceryModel.update(id, data);
}

export async function deleteGrocery(id: UUID) {
  return await GroceryModel.delete(id);
}
