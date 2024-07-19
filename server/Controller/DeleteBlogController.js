const AsyncHandler = require("express-async-handler");
const { BlogModel } = require("../Model/BlogModel");
const { userModel } = require("../Model/UserModel");
const { CommentModel } = require("../Model/CommentModel");
const fs = require("fs");
const path = require("path");

const DeleteBlog = AsyncHandler(async (req, res) => {
  // getting the blog id which we want to delete
  let BlogId = req.params.blogId;
  try {
    // checking that the present user exist that blog which i want to delete
    let BlogExistInUser = await userModel.findOne({
      _id: req.userId,
      blogs: {
        $in: [BlogId],
      },
    });

    if (BlogExistInUser) {
      // removing that Image of that from file system

      let blog = await BlogModel.findOne({ _id: BlogId }); //gettig that blog
      if (blog.image) {
        let ImageName = blog.image?.split("/")[3]; // separating that imageName from url http://localhost:8000/{imageName}
        let imagePath = path.join(
          __dirname,
          `../Storage/blogUploads/${ImageName}`
        ); // getting that perticular image path
        console.log(imagePath);
        try {
          fs.unlinkSync(imagePath); // deleting that image
        } catch (error) {
          return res.status(500).json({ message: "Error deleting image" });
        }
      }

      // removing all the comment which we have commented on blog to be deleted
      let AllComment = await BlogModel.findOne({ _id: BlogId }, "comments"); // getting all comments of that blog
      await Promise.all(
        // and removing one by one
        AllComment.comments.map(async (id) => {
          await CommentModel.deleteOne({ _id: id });
        })
      );

      // deleting that blog from  userModel
      let user = await userModel.updateOne(
        // removing that blogid from userModel blogs array
        { _id: req.userId },
        {
          $pull: {
            blogs: BlogId,
          },
        }
      );

      // deleting that blog from  BlogModel
      let DeletedBlog = await BlogModel.deleteOne({ _id: BlogId });
      res.json({ message: "blog deleted successfully" });
    } else {
      res.json({
        message: "User is not authorized to delete this blog",
      });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = { DeleteBlog };
