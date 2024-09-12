import { Knex } from "knex";

const TABLE_NAME = "groceries";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          imageUrl: "imageurl",
          name: "apple",
          description: "fresh",
          price: 10,
          quantity: 10,
        },
        {
          imageUrl: "imageurl",
          name: "orange",
          description: "fresh",
          price: 10,
          quantity: 10,
        },
        {
          imageUrl: "imageurl",
          name: "Turkey",
          description: "fresh",
          price: 10,
          quantity: 10,
        },
      ]);
    });
}
