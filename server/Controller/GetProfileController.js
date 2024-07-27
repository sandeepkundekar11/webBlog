const AsyncHandler = require("express-async-handler");
const { userModel } = require("../Model/UserModel");
const { BlogModel } = require("../Model/BlogModel");

const GetprofileInfo = AsyncHandler(async (req, res) => {
  let userId=req.params.userId
  try {
    let profile = await userModel.findOne({ _id: userId }).populate({
      path: "blogs",
      model: BlogModel,
    });
    res.json({ profile: profile });
  } catch (error) {
    res.json({ error: error });
  }
});
module.exports = { GetprofileInfo };
