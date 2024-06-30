// import necessary moduels
const mongoose = require("mongoose")
const express = require("express")
const Router = express.Router()

// importing Signup and login controller functions from UserController
const { Signup, Login } = require("../Controller/UserController")


// connecting to mongodb database
mongoose.connect(process.env.DB_URL).then(() => {
    // if connection is successful the log success message
    console.log("mongodb is connected successfully")
}).catch((err) => {
    // if connection is failed then log error message
    console.log(`some error occurred in database ${err}`)
})


// defining the Signup route  which handles POST request
Router.post("/signup", Signup)

// defining the login route which handles POST request
Router.post("/login", Login)

module.exports = { Router }

