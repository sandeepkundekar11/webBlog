const AsyncHandler = require("express-async-handler");
const { userModel } = require("../Model/UserModel");

const UpdateProfile = AsyncHandler(async (req, res) => {
  let { first_name, last_name, bio, email, profleSrc } = req.body;
  try {
    let user = await userModel.updateOne(
      { _id: req.userId },
      {
        $set: {
          first_name,
          last_name,
          bio,
          email,
          profleSrc: req?.file?.filename
            ? `http://localhost:8000/${req.file.filename}`
            : null,
        },
      }
    );
    user && res.json({ message: "user is updated succesfully" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = { UpdateProfile };
