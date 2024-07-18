import { useEffect, useRef, useState } from "react";
import PopupContainerProvider from "../helperComponents/PopupContainerProvider";
import UserLogic from "../Logic/UserLogic";

const UpdateProfilePopup = ({ profileData, Update, cancel }) => {
  const ProfileRef = useRef(null);
  const { GetIframeColor, GetUserIcon } = UserLogic();
  const [updateProfileData, setUpdateProfileData] = useState({
    profileSrc: null,
    first_name: "",
    last_name: "",
    email: "",
    bio: "",
  });
  const [ImageFile, setImageFile] = useState();
  const [ProfileImage, setProfileImage] = useState(null);
  // profile default iframe

  const [ProfileColor, setProfileColor] = useState();
  //   profile iframe
  const [ProfileIframe, setProfileIframe] = useState();

  // defining the upload profile function
  const uploadProfile = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    let profileUrl = URL.createObjectURL(file);
    setProfileImage(profileUrl);
    setUpdateProfileData((state) => {
      return {
        ...state,
        profileSrc: file,
      };
    });
  };
  // handling all input fileds
  const onHandelInputChange = (e) => {
    const { value, name } = e.target;
    setUpdateProfileData({
      ...updateProfileData,
      [name]: value,
    });
  };

  useEffect(() => {
    setUpdateProfileData({
      ...updateProfileData,
      profileSrc: ImageFile || profileData?.profileSrc,
      first_name: profileData?.first_name,
      last_name: profileData?.last_name,
      email: profileData?.email,
      bio: profileData?.bio,
    });
    let name = `${profileData?.first_name} ${profileData?.last_name}`;
    setProfileColor(GetIframeColor(name[0]));
    setProfileIframe(GetUserIcon(name));
  }, [profileData]);
  return (
    <PopupContainerProvider>
      <div className="updateProfilePopup p-3">
        <div className="profileImageContainer flex border-b-2 pb-2">
          {/* update profile image */}
          <div className="image w-2/4 flex justify-center">
            {/* profile image */}
            {updateProfileData?.profileSrc !== "null" || null ? (
              <img
                ref={ProfileRef}
                className="w-32 h-32 bg-slate-500 rounded-lg"
                src={ProfileImage || updateProfileData.profileSrc}
                alt=""
              />
            ) : (
              <div
                style={{ backgroundColor: ProfileColor }}
                className="w-32 h-32 bg-slate-500 rounded-lg text-3xl flex justify-center items-center font-semibold"
              >
                {ProfileIframe}
              </div>
            )}
          </div>
          <div className="ChangeProfileButton flex flex-col items-center h-2/4">
            <button className="w-36 rounded-3xl hover:bg-blue-100 relative hover:border-blue-500 shadow-md h-10 border-2">
              <p className="text-base text-gray-800 font-semibold">
                Change Photo
              </p>
              <input
                type="file"
                className="w-full h-full absolute top-0 left-0 opacity-5"
                onChange={uploadProfile}
              />
            </button>
            {updateProfileData?.profileSrc !== "null" && (
              <button
                className="w-36 rounded-3xl shadow-md h-10 hover:border-2 hover:border-red-500 border-gray-700 border mt-4"
                onClick={() => {
                  setUpdateProfileData((state) => {
                    return {
                      ...state,
                      profileSrc: null,
                    };
                  });
                  setProfileImage(null);

                  ProfileRef.current.value = null;
                }}
              >
                remove
              </button>
            )}
          </div>

          {/* update profile image ends */}
        </div>
        {/* update first name and last name */}
        <div className="md:flex w-full  mt-3">
          <input
            className="md:w-2/4 w-11/12 h-10 border-2 rounded-md border-gray-300 pl-2 outline-none"
            value={updateProfileData?.first_name}
            placeholder="First Name"
            type="text"
            name="first_name"
            id=""
            onChange={onHandelInputChange}
          />
          <input
            className="md:w-2/4 ml-2 w-11/12 h-10 border-2 rounded-md border-gray-300 pl-2 outline-none"
            value={updateProfileData?.last_name}
            placeholder="Last Name"
            type="text"
            name="last_name"
            onChange={onHandelInputChange}
            id=""
          />
        </div>

        {/* email */}
        <input
          className=" block w-full mt-6  h-10 border-2 rounded-md border-gray-300 pl-2 outline-none"
          value={updateProfileData?.email}
          placeholder="Enter Email"
          type="text"
          name="email"
          onChange={onHandelInputChange}
          id=""
        />

        {/* bio */}
        <textarea
          rows="3"
          value={updateProfileData?.bio}
          className="w-full mt-4 rounded-md border-2  outline-none border-gray-300 p-2"
          name="bio"
          onChange={onHandelInputChange}
          id=""
          placeholder="Enter Bio..."
        ></textarea>

        {/* save and cancel buttons buttons */}

        <div className="saveButtons mt-5">
          <button
            className="w-36 h-11 font-medium text-white shadow-md rounded-md bg-blue-400"
            onClick={() => {
              Update(updateProfileData);
            }}
          >
            Save
          </button>
          <button
            className="w-36 h-11 font-medium text-white ml-5 shadow-md rounded-md bg-red-400"
            onClick={cancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </PopupContainerProvider>
  );
};

export default UpdateProfilePopup;
