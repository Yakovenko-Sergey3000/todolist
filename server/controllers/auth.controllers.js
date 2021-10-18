const bcrypt = require('bcrypt'),
    soul = 6,
    { v4: uuidv4 } = require('uuid');

const hideUserPassOnClient = (user) => { // TODO Проверить актуальность функции
    return user.map(u => {
        delete u['pass']
        return u
    })
}



class AuthController {
    constructor(auth_service, users_service) {
        this.auth_service = auth_service; // Use DB methods auth
        this.users_service = users_service; // Use DB methods users
    }

    async createUser({ name, surname, patronymic, login, pass, position = 'user' }) {
        const id = uuidv4()

        try {
            const user = await this.users_service.getUserByLogin(login)

            if (user[0]) throw new Error(JSON.stringify({ param: 'login', msg: 'Пользователь с таким логином уже существует' }))
            const hashPass = await bcrypt.hash(pass, soul)

            return await this.auth_service.createUser(id, name, surname, patronymic, login, hashPass, position);

        } catch (error) {
            return error.message
        }
    }

    async loginUser({ login, pass }) {
        try {
            const user = await this.users_service.getUserByLogin(login, { openPass: true })

            if (!user[0]) throw new Error(JSON.stringify({ param: 'login', msg: 'Пользователь еще не существует' }))
            if (!await bcrypt.compareSync(pass, user[0].pass)) throw new Error(JSON.stringify({ param: 'pass', msg: 'Неверный пароль' }))

            return hideUserPassOnClient(user);

        } catch (error) {
            return error.message
        }
    }
}


module.exports = AuthController;