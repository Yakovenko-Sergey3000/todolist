const knex = require('./db.config')

module.exports = {
    knex,
    tablename: 'sessions',
    createtable: true
}