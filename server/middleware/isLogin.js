const AuthController = require("../controllers/auth.controllers"),
    AuthService = require('../services/auth.services'),
    authController = new AuthController({ auth_service: new AuthService() })


const isLogin = async (req, res, next) => {

    if (req.cookies['connect.sid']) {
        const idSess = req.cookies['connect.sid'].split('.')[0];
        const sessions = await authController.isLogin(idSess.slice(2))
        if (sessions.length) {
            const user = sessions[0].sess.user[0]
            req.activeUser = user
            next()
        } else {
            res.send({name: 'error'})
        }
    } else {
        res.send({"cookie": "false"})
    }




}

module.exports = isLogin