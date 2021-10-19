const knex = require('../db.config');


class AuthService {
    async createUser(_id, name, surname, patronymic, login, pass, position) {
        return await knex('users')
            .insert({ _id, name, surname, patronymic, login, pass, position })
            .returning(['_id', 'name', 'surname', 'patronymic', 'login', 'position'])
    }

    async isValidSession(idSess) {
        return await knex('sessions').where({ sid: idSess }).select('*')
    }

}


module.exports = AuthService;
