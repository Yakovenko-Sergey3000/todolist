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
                        .string('creator')
                        .notNullable()
                    table
                        .string('responsible')
                        .notNullable()
                })
            }
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports.down = async () => {
    await knex.schema.dropTableIfExists('users')
    await knex.schema.dropTableIfExists('tasks')
}