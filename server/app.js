const { Knex } = require('knex');

require('dotenv').config()
const express = require('express'),
    app = express(),
    PORT = process.env.PORT || 3000,
    createTable = require('./createTable'),
    authRouter = require('./routes/auth-router'),
    session = require('express-session'),
    KnexSessionStore = require('connect-session-knex')(session),
    KnexSessionConfig = require('./knexSession.config')






app.use(express.json())
app.use(
    session({
        secret: 'keyboard cat',
        cookie: {
            maxAge: 10000, // ten seconds, for testing
            nttpOnly: true
        },
        store: new KnexSessionStore(KnexSessionConfig),
        resave: false,
        saveUninitialized: false
    }),
);
app.use('/', authRouter)



app.listen(PORT, () => {
    createTable.up()
    console.log(`Server running on ${PORT} port`);
})
