

const router = require('express').Router(),
    UserControllers = require('../controllers/user.controllers'),
    UsersServices = require('../services/users.services'),
    TasksServices = require('../services/tasks.services'),
    userControllers = new UserControllers({ users_service: new UsersServices(), tasks_service: new TasksServices() }),
    { hideUserPassOnClient } = require('../castom-methods.js/castom-methods'),
    isLogin = require('../middleware/isLogin'),
    isAdmin = require('../middleware/isAdmin')


router.get('/all-users', isLogin, isAdmin, async (req, res) => {
    const responce = await userControllers.getAllUsers()
    if (responce.length === 0) res.send('Другие пользователи еще не зарегестрированные')
    res.send(hideUserPassOnClient(responce))
})

router.post('/create-task', isLogin, isAdmin, async (req, res) => {
    const responce = await userControllers.createTask(req.body)
    res.send(responce)
})

router.put('/appoint-admin', isLogin, isAdmin, async (req, res) => {
    await userControllers.appointAdmin(req.body)
    res.send('ok')
})

router.post('/my-tasks', isLogin, async (req, res) => {
    try {
        console.log(req.user);
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
        res.send('ok')
    } catch (error) {
        console.log(error);
    }
})



module.exports = router