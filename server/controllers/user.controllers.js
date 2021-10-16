const bcrypt = require('bcrypt'),
    soul = 6;

class User {
    constructor(auth_service, users_service, { name = '', surname, patronymic, login, pass, position = 'user' }) {
        this.name = name;
        this.surname = surname;
        this.patronymic = patronymic;
        this.login = login;
        this.pass = pass;
        this.position = position;
        this.auth_service = auth_service; // Use DB methods auth
        this.users_service = users_service; // Use DB methods users

    }

    async createUser() {
        try {
            const user = await this.users_service.getUserByLogin(this.login)

            if (user[0]) throw new Error('Пользователь с таким логином уже существует')
            const hashPass = await bcrypt.hash(this.pass, soul)

            return await this.auth_service.createUser(this.name, this.surname, this.patronymic, this.login, hashPass, this.position);

        } catch (error) {
            return error.message
        }
    }
}


module.exports = User