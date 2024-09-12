import { UUID } from "crypto";
import { IGrocery, IGroceryQuery } from "../interfaces/grocery";
import { GroceryModel } from "../models/grocery";
import loggerWithNameSpace from "../utils/logger";
import { NotFoundError } from "../error/NotFoundError";
import { BadRequestError } from "../error/BadRequestError";

const logger = loggerWithNameSpace("service: grocery");

export function createGrocery(data: IGrocery, userId: UUID) {
  logger.info("Creating grocery");

  return GroceryModel.create(data, userId);
}

export async function getGroceriesForAdmin(filter: IGroceryQuery) {
  logger.info("Getting all groceries for admin");

  const data = await GroceryModel.get(filter);

  if (filter.id && !data[0]) {
    throw new NotFoundError("Grocery does not exist");
  }

  return await GroceryModel.get(filter);
}

export async function getGroceries(filter: IGroceryQuery) {
  logger.info("Getting all groceries");

  let data = await GroceryModel.get(filter);

  if (filter.id && !data[0]) {
    throw new NotFoundError("Grocery does not exist");
  }

  if (filter.id) {
    return [
      {
        id: data[0].id,
        imageUrl: data[0].imageUrl,
        name: data[0].name,
        description: data[0].description,
        price: data[0].price,
        quantity: data[0].quantity,
        deletedAt: data[0].deletedAt,
      },
    ];
  }

  // filter out deleted and out-of-stock groceries
  data = data.filter((grocery) => {
    return grocery.quantity > 0 && !grocery.deletedAt;
  });

  return data.map((grocery) => {
    return {
      id: grocery.id,
      imageUrl: grocery.imageUrl,
      name: grocery.name,
      description: grocery.description,
      price: grocery.price,
      quantity: grocery.quantity,
      deletedAt: grocery.deletedAt,
    };
  });
}

export async function updateGrocery(id: UUID, data: IGrocery, userId: UUID) {
  logger.info("Updating grocery");

  const existingGrocery = (await GroceryModel.get({ id }))[0];

  if (!existingGrocery || existingGrocery.deletedAt) {
    throw new NotFoundError("Grocery does not exist");
  }

  return await GroceryModel.update(id, data, userId);
}

export async function updateQuantity(id: UUID, quantity: number, userId: UUID) {
  logger.info("Updating grocery quantity");

  if (quantity < 0) {
    throw new BadRequestError("Quantity cannot be negative");
  }

  const existingGrocery = (await GroceryModel.get({ id }))[0];

  if (!existingGrocery || existingGrocery.deletedAt) {
    throw new NotFoundError("Grocery does not exist");
  }

  return await GroceryModel.updateQuantity(id, quantity, userId);
}

export async function deleteGrocery(id: UUID) {
  const existingGrocery = (await GroceryModel.get({ id }))[0];

  if (!existingGrocery || existingGrocery.deletedAt) {
    throw new NotFoundError("Grocery does not exist");
  }

  return await GroceryModel.delete(id);
}
