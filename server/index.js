const dotenv = require("dotenv").config({ path: "./config.env" })
const express = require("express")
const cors = require("cors")
const App = express()
const { Router } = require("./Routes/AllRoutes")
const PORT = process.env.PORT


// Use CORS middleware to allow cross-origin requests
App.use(cors())

// Use middleware to parse JSON request bodies
App.use(express.json())

// Use the Router for handling routes that start with /blog
App.use("/blog", Router)

App.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})


