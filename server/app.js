require('dotenv').config()
const express = require('express'),
    app = express(),
    PORT = process.env.PORT || 3000,
    createTable = require('./createTable'),
    authRouter = require('./routes/auth-router')

app.use(express.json())
app.use('/', authRouter)



app.listen(PORT, () => {
    createTable.up()
    console.log(`Server running on ${PORT} port`);
})
