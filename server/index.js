const dotenv = require("dotenv").config({ path: "./config.env" });
const express = require("express");
const cors = require("cors");
const App = express();
const path = require("path");
const { Router } = require("./Routes/AllRoutes");
const PORT = process.env.PORT;

// getting the exact path for the blogUpload
const blogFolderPath = path.join(__dirname, "./Storage/blogUploads");
const profileFolderPath = path.join(__dirname, "./Storage/Profiles");

// Use CORS middleware to allow cross-origin requests
App.use(cors());

// serving the blogUploads folder as static folder where all blog images will be storeds
App.use(express.static(blogFolderPath));
App.use(express.static(profileFolderPath));

// Use middleware to parse JSON request bodies
App.use(express.json());

// Use the Router for handling routes that start with /blog
App.use("/blog", Router);

App.listen(PORT, () => {
  console.log(`server is running on ${process.env.BASE_URL}`)
});
