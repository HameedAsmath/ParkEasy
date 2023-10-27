require("dotenv").config()
require("./config/database").connect()

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const express = require('express')
const app = express()
const cookieParser = require("cookie-parser")
const cors = require("cors")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors()); 

app.use('/',userRoutes)
app.use('/',adminRoutes)


module.exports = app