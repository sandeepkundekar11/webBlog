import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../helperComponents/Loader";
import ProfleBlog from "../../helperComponents/ProfleBlog";
import UserLogic from "../../Logic/UserLogic";
import { GetUserInfoApiCall } from "../../Redux/Actions/UserProfileAction";
import UpdateProfilePopup from "../UpdateprofilePopup";
import { updateProfileApiCall } from "../../Redux/Actions/UpdateProfileAction";
import ToasterLogic from "../../Logic/ToasterLogic";
const Profile = () => {
  // update profile message
  const { UpdateProfileMessage, UpdateProfileLoading } = useSelector(
    (state) => state.UpdateProfile
  );
  const { successToaster } = ToasterLogic();
  const Navigate = useNavigate();
  const [showUpdatePopup, setshowUpadtePopup] = useState(false);
  const { GetIframeColor, GetUserIcon } = UserLogic();
  const Dispatch = useDispatch();
  const { ProfileData, ProfileLoading } = useSelector(
    (state) => state.UserInfo
  );

  //   profile info state
  const [ProfileInfo, setProfileInfo] = useState();
  //   profile iFrame color
  const [ProfileColor, setProfileColor] = useState();
  //   profile iframe
  const [ProfileIframe, setProfileIframe] = useState();

  useEffect(() => {
    // calling the get profile api
    Dispatch(GetUserInfoApiCall());
  }, [Dispatch]);

  useEffect(() => {
    setProfileInfo(ProfileData);
    let name = `${ProfileData?.first_name} ${ProfileData?.last_name}`;
    // setting the Iframe of the profile if profile src is not availabe
    setProfileIframe(GetUserIcon(name));
    // setting the Profile iFrame color
    setProfileColor(GetIframeColor(name[0]));
  }, [ProfileData]);

  // update profile fucntion
  const UpdateProfile = (updatedData) => {
    let formData = new FormData();
    formData.append("first_name", updatedData?.first_name);
    formData.append("last_name", updatedData?.last_name);
    formData.append("email", updatedData?.email);
    formData.append("bio", updatedData?.bio);
    formData.append("profile", updatedData?.profileSrc);

    console.log(updatedData, "updatedData");

    Dispatch(updateProfileApiCall(formData, successToaster));
    // calling the get profile api

    setshowUpadtePopup(false);
    setTimeout(() => {
      Dispatch(GetUserInfoApiCall());
    }, 1000);
  };
  return (
    <div className="pt-20 w-full h-full">
      <div className="xl:w-2/4 md:w-4/5 w-11/12 m-auto">
        <h1 className="md:text-3xl text-2xl w-full border-b-2 border-slate-300 pb-5 font-bold">
          My Profile Information
        </h1>
        {/* profile section */}
        <div className="w-full pt-3 flex sm:flex-row flex-col-reverse ">
          <div className="w-full">
            <div className="flex font-medium text-lg name text-gray-600">
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
            <button
              className="w-40 h-10 mt-4 font-medium hover:bg-blue-500 bg-blue-300 rounded-md"
              onClick={() => {
                setshowUpadtePopup(true);
              }}
            >
              Edit Profile
            </button>
          </div>
          <div>
            {ProfileInfo?.profileSrc !== "null" ? (
              <img
                className="w-24 h-24 rounded-md bg-slate-500"
                src={ProfileInfo?.profileSrc}
                alt=""
              />
            ) : (
              <div
                style={{ backgroundColor: ProfileColor }}
                className="w-24 h-24 rounded-md bg-slate-500 font-semibold flex justify-center items-center text-3xl"
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
            {ProfileData?.blogs?.map((ele, index) => {
              return (
                <ProfleBlog
                  key={index}
                  heading={ele?.heading}
                  content={ele?.content}
                  viewBlog={() => {
                    Navigate(`/viewblog/${ele._id}`);
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
      {(ProfileLoading || UpdateProfileLoading) && <Loader />}

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
