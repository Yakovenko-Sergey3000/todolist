const knex = require('../db.config')


class TasksServices {
    async createTask(id, title, text, date_end, date_created, date_updated, priority, status, creator, responsible) {

       try {
          await knex('tasks')
               .insert({
                   _id: id,
                   title,
                   text,
                   date_end,
                   date_created,
                   date_updated,
                   priority,
                   status,
                   creator,
                   responsible
               })
           await knex('tasks_relation')
               .insert({
                   task_id: id,
                   creator_id: creator,
                   responsible_id: responsible
               })

       } catch (e) {
           console.log(e)
           return e.message
       }


    }

    async getMyTasks(id) {
        const tasks  = await knex('tasks')
            .join('tasks_relation', 'tasks_relation.task_id', 'tasks._id')
            .where('tasks_relation.responsible_id', id)
            .join('users', 'tasks.responsible', 'users._id')
            .where('users._id', id)
            .orderBy('tasks', 'desc')
            .select(['tasks.*', 'users.surname', 'users.name'])


        const t = await knex('tasks')
            .join('tasks_relation', 'tasks_relation.task_id', 'tasks._id')
            .where('tasks_relation.responsible_id', id)
            .join('users', 'tasks.creator', 'users._id')
            .whereIn('users._id', function () {
                 this.select('creator')
            })
            .select(['users.name AS creatorName', 'users.surname AS creatorSurname'])

    return tasks.map((task, i) => {
        return {...task, ...t[i]}
    })






    }

    async getAssignedTasks(id) {
        return (await knex('tasks')
            .join('tasks_relation', 'tasks_relation.task_id', 'tasks._id')
            .where('tasks_relation.creator_id', id)
            .select('tasks.*'))
    }

    async changeOptions({ _id, ...options }) {
        await knex('tasks').update(options).where({ _id })
    }



}

module.exports = TasksServices