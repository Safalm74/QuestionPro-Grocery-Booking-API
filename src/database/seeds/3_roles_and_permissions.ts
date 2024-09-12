import { Knex } from "knex";

const TABLE_NAME = "roles_and_permissions";

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
        //grocery
        {
          role: "user",
          permission: "grocery: read",
        },
        {
          role: "admin",
          permission: "grocery: create",
        },
        {
          role: "admin",
          permission: "grocery: read",
        },
        {
          role: "admin",
          permission: "grocery: update",
        },
        {
          role: "admin",
          permission: "grocery: delete",
        },
        //order
        {
          role: "user",
          permission: "order: create",
        },
        {
          role: "user",
          permission: "order: read",
        },
        {
          role: "user",
          permission: "order: update",
        },
        {
          role: "user",
          permission: "order: delete",
        },
        {
          role: "admin",
          permission: "order: read",
        },
        {
          role: "admin",
          permission: "order: update",
        },
        {
          role: "admin",
          permission: "order: delete",
        },

        //orderItem
        {
          role: "user",
          permission: "orderItem: read",
        },
        {
          role: "admin",
          permission: "orderItem: read",
        },

        //user
        {
          role: "user",
          permission: "user: create",
        },
        {
          role: "user",
          permission: "user: read",
        },
        {
          role: "user",
          permission: "user: update",
        },
        {
          role: "user",
          permission: "user: delete",
        },
        {
          role: "admin",
          permission: "user: create",
        },
        {
          role: "admin",
          permission: "user: read",
        },
        {
          role: "admin",
          permission: "user: update",
        },
        {
          role: "admin",
          permission: "user: delete",
        },
      ]);
    });
}
