require('dotenv').config()
const knex = require('./db.config'),
    bcrypt = require('bcrypt');


module.exports.up = async () => {
    try {
        await knex.schema.hasTable('users').then((exists) => {
            if (!exists) {
                return knex.schema.createTable('users', (table) => {
                    table
                        .increments('id', { primaryKey: false })
                    table
                        .text('_id')
                        .unique()
                        .notNullable()
                        .primary()
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
                        .text('position')
                        .defaultTo('user')
                }).then(() => {
                    bcrypt.hash(process.env.DB_SUPERUSER_PASS || 'admin', 6).then((hashPass) => {
                        return knex('users').insert({
                            _id: 'hty2km5n6',
                            name: 'admin',
                            surname: 'superuser',
                            login: 'admin',
                            pass: hashPass,
                            position: 'admin'
                        })
                    })

                })
            }
        })
        await knex.schema.hasTable('tasks').then((exists) => {
            if (!exists) {
                return knex.schema.createTable('tasks', (table) => {
                    table
                        .increments('id', { primaryKey: false })

                    table
                        .text('_id')
                        .unique()
                        .notNullable()
                        .primary()
                    table
                        .string('title', 100)
                        .notNullable()
                    table.text('text')
                    table.date('date_end')
                    table.date('date_created')
                    table.date('date_start')
                    table.string('priority')
                    table.string('status')
                    table
                        .text('creator')
                        .notNullable()
                    table
                        .text('responsible')
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
                        .text('task_id')
                    table
                        .text('creator_id')
                    table
                        .text('responsible_id')
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