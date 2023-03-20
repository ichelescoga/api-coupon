require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const createError = require('http-errors')
const app = express()
const Routes = require('./src/router/Routes')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extend: true
}))

app.use('/backend/sm', Routes)

app.use(function (req, res, next) {
  next(createError(404))
})

let PORT = process.env.EXPOSED_PORT
app.listen(PORT, () => console.log('Project listening on port ', process.env.EXPOSED_PORT))
