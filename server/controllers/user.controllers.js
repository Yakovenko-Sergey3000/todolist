const { v4: uuidv4 } = require('uuid'),
    bcrypt = require('bcrypt')

class User {
    constructor({ users_service, tasks_service }) {
        this.users_service = users_service;
        this.tasks_service = tasks_service;

    }


    async getAllUsers() {
        return await this.users_service.getAllUsers()
    }

    async createTask({ title, text, date_end, date_created, date_updated, priority, status, creator, responsible }) {
        try {
            const id = uuidv4()
            return await this.tasks_service.createTask(id, title, text, date_end, date_created, date_updated, priority, status, creator, responsible)

        } catch (error) {
            return error.messages;
        }
    }

    async appointAdmin({ id }) {
        await this.users_service.appointAdmin(id)
    }

    async getMyTasks({ id }) {
        try {
            return await this.tasks_service.getMyTasks(id)
        } catch (error) {
            return error
        }
    }

    async getAssignedTasks({ id }) {
        try {
            return await this.tasks_service.getAssignedTasks(id)
        } catch (error) {
            return error
        }
    }

    async changeOptions(options) {
        try {
            await this.tasks_service.changeOptions(options)
        } catch (error) {
            return error
        }
    }

}

module.exports = User;