import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import FollowComponent from "../../helperComponents/FollowComponent"
import Loader from "../../helperComponents/Loader"
import ToasterLogic from "../../Logic/ToasterLogic"
import UserLogic from "../../Logic/UserLogic"
import { followUnfollowApiCall } from "../../Redux/Actions/FollowAndUnfollowAction"
import { GetFollowingFollowersApiCall } from "../../Redux/Actions/GetFollowingAndFollower"
import { GetUserInfoApiCall } from "../../Redux/Actions/UserProfileAction"
const FollowersList = () => {
    const { successToaster } = ToasterLogic()
    const { GetIframeColor, GetUserIcon } = UserLogic();
    const { userId } = useParams()
    //   profile info state
    const [ProfileInfo, setProfileInfo] = useState();
    const [FollowingFollowerData, setFollowingFollowerData] = useState()
    // type 
    const [SelectedType, setSelectedType] = useState("Followers")
    // get userData api data
    const { ProfileData, ProfileLoading } = useSelector(
        (state) => state.UserInfo
    );

    // getting the follower and following user list
    const { followingFollowerData, followingFollowerLoading } = useSelector((state) => state.getFollowingFollowerList)
    //follow unfollow message
    const { FollowInfollowMessage, FollowUnfollowLoading } = useSelector((state) => state.followUnfollow)
    const Dispatch = useDispatch()

    //   profile iFrame color
    const [ProfileColor, setProfileColor] = useState();
    //   profile iframe
    const [ProfileIframe, setProfileIframe] = useState();
    useEffect(() => {
        setProfileInfo(ProfileData);
        let name = `${ProfileData?.first_name} ${ProfileData?.last_name}`;
        // setting the Iframe of the profile if profile src is not availabe
        setProfileIframe(GetUserIcon(name));
        // setting the Profile iFrame color
        setProfileColor(GetIframeColor(name[0]));
    }, [ProfileData]);

    useEffect(() => {
        setFollowingFollowerData(followingFollowerData)
    }, [followingFollowerData])

    useEffect(() => {
        // calling the get profile api
        Dispatch(GetUserInfoApiCall(userId));
        // calling the getFollowing and followers data
        Dispatch(GetFollowingFollowersApiCall(userId))
    }, [Dispatch]);

    // following and unfollowing the user 
    const FollowUnfollow = (personToFollowUserId) => {
        let followerId = JSON.parse(localStorage.getItem("user"))?._id
        Dispatch(followUnfollowApiCall(followerId, personToFollowUserId, successToaster))
        setTimeout(() => {
            // calling the get profile api
            Dispatch(GetUserInfoApiCall(userId));
            // calling the getFollowing and followers data
            Dispatch(GetFollowingFollowersApiCall(userId))
        }, 500);
    }
    return (
        <div className="m-auto w-full md:w-3/4 pt-20">
            <div className="overflow-hidden rounded-lg bg-white shadow-lg">
                <div className="border-b p-6">
                    <div className="flex items-center">
                        <div className="mr-4 h-14 w-14">
                            {
                                ProfileInfo?.profileSrc ? <img src={ProfileInfo?.profileSrc} alt="User" className="h-full bg-slate-500 w-full rounded-full" /> :
                                    <div style={{ backgroundColor: ProfileColor }} className="h-full flex justify-center items-center text-2xl font-medium capitalize bg-slate-500 w-full rounded-full">
                                        {ProfileIframe?.toUpperCase()}
                                    </div>
                            }

                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">{`${ProfileInfo?.first_name} ${ProfileInfo?.last_name}`}</h2>
                            <div className="text-sm text-gray-500"><span className="font-medium">{ProfileInfo?.followers.length}</span> Followers &bull; <span className="font-medium">{ProfileInfo?.followings.length}</span> Following</div>
                        </div>
                    </div>
                </div>
                <div className="border-b">
                    {/* followers and unfollowers button */}
                    <div className="flex">
                        <button className={`flex-1 border-b-2  p-4 text-center ${SelectedType === "Followers" && "border-blue-500 bg-blue-100"}`} onClick={() => {
                            setSelectedType("Followers")
                        }}>Followers</button>
                        <button className={`flex-1 border-b-2  p-4 text-center ${SelectedType === "Following" && "border-blue-500  bg-blue-100"}`} onClick={() => {
                            setSelectedType("Following")
                        }
                        }>Following</button>
                    </div>
                </div>

                <div className="flex w-full">
                    <div className="followersAndFollower md:w-2/4 w-11/12">
                        <FollowComponent key={Date.now()} userArray={SelectedType === "Followers" ? FollowingFollowerData?.followers : FollowingFollowerData?.followings}
                            followUnfollow={FollowUnfollow} />
                    </div>
                    {/*  */}
                </div>
            </div>

            {/* loaders */}
            {
                (ProfileLoading || followingFollowerLoading || FollowUnfollowLoading) && <Loader />
            }
        </div>
    )
}

export default FollowersList