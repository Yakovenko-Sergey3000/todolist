const knex = require('../db.config')

class TasksServices {
    async createTask(id, title, text, date_end, date_created, date_start, priority, status, creator, responsible) {

        const task = await knex('tasks')
            .insert({
                _id: id,
                title,
                text,
                date_end,
                date_created,
                date_start,
                priority,
                status,
                creator,
                responsible
            }).returning('*')
        await knex('tasks_relation')
            .insert({
                task_id: id,
                creator_id: creator,
                responsible_id: responsible
            }).returning('*')
        return task
    }

    async getMyTasks(id) {
        return await knex('tasks')
            .join('tasks_relation', 'tasks_relation.task_id', 'tasks._id')
            .where('tasks_relation.responsible_id', id)
            .select('tasks.*')
    }

    async getAssignedTasks(id) {
        return await knex('tasks')
            .join('tasks_relation', 'tasks_relation.task_id', 'tasks._id')
            .where('tasks_relation.creator_id', id)
            .select('tasks.*')
    }

    async changeOptions({ _id, ...options }) {
        await knex('tasks').update(options).where({ _id })
    }



}

module.exports = TasksServices