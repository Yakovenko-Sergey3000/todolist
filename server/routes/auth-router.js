const router = require('express').Router(),
    UserController = require('../controllers/user.controllers'),
    AuthService = require('../services/auth.services'),
    UsersServices = require('../services/users.services'),
    { body, validationResult } = require('express-validator')





router.post(
    '/registration',
    body('pass').isLength({ min: 4 }).withMessage('Пароль должен быть минимум 4 символа!'),
    body('passwordRepeat').custom((value, { req }) => {
        if (value !== req.body.pass) {
            throw new Error('Пароли не воспадают!');
        }
        return true
    }),
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
                const user = new UserController(new AuthService(), new UsersServices(), req.body)
                const responce = await user.createUser()
                res.send(responce)
            }


        } catch (error) {
            console.log(error);
            res.send(error)
        }
    })


router.post('/login', (req, res) => {
    console.log(req.body);
    res.send('ok')
})
module.exports = router