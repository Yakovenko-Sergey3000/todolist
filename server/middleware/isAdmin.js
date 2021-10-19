const isAdmin = async (req, res, next) => {
    if (req.activeUser) {
        req.activeUser.position === 'admin' ? next() : res.send('Опция доступна только для Администраторов')
    } else {
        res.send('go Login')
    }
}

module.exports = isAdmin;