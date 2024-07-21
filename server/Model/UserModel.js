const mongoose = require("mongoose");
// creating the user Schema

const userSchema = new mongoose.Schema({
  profileSrc: {
    type: String,
    require:true
  },
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: String,
  bio: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogModel", // refers blog model name "BlogModel"
    },
  ],
  followings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel"
    }
  ],

  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel"
    }
  ]
});

// creating the user model
const userModel = mongoose.model("user", userSchema);
module.exports = { userModel };
