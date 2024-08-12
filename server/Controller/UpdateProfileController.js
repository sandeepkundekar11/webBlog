const AsyncHandler = require("express-async-handler");
const { userModel } = require("../Model/UserModel");
const fs = require("fs");
const path = require("path");

const UpdateProfile = AsyncHandler(async (req, res) => {
  let { first_name, last_name, bio, email, profile } = req.body;

  try {
    console.log(profile)
    // Fetch the current user data
    let presentUser = await userModel.findOne({ _id: req.userId });

    // Determine the new profileSrc if a new file was uploaded
    const profileSrc = req.file
      ? `${process.env.BASE_URL}/${req.file.filename}`
      : profile;
    // when we are upading the image that time till will remove previous image if it is present
    if (presentUser.profileSrc !== profileSrc && presentUser.profileSrc && profileSrc!=="null" && profileSrc!==null && profileSrc!==undefined &&profileSrc!=="undefined" ) {
      let imagePath = presentUser.profileSrc.split("/")[3];
      let imagefilePath = path.join(
        __dirname,
        `../Storage/Profiles/${imagePath}`
      );
      try {
        fs.unlinkSync(imagefilePath);
      } catch (error) {
        return res.json({ message: error.message });
      }
    }

    if (profile === null || profile === "" || profile === "null") {
      // If profile is null, empty, or the string 'null', update profileSrc to null
      await userModel.updateOne(
        { _id: req.userId },
        { $set: { profileSrc: null } }
      );

      // If there's an old profile image, delete it
      if (
        presentUser.profileSrc &&
        fs.existsSync(
          path.join(
            __dirname,
            `../Storage/Profiles/${presentUser?.profileSrc?.split("/")[3]}`
          )
        )
        
      ) {
        let ProfileImageToBeDelete = presentUser.profileSrc.split("/")[3];
        let FilePath = path.join(
          __dirname,
          `../Storage/Profiles/${ProfileImageToBeDelete}`
        );
        try {
          fs.unlinkSync(FilePath);
        } catch (error) {
          console.log(error);
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
          profileSrc:
            profile === null || profile === "" || profile === "null" || profile==="undefined"
              ? null 
              : profileSrc,
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
