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
const { GetCommentsAndLikes } = require("../Controller/GetCommentAndLikes");
const { GetprofileInfo } = require("../Controller/GetProfileController");
const { DeleteBlog } = require("../Controller/DeleteBlogController");
const { UpdateProfile } = require("../Controller/UpdateProfileController");
const { FollowUnFollow } = require("../Controller/FollowAndUnfollowController");
const { GetAllFollowerAndFollowingList } = require("../Controller/GetAllFollowersAndFollowingList");
const { UpdateBlog } = require("../Controller/UpdateBlogController");
const { DeleteComment } = require("../Controller/DeleteCommentController");
const { DeleteAccount } = require("../Controller/DeleteAccount");


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

// defining the multer for the adding post
let profileStore = multer.diskStorage({
  destination: (req, file, cb) => {
    const dirPath = path.join(__dirname, "../Storage/Profiles");
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    cb(null, dirPath);
  },

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const profileUpload = multer({
  storage: profileStore,
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
Router.put("/comment", Middleware, AddComment);

// defining the Comment route Handles GET request
//  url http://localhost:8000/blog/allBlog
Router.get("/allBlog", Middleware, GetAllBlogs);

// defining the get particular blog based on id which handles GET request
// url http://localhost:8000/blog/getBlog/{blogId}
Router.get("/getBlog/:id", Middleware, GetBlog);

// defining the get likes and comments route and Handles Get request
// url http://localhost:8000/blog/getCommentAndLikes/{blogId}
// if type parameter is "likes" then this api will return only likes
// if type parameter is "comments" the this api will return only comments
Router.post("/getCommentAndLikes/:blogId", Middleware, GetCommentsAndLikes);

// defining the Get profile info route which handles GET request
// url http://localhost:8000/blog/getProfile
Router.get("/getProfile/:userId", Middleware, GetprofileInfo);

// Defining the Delete blog  which handles Delete request
// url http://localhost:8000/blog/deleteBlog/{blogid}
Router.delete("/deleteBlog/:blogId", Middleware, DeleteBlog);

// Definging the update profile which handles PUT request
// url http://localhost:8000/blog/updeteProfile
Router.put(
  "/updeteProfile",
  Middleware,
  profileUpload.single("profile"),
  UpdateProfile
);


// Defining the Follow and unfollow which handles PUT request
// url http://localhost:8000/blog/followAndUnfollow/:followerId/:userId
// followerId="id of user who is going follow"
// userId ="id of user to whom follower is going to follow"
Router.put("/followAndUnfollow/:followerId/:userId", Middleware, FollowUnFollow)


// Defining the get follow and following list which Handles GET request
// url http://localhost:8000/blog/followingAndFollowersList/:userId
Router.get("/followingAndFollowersList/:userId", Middleware, GetAllFollowerAndFollowingList)


// defining the update method which handles PUT request
// url http://localhost:8000/blog/updateBlog/:id
Router.put("/updateBlog/:id", Middleware, blogUpload.single("blog"), UpdateBlog)

// defining the Delete Comment Api
// url http://localhost:8000/blog/DeleteComment?BlogId={blogId}&CommentId={CommentIdTOBeDelete}
Router.delete("/DeleteComment",Middleware,DeleteComment)

// Defining the api to delete the user
// url http://localhost:8000/blog/deleteProfile
Router.delete("/deleteProfile",Middleware,DeleteAccount)


module.exports = { Router };
