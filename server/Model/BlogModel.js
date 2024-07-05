const mongoose = require("mongoose")

// creating the blog schema
const BlogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel"  // refers the user model "userModel"
    },
    image: String,
    heading: String,
    categories: [String],
    content: String,
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel"   // refers the user model "userModel"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CommentModel"   // refers the Comment model "CommentModel"
    }]
})

// creating the Blog model
const BlogModel = mongoose.model("blog", BlogSchema)
module.exports = { BlogModel }