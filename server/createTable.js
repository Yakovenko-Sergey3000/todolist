const knex = require('./db.config')
module.exports.up = async () => {
    try {
        await knex.schema.hasTable('users').then((exists) => {
            if (!exists) {
                return knex.schema.createTable('users', (table) => {
                    table
                        .increments('id')
                        .primary()
                    table
                        .text('_id')
                        .unique()
                        .notNullable()
                    table
                        .string('name', 20)
                        .notNullable()
                    table
                        .string('surname', 20)
                        .notNullable()
                    table.string('patronymic', 20)
                    table
                        .string('login', 40)
                        .unique()
                        .notNullable()
                    table
                        .string('pass')
                        .notNullable()
                    table
                        .string('position')
                        .defaultTo('user')
                }).then(() => {
                    return knex('users').insert({
                        _id: 'hty2km5n6',
                        name: 'admin',
                        surname: 'superuser',
                        login: 'admin',
                        pass: 'admin',
                        position: 'admin'
                    })
                })
            }
        })
        await knex.schema.hasTable('tasks').then((exists) => {
            if (!exists) {
                return knex.schema.createTable('tasks', (table) => {
                    table
                        .increments('id')
                        .primary()
                    table
                        .string('title', 100)
                        .notNullable()
                    table.text('text')
                    table.date('date-end')
                    table.date('date-created')
                    table.date('date-start')
                    table.string('priority')
                    table.string('status')
                    table
                        .integer('creator')
                        .notNullable()
                    table
                        .integer('responsible')
                        .notNullable()
                })
            }
        })

        await knex.schema.hasTable('tasks_relation').then((exists) => {
            if (!exists) {
                return knex.schema.createTable('tasks_relation', (table) => {
                    table
                        .increments('id')
                        .primary()
                    table
                        .integer('task_id')
                        .references('tasks.id')
                    table
                        .integer('creator_id')
                        .references('users.id')
                    table
                        .integer('responsible_id')
                        .references('users.id')

                })
            }
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports.down = async () => {
    await knex.schema.hasTable('users').raw('DROP TABLE users CASCADE')
    await knex.schema.hasTable('tasks_relation').raw('DROP TABLE tasks_relation CASCADE')
    await knex.schema.hasTable('tasks').raw('DROP TABLE tasks CASCADE')
}