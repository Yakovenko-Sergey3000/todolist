module.exports.hideUserPassOnClient = (user) => { // TODO Проверить актуальность функции
    return user.map(u => {
        delete u['pass']
        return u
    })
}