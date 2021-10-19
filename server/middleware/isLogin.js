const AuthController = require("../controllers/auth.controllers"),
    AuthService = require('../services/auth.services'),
    authController = new AuthController({ auth_service: new AuthService() })


const isLogin = async (req, res, next) => {

    if (req.cookies['connect.sid']) {
        const idSess = req.cookies['connect.sid'].split(':')[1];

        const t = await authController.isLogin(idSess)
        console.log(req.cookies['connect.sid'].slice(0));
        console.log(t);
        next()

    } else {
        res.send("Don't cookies")
    }




}

module.exports = isLogin