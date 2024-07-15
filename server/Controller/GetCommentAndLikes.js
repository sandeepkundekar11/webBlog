const AsyncHandler = require("express-async-handler");
const { CommentModel } = require("../Model/CommentModel");
const { BlogModel } = require("../Model/BlogModel");
const { userModel } = require("../Model/UserModel");

const GetCommentsAndLikes = AsyncHandler(async (req, res) => {
  // getting the Type of the api "comments" or "likes"
  const { type } = req.body;
  try {
    // if type is not provided then throw an error
    if (!type) {
      res.json({ message: "provide the type" });
    } else {
      //   if type is "comments" then return only  comments
      if (type === "comments") {
        let comments = await BlogModel.findOne(
          { _id: req.params.blogId },
          "comments"
        ).populate({
          path: "comments",
          model: CommentModel,
          populate: {
            path: "author",
            model: userModel,
          },
        });
        res.json({ comments: comments.comments });
      }
      // if  type is "likes" then return only likes
      else if (type === "likes") {
        let likes = await BlogModel.findOne(
          { _id: req.params.blogId },
          "likes"
        ).populate({
          path: "likes",
          model: userModel,
        });

        res.json({ likes: likes.likes });
      }
      //  if type is other then "comments" and "likes" then this error will prompted
      else {
        res.json({ message: "type is not valid" });
      }
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = { GetCommentsAndLikes };
