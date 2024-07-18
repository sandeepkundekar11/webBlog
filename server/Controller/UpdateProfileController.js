const AsyncHandler = require("express-async-handler");
const { userModel } = require("../Model/UserModel");
const fs = require("fs");
const path = require("path");

const UpdateProfile = AsyncHandler(async (req, res) => {
  let { first_name, last_name, bio, email, profile } = req.body;

  try {
    // let fileName = req.body.profile.split("/")[3];
    // console.log(fileName);
    let presentUser = await userModel;

    if (profile === null || profile === "" || profile === "null") {
      // If profile is null, empty, or the string 'null', update profileSrc to null
      await userModel.updateOne(
        { _id: req.userId },
        { $set: { profileSrc: null } }
      );
      let presentUser = await userModel.findOne({ _id: req.userId });
      let ProfileImageToBeDelete = presentUser.profileSrc;
      let fileName = ProfileImageToBeDelete.split("/")[3];
      let FilePath = path.join(__dirname, `../Storage/Profiles/${fileName}`);
      try {
        fs.unlinkSync(FilePath);
      } catch (error) {
        res.json({ message: error });
      }
    }

    // Determine the new profileSrc if a new file was uploaded
    const profileSrc = req.file
      ? `http://localhost:8000/${req.file.filename}`
      : profile;
    let user = await userModel.updateOne(
      { _id: req.userId },
      {
        $set: {
          first_name,
          last_name,
          bio,
          email,
          profileSrc,
        },
      }
    );
    user && res.json({ message: "user is updated succesfully" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = { UpdateProfile };
