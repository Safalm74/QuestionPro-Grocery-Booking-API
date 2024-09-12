import { UUID } from "crypto";
import { IGrocery, IGroceryQuery } from "../interfaces/grocery";
import { GroceryModel } from "../models/grocery";
import loggerWithNameSpace from "../utils/logger";
import { NotFoundError } from "../error/NotFoundError";
import { BadRequestError } from "../error/BadRequestError";

const logger = loggerWithNameSpace("service: grocery");

/**
 * Service function to create a new grocery item.
 *
 * @param data - The grocery item data to create.
 * @param userId - The ID of the user creating the grocery item.
 * @returns The created grocery item.
 */
export function createGrocery(data: IGrocery, userId: UUID) {
  logger.info("Creating grocery");

  return GroceryModel.create(data, userId);
}

/**
 * Service function to get groceries for admin.
 *
 * @param filter - Query parameters to filter groceries.
 * @returns List of groceries for admin.
 * @throws NotFoundError if grocery does not exist.
 */
export async function getGroceriesForAdmin(filter: IGroceryQuery) {
  logger.info("Getting all groceries for admin");

  const data = (await GroceryModel.get(filter)).data;

  if (filter.id && !data[0]) {
    throw new NotFoundError("Grocery does not exist");
  }

  return await GroceryModel.get(filter);
}

/**
 * Service function to get groceries for users.
 *
 * @param filter - Query parameters to filter groceries.
 * @returns List of available groceries.
 * @throws NotFoundError if grocery does not exist.
 */
export async function getGroceries(filter: IGroceryQuery) {
  logger.info("Getting all groceries");

  let data = (await GroceryModel.get(filter)).data;

  if (filter.id && !data[0]) {
    throw new NotFoundError("Grocery does not exist");
  }

  // If a specific grocery ID is requested, return only that grocery.
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

/**
 * Service function to update an existing grocery item.
 *
 * @param id - The ID of the grocery to update.
 * @param data - The new grocery data.
 * @param userId - The ID of the user updating the grocery.
 * @returns The updated grocery item.
 * @throws NotFoundError if grocery does not exist.
 */
export async function updateGrocery(id: UUID, data: IGrocery, userId: UUID) {
  logger.info("Updating grocery");

  const existingGrocery = (await GroceryModel.get({ id })).data[0];

  if (!existingGrocery || existingGrocery.deletedAt) {
    throw new NotFoundError("Grocery does not exist");
  }

  return await GroceryModel.update(id, data, userId);
}

/**
 * Service function to update the quantity of a grocery item.
 *
 * @param id - The ID of the grocery item to update.
 * @param quantity - The new quantity.
 * @param userId - The ID of the user updating the quantity.
 * @returns The updated grocery item with the new quantity.
 * @throws NotFoundError if grocery does not exist.
 * @throws BadRequestError if quantity is negative.
 */
export async function updateQuantity(id: UUID, quantity: number, userId: UUID) {
  logger.info("Updating grocery quantity");

  if (quantity < 0) {
    throw new BadRequestError("Quantity cannot be negative");
  }

  const existingGrocery = (await GroceryModel.get({ id })).data[0];

  if (!existingGrocery || existingGrocery.deletedAt) {
    throw new NotFoundError("Grocery does not exist");
  }

  return await GroceryModel.updateQuantity(id, quantity, userId);
}

/**
 * Service function to delete a grocery item.
 *
 * @param id - The ID of the grocery item to delete.
 * @returns The result of the deletion operation.
 * @throws NotFoundError if grocery does not exist.
 */
export async function deleteGrocery(id: UUID) {
  const existingGrocery = (await GroceryModel.get({ id })).data[0];

  if (!existingGrocery || existingGrocery.deletedAt) {
    throw new NotFoundError("Grocery does not exist");
  }

  return await GroceryModel.delete(id);
}
