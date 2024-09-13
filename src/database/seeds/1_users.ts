import { Knex } from "knex";
import bcrypt from "bcrypt";
const TABLE_NAME = "users";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function seed(knex: Knex): Promise<void> {
  await knex.raw(`TRUNCATE TABLE ${TABLE_NAME} RESTART IDENTITY CASCADE`);
  return knex(TABLE_NAME).then(() => {
    return knex(TABLE_NAME).insert([
      {
        name: "admin",
        email: "admin@admin.com",
        password: bcrypt.hashSync("Admin123!", 10),
        phone: "0123456789",
        address: "admin",
        role: "admin",
      },
      {
        name: "user",
        email: "user@user.com",
        password: bcrypt.hashSync("User123!", 10),
        phone: "0123456789",
        address: "user",
        role: "user",
      },
    ]);
  });
}
