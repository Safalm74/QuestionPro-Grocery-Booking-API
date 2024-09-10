import { Knex } from "knex";

const TABLE_NAME = "order_items";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.uuid("id").defaultTo(knex.raw("gen_random_uuid()")).primary();
    table.uuid("order_id").notNullable().references("id").inTable("orders");
    table
      .uuid("grocery_id")
      .notNullable()
      .references("id")
      .inTable("groceries");
    table.integer("quantity").notNullable();
    table.integer("price_per_unit").notNullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
    table.timestamp("deleted_at").nullable();
  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
