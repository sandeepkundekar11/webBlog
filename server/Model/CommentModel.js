const mongoose = require("mongoose")
// creating the Comment Schema
const CommentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel"  // refers the user model "userModel"
    },
    content: String
})

// creating the comment model
const CommentModel = mongoose.model("comment", CommentSchema)
module.exports = { CommentModel }