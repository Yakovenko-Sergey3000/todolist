const router = require('express').Router(),
    AuthController = require('../controllers/auth.controllers'),
    AuthService = require('../services/auth.services'),
    UsersServices = require('../services/users.services'),
    { body, validationResult } = require('express-validator'),
    authController = new AuthController({ auth_service: new AuthService(), users_service: new UsersServices() })



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

                    res.send('Ok')
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
            res.send('Ok')
        } else {
            res.send(responce)
        }
    } catch (error) {
        console.log(error);
        res.send(error)

    }

})
module.exports = router