const AsyncHandler = require("express-async-handler")
const { userModel } = require("../Model/UserModel")


const GetAllFollowerAndFollowingList = AsyncHandler(async (req, res) => {
    let userID = req.params.userId
    try {
        let userFollowings = await userModel.findOne({ _id: userID }, "followings").populate({
            path: "followings",
            model: userModel
        })

        let userFollowers = await userModel.findOne({ _id: userID }, "followers").populate({
            path: "followers",
            model: userModel
        })

        res.json({ followers: userFollowers.followers, followings: userFollowings.followings })


    } catch (error) {
        res.json({ message: error.message })

    }
})

module.exports = { GetAllFollowerAndFollowingList }