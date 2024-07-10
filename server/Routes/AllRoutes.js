// import necessary moduels
const mongoose = require("mongoose");
const express = require("express");
const { Middleware } = require("../Controller/Auth");
const { AddBlogController } = require("../Controller/AddBlogController");
const multer = require("multer");
const Router = express.Router();
const fs = require("fs");
// importing Signup and login controller functions from UserController
const { Signup, Login } = require("../Controller/UserController");
const path = require("path");
const { LikeDislike } = require("../Controller/LikeDislikeController");
const { AddComment } = require("../Controller/CommentController");
const { GetAllBlogs } = require("../Controller/GetAllBlogController");
const { GetBlog } = require("../Controller/GetBlogController");

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
    // setting the path for the BlogUploads
    const dirPath = path.join(__dirname, "../Storage/blogUploads");
    // checking that folder is present or not if not present then create and add the blog img
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    cb(null, dirPath);
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
// urlhttp://localhost:8000/blog/signup
Router.post("/signup", Signup);

// defining the login route which handles POST request
// url http://localhost:8000/blog/login
Router.post("/login", Login);

// defining the Add blog Route which Handle PUT request
// url http://localhost:8000/blog/addBlog
Router.put(
  "/addBlog",
  Middleware,
  blogUpload.single("blog"),
  AddBlogController
);

// defining the Like dislike post route Handle PUT request
// url http://localhost:8000/blog/likeDislike/{Post_id}
Router.put("/likeDislike/:id", Middleware, LikeDislike);

// defining the Comment route Handles PUT request
//  url http://localhost:8000/blog/comment?id=postId
Router.put("/comment",Middleware,AddComment)

// defining the Comment route Handles GET request
//  url http://localhost:8000/blog/allBlog
Router.get("/allBlog",Middleware,GetAllBlogs)


// defining the get particular blog based on id which handles GET request
// url http://localhost:8000/blog/getBlog/blogId
Router.get("/getBlog/:id",Middleware,GetBlog)
module.exports = { Router };
