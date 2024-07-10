const AsyncHandler = require("express-async-handler")
const { BlogModel } = require("../Model/BlogModel")
const { userModel } = require("../Model/UserModel")
const { CommentModel } = require("../Model/CommentModel")

const GetAllBlogs = AsyncHandler(async (req, res) => {
    try {
        // getting all blogs from Blog model and populating Author filed
        let Blogs = await BlogModel.find().populate({
            path: "author",  // filed of blog schema
            model: userModel   // user model name
        })

        // returning the all blogs
        res.json({ blogs: Blogs })
    } catch (error) {
        res.json({ message: error.message })
    }
})

module.exports = { GetAllBlogs }