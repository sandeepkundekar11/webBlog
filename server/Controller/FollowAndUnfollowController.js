const AsyncHandler = require("express-async-handler")
const { userModel } = require("../Model/UserModel")

const FollowUnFollow = AsyncHandler(async (req, res) => {
    // getting the user Id who is going to follow
    let userIdGoingToFollow = req.params.followerId
    let userGetFollow = req.params.userId

    let userName = await userModel.findOne({ _id: userGetFollow })
    try {
        // checking that user is already following or not
        let userAlreadyFollowed = await userModel.findOne({
            _id: userGetFollow, followers: {
                $in: [userIdGoingToFollow]
            }
        })

        // if user is not following then follow
        if (!userAlreadyFollowed) {
            // in the present users followers array we are pushing userDoing to follow id
            let Follow = await userModel.updateOne({ _id: userGetFollow }, {
                $push: {
                    followers: userIdGoingToFollow
                }
            })
            // and in userDoing to follow users followings array we are pushing present user Id
            let FollowedUser = await userModel.updateOne({ _id: userIdGoingToFollow }, {
                $push: {
                    followings: userGetFollow
                }
            })
            if (Follow && FollowedUser) {
                res.json({ message: `Following ${userName.first_name} ${userName.last_name}` })
            }
        }
        else {
            // unfollowing the user
            let unFollow = await userModel.updateOne({ _id: userGetFollow }, {
                $pull: {
                    followers: userIdGoingToFollow
                }
            })

            // removing the followed user id from followers "Followers" array
            let unFollowedUser = await userModel.updateOne({ _id: userIdGoingToFollow }, {
                $pull: {
                    followings: userGetFollow
                }
            })


            if (unFollow && unFollowedUser) {
                res.json({ message: `UnFollowed to ${userName.first_name} ${userName.last_name}` })
            }

        }
    } catch (error) {
        res.json({ message: error.message })
    }
})

module.exports = { FollowUnFollow }