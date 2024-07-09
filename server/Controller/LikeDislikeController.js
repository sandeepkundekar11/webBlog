const AsyncHandler = require("express-async-handler");
const { BlogModel } = require("../Model/BlogModel");

const LikeDislike = AsyncHandler(async (req, res) => {
  // getting the perticular blog Id which we want to like
  let Blog_id = req.params.id;
  try {
    // checking that does user already liked the post or not
    //  this we are checking using the mongodb and operation
    let UserLiked = await BlogModel.findOne({
      $and: [{ _id: Blog_id }, { likes: { $in: [req.userId] } }],
    });

    // if user already liked then we are removing that userId from that Liked post (unliking the post)
    if (UserLiked) {
      let UnlikePost = await BlogModel.updateOne(
        { _id: Blog_id },
        {
          $pull: {
            likes: req.userId,
          },
        }
      );

      UnlikePost && res.json({ message: "Post is disliked" });
    } else {
      // if user has not liked the post then we are pushing that user id in to the Post likes array ( liking the post)
      let LikePost = await BlogModel.updateOne(
        { _id: Blog_id },
        {
          $push: {
            likes: req.userId,
          },
        }
      );

      LikePost && res.json({ message: "Post is liked" });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
});
module.exports = { LikeDislike };
