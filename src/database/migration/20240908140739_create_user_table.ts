import { Knex } from "knex";

const TABLE_NAME = "users";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.uuid("id").defaultTo(knex.raw("gen_random_uuid()")).primary();

    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("phone").notNullable();
    table.string("address").notNullable();
    table.enu("role", ["admin", "user"]).notNullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
    table.timestamp("updated_at").nullable();
    table.timestamp("deleted_at").nullable();
  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
