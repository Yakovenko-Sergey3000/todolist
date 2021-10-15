require('dotenv').config()
const express = require('express'),
    app = express(),
    PORT = process.env.PORT || 3000,
    createTable = require('./createTable')




app.listen(PORT, () => {
    createTable.up()
    console.log(`Server running on ${PORT} port`);
})
