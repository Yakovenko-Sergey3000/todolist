const router = require('express').Router(),
    AuthController = require('../controllers/auth.controllers'),
    AuthService = require('../services/auth.services'),
    UsersServices = require('../services/users.services'),
    { body, validationResult } = require('express-validator'),
    authController = new AuthController({ auth_service: new AuthService(), users_service: new UsersServices() }),
    isAuth = require('../middleware/isLogin')


router.post(
    '/registration',
    body('pass').isLength({ min: 4 }).withMessage('Пароль должен быть минимум 4 символа!'),
    body('passwordRepeat').custom((value, { req }) => {
        if (value !== req.body.pass) {
            throw new Error('Пароли не воспадают!');
        }
        return true
    }),
    body('name').isLength({ min: 1 }).withMessage('Введите ваше имя'),
    body('surname').isLength({ min: 1 }).withMessage('Введите вашу фамилию'),
    async (req, res) => {
        try {
            const validBody = validationResult(req)

            if (validBody.errors.length) {
                res.send(validBody.errors.map(err => {
                    return {
                        param: err.param,
                        msg: err.msg
                    }
                }))
            } else {

                const responce = await authController.createUser(req.body)

                if (Array.isArray(responce)) {
                    req.session.user = responce

                    res.send([
                        {
                            param: true,
                            user: responce
                        }
                    ])
                } else {
                    res.send(responce)
                }
            }
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    })


router.post('/login', async (req, res) => {
    try {
        const responce = await authController.loginUser(req.body)
        if (Array.isArray(responce)) {
            req.session.user = responce
            res.send([
                {
                    param: true,
                    user: responce,
                    idSess: req.sessionID
                }
            ])
        } else {
            res.send(responce)
        }
    } catch (error) {
        console.log(error);
        res.send(error)
    }
router.get('/is-login', isAuth, async (req,res) => {
    try {
        if (req.activeUser) {
            res.send({
                id: req.sessionID,
                user: req.activeUser
            })
        }
    } catch (error) {
        res.send({error: error})
    }
})

router.get('/clearCookie', async (req, res) => {
        res.status(200)
        res.clearCookie('connect.sid')
        res.send()
})

})
module.exports = router