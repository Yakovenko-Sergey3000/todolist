const knex = require('../db.config');


class AuthService {
    async createUser(name, surname, patronymic, login, pass, position) {
        return await knex('users')
            .insert({ name, surname, patronymic, login, pass, position })
            .returning(['id', 'name', 'surname', 'patronymic', 'login', 'position'])
    }


}


module.exports = AuthService;
