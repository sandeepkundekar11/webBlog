import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DeleteProfilePopup from "../../helperComponents/DeleteProfilePopup";
import Loader from "../../helperComponents/Loader";
import ProfleBlog from "../../helperComponents/ProfleBlog";
import ToasterLogic from "../../Logic/ToasterLogic";
import UserLogic from "../../Logic/UserLogic";
import { followUnfollowApiCall } from "../../Redux/Actions/FollowAndUnfollowAction";
import { getProfileImageApiCall } from "../../Redux/Actions/ProfileImageAction";
import { updateProfileApiCall } from "../../Redux/Actions/UpdateProfileAction";
import { GetUserInfoApiCall } from "../../Redux/Actions/UserProfileAction";
import ProfileSkeleton from "../SkeletonComponents/ProfileSkeleton";
import UpdateProfilePopup from "../UpdateprofilePopup";
const Profile = () => {
  // delete user states
  const { deleteUserLoading } = useSelector((state) => state.DeleteUser)
  const { userId } = useParams()
  // update profile message
  const { UpdateProfileMessage, UpdateProfileLoading } = useSelector(
    (state) => state.UpdateProfile
  );
  //follow unfollow message
  const { FollowInfollowMessage, FollowUnfollowLoading } = useSelector((state) => state.followUnfollow)
  const { successToaster } = ToasterLogic();
  const Navigate = useNavigate();
  const [showUpdatePopup, setshowUpadtePopup] = useState(false);
  const { GetIframeColor, GetUserIcon } = UserLogic();
  const Dispatch = useDispatch();
  const { ProfileData, ProfileLoading } = useSelector(
    (state) => state.UserInfo
  );

  // present user is author of this profile
  const [presentUser, setPresentUser] = useState()

  //   profile info state
  const [ProfileInfo, setProfileInfo] = useState();
  //   profile iFrame color
  const [ProfileColor, setProfileColor] = useState();
  //   profile iframe
  const [ProfileIframe, setProfileIframe] = useState();

  useEffect(() => {
    // calling the get profile api
    Dispatch(GetUserInfoApiCall(userId, Navigate));
  }, [Dispatch, userId]);

  useEffect(() => {
    setProfileInfo(ProfileData);
    let name = `${ProfileData?.first_name} ${ProfileData?.last_name}`;
    // setting the Iframe of the profile if profile src is not availabe
    setProfileIframe(GetUserIcon(name));
    // setting the Profile iFrame color
    setProfileColor(GetIframeColor(name[0]));
  }, [ProfileData]);


  // checking present user id author of this account

  useEffect(() => {
    let localAuthorUserId = JSON.parse(localStorage.getItem("user"))?._id
    if (localAuthorUserId === userId) {
      setPresentUser(true)
    }
    else {
      setPresentUser(false)
    }

  }, [userId])

  // update profile fucntion
  const UpdateProfile = (updatedData) => {
    let formData = new FormData();
    formData.append("first_name", updatedData?.first_name);
    formData.append("last_name", updatedData?.last_name);
    formData.append("email", updatedData?.email);
    formData.append("bio", updatedData?.bio);
    formData.append("profile", updatedData?.profileSrc);

    Dispatch(updateProfileApiCall(formData, successToaster));
    // calling the get profile api

    setshowUpadtePopup(false);
    setTimeout(() => {
      Dispatch(GetUserInfoApiCall(userId, Navigate));
      Dispatch(getProfileImageApiCall())
    }, 1000);
  };


  // follow unfollow logic


  const followUnfollow = () => {
    let followerId = JSON.parse(localStorage.getItem("user"))?._id
    Dispatch(followUnfollowApiCall(followerId, userId, successToaster))
    setTimeout(() => {
      Dispatch(GetUserInfoApiCall(userId, Navigate));
    }, 500);
  }


  if(UpdateProfileLoading || FollowUnfollowLoading || deleteUserLoading || ProfileData===null )
  {
    return(
      <ProfileSkeleton/>
    )
  }

  return (
    <div className="pt-20 w-full h-full">
      <div className="xl:w-2/4 md:w-4/5 w-11/12 m-auto">
        <h1 className="md:text-3xl text-2xl w-full border-b-2 border-slate-300 pb-5 font-bold">
          {
            presentUser ? "    My Profile Information" : "Profile Information"
          }

        </h1>
        {/* profile section */}
        <div className="w-full pt-3 flex sm:flex-row flex-col-reverse ">
          <div className="w-full">
            {/* profile Follow Unfollow section */}

            <div className="followSection w-4/5 flex flex-col justify-center">
              <div className="followUnfollowSection flex justify-between">
                {/* total posts */}
                <div className="w-24 h-16 flex flex-col justify-center items-center">
                  <p className=" text-lg font-semibold">{ProfileInfo?.blogs.length}</p>
                  <p className=" text-lg font-semibold">Posts</p>
                </div>
                {/* Total Followers */}
                <div className="w-24 h-16 flex flex-col justify-center items-center hover:bg-slate-50 rounded-lg" onClick={() => {
                  // navigating to the follower list
                  Navigate(`/followers/${userId}`)
                }
                }>
                  <p className=" text-lg font-semibold">{ProfileInfo?.followers.length}</p>
                  <p className=" text-lg font-semibold cursor-pointer" >Followers</p>
                </div>
                {/* total following  */}
                <div className="w-24 h-16 flex flex-col justify-center items-center hover:bg-slate-50 rounded-lg" onClick={() => {
                  // navigating to the follower list
                  Navigate(`/followers/${userId}`)
                }
                }>
                  <p className=" text-lg font-semibold">{ProfileInfo?.followings.length}</p>
                  <p className=" text-lg font-semibold cursor-pointer">Following</p>
                </div>
              </div>

              {

                !presentUser && <>
                  {
                    // checking that present user as followed or not 
                    ProfileInfo?.followers?.includes(JSON.parse(localStorage.getItem("user"))?._id)
                      ?
                      <button className="unfollowButton  w-full m-auto bg-blue-200 font-medium rounded-md shadow-sm border h-9 mt-4" onClick={followUnfollow}>Following</button>
                      :
                      <button className="followButton  w-full m-auto bg-blue-500 rounded-md shadow-md h-9 mt-4" onClick={followUnfollow}>Follow</button>
                  }

                </>
              }

            </div>
            {/* profile info */}
            <div className="flex font-medium text-lg name text-gray-600 mt-4">
              <h1 className="text-black font-medium">Name :</h1>
              <p className="ml-2">{`${ProfileInfo?.first_name} ${ProfileInfo?.last_name}`}</p>
            </div>

            <div className="flex font-medium text-lg email mt-4 text-gray-600">
              <h1 className="text-black font-medium">email :</h1>
              <p className="ml-2">{ProfileInfo?.email}</p>
            </div>

            <div className=" font-medium text-lg email mt-4 text-gray-600">
              <h1 className="text-black font-medium">Bio :</h1>
              <p className="text-base">
                {ProfileInfo?.bio ? ProfileInfo?.bio : "Bio not added yet"}
              </p>
            </div>


            {/* edit profile section */}

            {
              presentUser && <button
                className="w-40 h-10 mt-4 font-medium hover:bg-blue-500 bg-blue-300 rounded-md"
                onClick={() => {
                  setshowUpadtePopup(true);
                }}
              >
                Edit Profile
              </button>
            }

            {/* delete profile Popup */}
            {
              presentUser && <DeleteProfilePopup text={"Delete Account"} />
            }
          </div>
          <div>
            {ProfileInfo?.profileSrc ? (
              <img
                className="w-28 h-28 rounded-md bg-slate-500"
                src={ProfileInfo?.profileSrc}
                alt=""
              />
            ) : (
              <div
                style={{ backgroundColor: ProfileColor }}
                className="w-28 h-28 rounded-md bg-slate-500 font-semibold flex justify-center items-center text-3xl"
              >
                {ProfileIframe?.toUpperCase()}
              </div>
            )}
          </div>
        </div>

        {/* available blog section */}

        <div className="mt-6">
          <h1 className="text-2xl font-bold pb-4 border-b-2 border-slate-300">
            My Posts
          </h1>
          <div className="mt-4 flex flex-wrap">
            {ProfileData?.blogs.length > 0 ? (
              ProfileData?.blogs?.map((ele, index) => {
                return (
                  <ProfleBlog
                    key={index}
                    heading={ele?.heading}
                    content={ele?.content}
                    viewBlog={() => {
                      Navigate(`/viewblog/${ele._id}`);
                    }}
                    imageSrc={ele?.image}
                    commentCount={ele?.comments.length}
                    likeCount={ele?.likes.length}
                  />
                );
              })
            ) : (
              <div className="m-auto">
                <h1 className="text-center text-gray-700 text-2xl font-bold ">
                  No Blogs Available
                </h1>

                {
                  presentUser && <button
                    className="text-lg font-medium text-white bg-blue-500 rounded-md shadow-md w-32 h-9 mt-4 m-auto hover:bg-blue-600"
                    onClick={() => {
                      Navigate("/addblog");
                    }}
                  >
                    Add Blog
                  </button>
                }

              </div>
            )}
          </div>
        </div>
      </div>
      {(UpdateProfileLoading || FollowUnfollowLoading || deleteUserLoading) && <Loader />}

      {/* update profile popup */}
      {showUpdatePopup && (
        <UpdateProfilePopup
          key={Date.now()}
          cancel={() => {
            setshowUpadtePopup(false);
          }}
          Update={UpdateProfile}
          profileData={{
            profileSrc: ProfileData?.profileSrc,
            first_name: ProfileData?.first_name,
            last_name: ProfileData?.last_name,
            email: ProfileData?.email,
            bio: ProfileData?.bio,
          }}
        />
      )}
    </div>
  );
};
export default Profile;
