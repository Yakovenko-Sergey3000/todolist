const knex = require('../db.config');


class UsersServices {
    async getUserByLogin(login, options = { openPass: false }) {
        if (options.openPass) {
            return await knex('users')
                .select('*')
                .where({ login })
        } else {
            return await knex('users')
                .select(['_id', 'name', 'surname', 'patronymic', 'login', 'position'])
                .where({ login })
        }
    }

}

module.exports = UsersServices