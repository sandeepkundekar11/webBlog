import { useEffect, useRef, useState } from "react";
import PopupContainerProvider from "../helperComponents/PopupContainerProvider";
import UserLogic from "../Logic/UserLogic";


const UpdateProfilePopup = ({ profileData }) => {
  const ProfileRef = useRef(null)
  const { GetIframeColor, GetUserIcon } = UserLogic();
  const [updateProfileData, setUpdateProfileData] = useState({
    profileSrc: null,
    first_name: "",
    last_name: "",
    email: "",
    boi: ""
  })

  // profile default iframe

  const [ProfileColor, setProfileColor] = useState();
  //   profile iframe
  const [ProfileIframe, setProfileIframe] = useState();

  // defining the upload profile function

  const uploadProfile = (e) => {
    const file = e.target.files[0]
      let profileUrl = URL.createObjectURL(file);
       console.log(profileUrl)
    setUpdateProfileData((state) => {
      return {
        ...state,
        profileSrc: profileUrl
      }
    })
  }


  useEffect(() => {
    setUpdateProfileData({
      profileSrc: profileData?.profileSrc,
      first_name: profileData?.first_name,
      last_name: profileData?.last_name,
      email: profileData?.email,
      boi: profileData?.boi
    })
    let name = `${profileData?.first_name} ${profileData?.last_name}`
    setProfileColor(GetIframeColor(name[0]))
    setProfileIframe(GetUserIcon(name))

  }, [profileData])
  return (
    <PopupContainerProvider>
      <div className="updateProfilePopup p-3">

        <div className="profileImageContainer flex border-b-2 pb-2">
          {/* update profile image */}
          <div className="image w-2/4 flex justify-center">
            {/* profile image */}
            {
              updateProfileData?.profileSrc ?
                <img ref={ProfileRef} className="w-32 h-32 bg-slate-500 rounded-lg" src={updateProfileData?.profileSrc} alt="" />
                :
                <div style={{ backgroundColor: ProfileColor }} className="w-32 h-32 bg-slate-500 rounded-lg text-3xl flex justify-center items-center font-semibold">{ProfileIframe}</div>
            }
          </div>
          <div className="ChangeProfileButton flex flex-col items-center h-2/4">
            <button className="w-36 rounded-3xl hover:bg-blue-100 relative hover:border-blue-500 shadow-md h-10 border-2">
              <p className="text-base text-gray-800 font-semibold" >Change Photo</p>
              <input type="file" className="w-full h-full absolute top-0 left-0 opacity-5" onChange={uploadProfile} />
            </button>
            <button className="w-36 rounded-3xl shadow-md h-10 hover:border-2 hover:border-red-500 border-gray-700 border mt-4" onClick={()=>
              {
                setUpdateProfileData((state)=>{
                  return {
                    ...state,
                    profileSrc:null
                  }
                })

                // 
                ProfileRef.current.value=null

              }
            }>remove</button>
          </div>

          {/* update profile image ends */}
        </div>
        {/* update first name and last name */}
        <div className="md:flex w-full  mt-3">
          <input className="md:w-2/4 w-11/12 h-10 border-2 rounded-md border-gray-300 pl-2 outline-none"
            value={updateProfileData?.first_name} placeholder="First Name" type="text" name="" id="" />
          <input className="md:w-2/4 ml-2 w-11/12 h-10 border-2 rounded-md border-gray-300 pl-2 outline-none"
            value={updateProfileData?.last_name} placeholder="Last Name" type="text" name="" id="" />
        </div>

        {/* email */}
        <input className=" block w-full mt-6  h-10 border-2 rounded-md border-gray-300 pl-2 outline-none"
          value={updateProfileData?.email} placeholder="Enter Email" type="text" name="" id="" />

        {/* bio */}
        <textarea rows="3" value={updateProfileData?.boi} className="w-full mt-4 rounded-md border-2  outline-none border-gray-300 p-2" name="" id="" placeholder="Enter Bio..."></textarea>

        {/* save and cancel buttons buttons */}

        <div className="saveButtons mt-5">
          <button className="w-36 h-11 font-medium text-white shadow-md rounded-md bg-blue-400">Save</button>
          <button className="w-36 h-11 font-medium text-white ml-5 shadow-md rounded-md bg-red-400">Cancel</button>
        </div>
      </div>
    </PopupContainerProvider>
  );
};

export default UpdateProfilePopup;
