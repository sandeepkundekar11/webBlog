// import necessary moduels
const mongoose = require("mongoose");
const express = require("express");
const { Middleware } = require("../Controller/Auth");
const { AddBlogController } = require("../Controller/AddBlogController");
const multer = require("multer");
const Router = express.Router();

// importing Signup and login controller functions from UserController
const { Signup, Login } = require("../Controller/UserController");

// connecting to mongodb database
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    // if connection is successful the log success message
    console.log("mongodb is connected successfully");
  })
  .catch((err) => {
    // if connection is failed then log error message
    console.log(`some error occurred in database ${err}`);
  });

// defining the multer for add post
const blogStore = multer.diskStorage({
  // setting the destination of folder
  destination: (req, file, cb) => {
    cb(null, "./Storage/blogUploads");
  },
  // setting the name of the file
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const blogUpload = multer({
  storage: blogStore,
});

// defining the Signup route  which handles POST request
Router.post("/signup", Signup);

// defining the login route which handles POST request
Router.post("/login", Login);

// defining the Add blog Route which Handle PUT request
Router.put(
  "/addBlog",
  Middleware,
  blogUpload.single("blog"),
  AddBlogController
);

module.exports = { Router };
