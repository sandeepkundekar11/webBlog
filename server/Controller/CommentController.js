const AsyncHandler = require("express-async-handler");
const { CommentModel } = require("../Model/CommentModel");
const { BlogModel } = require("../Model/BlogModel");
const AddComment = AsyncHandler(async (req, res) => {
  // form query getting blog id which we are commenting
  let BlogId = req.query.id;
  // getting the comment content
  let { content } = req.body;
  try {
    if (!content) {
      // if content is not provided throw an error message
      res.json({ message: "please enter all details" });
    } else {
      // creating new comment in comment model
      let comment = await CommentModel.create({
        author: req.userId,
        content: content,
      });

      if (comment) {
        // pushing that comment Id in to the blog comments array
        let blog = await BlogModel.updateOne(
          { _id: BlogId },
          {
            $push: { comments: comment._id },
          }
        );
        
        if (blog) {
          // success message
          res.json({ message: "Commented successfully" });
        }
      }
    }
  } catch (error) {
    // if something went wrong then prompt this message
    res.json({ error: error.message });
  }
});

module.exports = { AddComment };
