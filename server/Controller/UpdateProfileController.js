const AsyncHandler = require("express-async-handler");
const { userModel } = require("../Model/UserModel");
const fs = require("fs");
const path = require("path");

const UpdateProfile = AsyncHandler(async (req, res) => {
  let { first_name, last_name, bio, email, profile } = req.body;

  try {
    // Fetch the current user data
    let presentUser = await userModel.findOne({ _id: req.userId });

    // Determine the new profileSrc if a new file was uploaded
    const profileSrc = req.file
      ? `http://localhost:8000/${req.file.filename}`
      : profile;

    // If profile is null, empty, or the string 'null', update profileSrc to null
    if (profile === null || profile === "" || profile === "null") {
      await userModel.updateOne(
        { _id: req.userId },
        { $set: { profileSrc: null } }
      );
      
      // If there's an old profile image, delete it
      if (presentUser.profileSrc) {
        let ProfileImageToBeDelete = presentUser.profileSrc.split("/")[3];
        let FilePath = path.join(__dirname, `../Storage/Profiles/${ProfileImageToBeDelete}`);
        console.log(ProfileImageToBeDelete);
        try {
          fs.unlinkSync(FilePath);
        } catch (error) {
          return res.json({ message: error.message });
        }
      }
    }

    // Update the user's profile information
    let user = await userModel.updateOne(
      { _id: req.userId },
      {
        $set: {
          first_name,
          last_name,
          bio,
          email,
          profileSrc: profile === null || profile === "" || profile === "null" ? null : profileSrc,
        },
      }
    );

    if (user) {
      res.json({ message: "User is updated successfully" });
    } else {
      res.json({ message: "Failed to update user" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }


});

module.exports = { UpdateProfile };
