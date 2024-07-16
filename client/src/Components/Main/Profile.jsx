import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUserInfoApiCall } from "../../Redux/Actions/UserProfileAction";
import Loader from "../../helperComponents/Loader";
import UserLogic from "../../Logic/UserLogic";
import { useNavigate } from "react-router-dom";
import ProfleBlog from "../../helperComponents/ProfleBlog";
const Profile = () => {
  const Navigate = useNavigate();
  const { GetIframeColor, GetUserIcon } = UserLogic();
  const Dispatch = useDispatch();
  const { ProfileData, ProfileLoading } = useSelector(
    (state) => state.UserInfo
  );

  //   profile info state
  const [ProfileInfo, setProfileInfo] = useState();
  //   profle iFrame color
  const [ProfileColor, setProfileColor] = useState();
  //   profle iframe
  const [ProfileIframe, setProfileInframe] = useState();

  useEffect(() => {
    // calling the get profile api
    Dispatch(GetUserInfoApiCall());
  }, [Dispatch]);

  useEffect(() => {
    setProfileInfo(ProfileData);
    let name = `${ProfileData?.first_name} ${ProfileData?.last_name}`;
    // setting the Iframe of the profile if profile src is not availabe
    setProfileInframe(GetUserIcon(name));
    // setting the Profile iFrame color
    setProfileColor(GetIframeColor(name[0]));
  }, [ProfileData]);
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
            <button className="w-40 h-10 mt-4 font-medium hover:bg-blue-500 bg-blue-300 rounded-md">
              Edit Profile
            </button>
          </div>
          <div>
            {ProfileInfo?.profleSrc ? (
              <img
                className="w-24 h-24 rounded-md bg-slate-500"
                src={ProfileInfo?.profleSrc}
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
      {ProfileLoading && <Loader />}
    </div>
  );
};
export default Profile;
