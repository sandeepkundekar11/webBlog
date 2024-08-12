const AsyncHandler = require("express-async-handler")
const { BlogModel } = require("../Model/BlogModel")
const { CommentModel } = require("../Model/CommentModel")
const { userModel } = require("../Model/UserModel")
const fs = require("fs")
const path = require("path")

const DeleteAccount = AsyncHandler(async (req, res) => {
    try {
        // removing the userProfile image if exist
        let userProfileImage = await userModel.findOne({ _id: req.userId })
        let ProfileImageName = userProfileImage.profileSrc?.split("/")[3]
        let profileImagPath = path.join(__dirname, `../Storage/Profiles/${ProfileImageName}`)
        if (fs.existsSync(profileImagPath)) {
            try {
                fs.unlinkSync(profileImagPath)
            } catch (error) {
                console.log(error, "error while deleting profile image")
            }
        }
        // delete user
        let DeleteUser = await userModel.deleteOne({ _id: req.userId })

        // finding all the blogs images and deleting 
        let BlogImages = await BlogModel.find({ author: req.userId })
        BlogImages.forEach((ele) => {
            let image = ele.image
            //  getting the Image name
            let ImageName = image?.split("/")[3]
            //  generating Image path
            let imagePath = path.join(__dirname, `../Storage/blogUploads/${ImageName}`)
            try {
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath)
                }
            } catch (error) {
                console.log(error, "error occured while deleting imag")
            }
        })

        // delete blog
        let DeleteBlog = await BlogModel.deleteMany({ author: req.userId })
        //  Delete All comment
        // First, find all comments made by this user
        let CommentedBlog = await CommentModel.find({ author: req.userId });

        // Remove these comments from the respective blogs
        let DeleteAllCommentsFromBlogs = await Promise.all(
            CommentedBlog.map(async (ele) => {
                await BlogModel.updateOne(
                    {
                        comments: {
                            $in:[ele._id]
                        }
                    },  // Assuming `blogId` is a field in CommentModel that references the blog
                    {
                        $pull: {
                            comments:ele._id  // Remove the comment by its ID
                        }
                    }
                );
            })
        );

        let UserCommentId = await CommentModel.find({ author: req.userId })
        // remove that comments from others blog

        // remove ALL the comments of that user
        let removeAllComments = await CommentModel.deleteMany({ author: req.userId })

        // finding the blog to which this user has liked
        let LikedByUser = await BlogModel.find({
            likes: {
                $in: [req.userId]
            }
        })

        // now removing that likes from that blog
        let RemoveAllLikes = await Promise.all(
            LikedByUser.map(async (ele) => {
                await BlogModel.updateOne(
                    { _id: ele?.id },
                    {
                        $pull: {
                            likes: req.userId
                        }
                    }
                )
            })
        )
        // now finding the to whom he is following and followed by other persons
        // Find users who are either followed by or following the user
        let followedAndFollowingUsers = await userModel.find({
            $or: [
                { followers: { $in: [req.userId] } },
                { followings: { $in: [req.userId] } }
            ]
        });

        // Removing this userId from all users' followers and followings lists
        let removeFollowAndFollowings = await Promise.all(
            followedAndFollowingUsers.map(async (user) => {
                await userModel.updateOne(
                    { _id: user._id },
                    {
                        $pull: {
                            followers: req.userId,
                            followings: req.userId
                        }
                    }
                );
            })
        );




        res.json({ message: "User Deleted Permanentaly" })


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while deleting the account" });
    }
})

module.exports = { DeleteAccount }