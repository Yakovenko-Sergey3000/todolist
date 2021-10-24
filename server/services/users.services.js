const knex = require('../db.config');


class UsersServices {

    async getAllUsers() {
        return (await knex('users').select('*'))
    }

    async getUserByLogin(login, options = { openPass: false }) {
        if (options.openPass) {
            return (await knex('users')
                .select('*')
                .where({ login }))
        } else {
            return (await knex('users')
                .select(['_id', 'name', 'surname', 'patronymic', 'login', 'position'])
                .where({ login }))
        }
    }

    async appointAdmin(id) {
        await knex('users').update({ position: 'admin' }).where({ _id: id })
    }
}

module.exports = UsersServices