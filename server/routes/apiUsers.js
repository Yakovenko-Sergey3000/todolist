

const router = require('express').Router(),
    UserControllers = require('../controllers/user.controllers'),
    UsersServices = require('../services/users.services'),
    TasksServices = require('../services/tasks.services'),
    userControllers = new UserControllers({ users_service: new UsersServices(), tasks_service: new TasksServices() }),
    { hideUserPassOnClient } = require('../castom-methods.js/castom-methods'),
    isLogin = require('../middleware/isLogin'),
    isAdmin = require('../middleware/isAdmin'),
    {body, validationResult} = require('express-validator')



router.get('/all-users', isLogin, isAdmin, async (req, res) => {
    const responce = await userControllers.getAllUsers()
    if (responce.length === 0) res.send('Другие пользователи еще не зарегестрированные')
    res.send(hideUserPassOnClient(responce))
})

router.post('/create-task',
    isLogin,
    isAdmin,
    body('responsible').isLength({min: 1}).withMessage('Выберите отвественного'),
    body('priority').isLength({min: 1}).withMessage('Выберите приоритет задачи'),
    body('date_end').isLength({min: 1}).withMessage('Выберите дату когда нужно выполнить задачу'),
    body('title').isLength({min: 1}).withMessage('Введите заголовок задачи'),

    async (req, res) => {
        const validBody = validationResult(req);
        if (validBody.errors.length) {
            res.send(validBody.errors.map(err => {
                return {
                    param: err.param,
                    msg: err.msg
                }
            }))
        } else {
            await userControllers.createTask(req.body)
            res.send([{
                status: 200,
                msg: 'Задача создана!'
            }])
        }



})

router.put('/appoint-admin', isLogin, isAdmin, async (req, res) => {
    try {
        await userControllers.appointAdmin(req.body)
        res.send({status: 200})
    } catch (e) {
        res.send({error: e})
    }
})

router.post('/user-tasks', isLogin, async (req, res) => {
    try {
        const responce = await userControllers.getMyTasks(req.body)
        res.send(responce)
    } catch (error) {
        console.log(error);
    }
})

router.post('/assigned-tasks', isLogin, async (req, res) => {
    try {

        const responce = await userControllers.getAssignedTasks(req.body)
        res.send(responce)
    } catch (error) {
        console.log(error);
    }
})

router.put('/change-options', async (req, res) => {
    try {
        await userControllers.changeOptions(req.body)
        res.send({status: 200})
    } catch (error) {
        console.log(error);
    }
})



module.exports = router