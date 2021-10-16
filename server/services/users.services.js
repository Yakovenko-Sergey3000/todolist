const knex = require('../db.config');


class UsersServices {
    async getUserByLogin(login) {
        return await knex('users')
            .select(['id', 'name', 'surname', 'patronymic', 'login', 'position'])
            .where({ login })
    }

}

module.exports = UsersServices