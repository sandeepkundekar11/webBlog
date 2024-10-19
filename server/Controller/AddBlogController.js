const asyncHandler = require("express-async-handler");
const { BlogModel } = require("../Model/BlogModel");
const { userModel } = require("../Model/UserModel");
const AddBlogController = asyncHandler(async (req, res) => {
  // getting the blog info from the request
  let { heading, categories, content, image } = req.body;

  try {
    //   checking that any required filed is empty or  not
    if (!heading || !categories || !content) {
      res.json({ message: "please enter all details" });
    } else {
      // regex expressing for all brackets
      const regex = /[\[\]\{\}]/g;
      // it will split the give string array by comma and store in array
      // bellow logic will convert "[a,b,c]" to [a,b,c]and store in Categories array in database
      let categoriesArr = categories.split(",").map((ele) => {
        return ele.replace(regex, "");
      });

      // storing or create new Blog in the data base
      let blog = await BlogModel.create({
        // get the userId from authentication  middleware
        author: req.userId,
        image: req?.file?.filename
          ? `${process.env.BASE_URL}/${req.file.filename}`
          : null,
        heading,
        content,
        categories: categoriesArr,
      });

      // if blog is added successfully  then  push the Blog Id into the User blog filed
      if (blog) {
        // get the userId from authentication  middleware
        let user = await userModel.updateOne(
          { _id: req.userId },
          {
            $push: {
              blogs: blog._id,
            },
          }
        );

        // after adding the blog id in to UserModel then return successful message
        if (user) {
          res.json({
            message: "Blog added successfully",
            blog_id: blog._id,
          });
        }
      }
    }
  } catch (error) {
    // if some error occurs the prompt an error message
    res.json({ message: error.message });
  }
});

module.exports = { AddBlogController };
