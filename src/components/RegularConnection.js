'use strict'
let mysql = require('mysql2')

let dockerConnection = mysql.createPool({
    user: 'root',
    password: 'admin201!',
    database: 'db_sm',
    host: 'localhost',
    port: 3308,
    charset: 'utf8mb4',
    connectionLimit: 10
})

module.exports = {
    dockerConnection
}