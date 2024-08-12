const AsyncHandler = require("express-async-handler")
const { CommentModel } = require("../Model/CommentModel")
const { BlogModel } = require("../Model/BlogModel")

const DeleteComment = AsyncHandler(async (req, res) => {

    try {
        let CommentId = req.query.CommentId
        let BlogId = req.query.BlogId
        // delete the blog from the Comment model
        let DeleteUserComment = await CommentModel.deleteOne({ _id: CommentId })

        // delete the comments from Blog comment section\
        let DeleteBlogComment = await BlogModel.updateOne({ _id: BlogId }, {
            $pull: {
                comments: CommentId
            }
        })

        if (DeleteUserComment.deletedCount === 1 && DeleteBlogComment.modifiedCount === 1) {
            res.json({ message: "comment Deleted successfully" })
        }
        else {
            res.json({ message: "comment not deleted" })
        }

    } catch (error) {
        res.json({ message: error.message })
    }
})

module.exports = { DeleteComment }