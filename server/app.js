

require('dotenv').config()
const express = require('express'),
    app = express(),
    PORT = process.env.PORT || 3000,
    cookieParser = require('cookie-parser'),
    createTable = require('./createTable'),
    authRouter = require('./routes/auth-router'),
    apiUsers = require('./routes/apiUsers'),
    session = require('express-session'),
    KnexSessionStore = require('connect-session-knex')(session),
    KnexSessionConfig = require('./knexSession.config')






app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
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
app.use('/api', apiUsers)




app.listen(PORT, () => {
    createTable.up()
    console.log(`Server running on ${PORT} port`);
})
