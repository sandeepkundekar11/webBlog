const AsyncHandler = require("express-async-handler")
const { BlogModel } = require("../Model/BlogModel")
const { userModel } = require("../Model/UserModel")

const GetBlog = AsyncHandler(async (req, res) => {
    try {
        // if user has not provided the blog id then prompt an error message
        if (!req.params.id) {
            res.json({ message: "please provide the blog id" })
        }
        else {
            // return the particular blog based on and populating the author filed
            let Blog = await BlogModel.findOne({ _id: req.params.id }).populate({
                path: "author",
                model: userModel
            })
            res.json({ blog: Blog })
        }
    } catch (error) {
        // if any error occurs then return the error message
        res.json({ message: error.message })
    }
})

module.exports = { GetBlog }