import { useEffect, useState } from "react";
import IframeLogic from "../Logic/UserLogic";

const Blog = ({
  Title,
  profileSrc = null,
  name,
  Categories = [],
  content = "",
  ViewBlog,
  isAuthor,
  userEmail,
}) => {
  const { GetIframeColor, GetUserIcon } = IframeLogic();
  // user name for dispyling the Profile icon if will appear when we profilesrc will not present
  const [userName, setUserName] = useState();
  const [IframeColor, setIframeColor] = useState("");
  useEffect(() => {
    // here we are getting first latter of first and last  name
    let username = GetUserIcon(name);
    setUserName(username);
    setIframeColor(GetIframeColor(username[0]));
  }, [name]);
  return (
    // main blog container
    <div className="w-full  p-2 hover:bg-slate-100 rounded-md mt-2 border-2 ">
      {/* getting and Blog title from props and displaying */}
      <h1 className="text-2xl font-bold p-2">{Title}</h1>
      <div className="BloProfile min-w-48 max-w-full flex items-center p-2">
        {/* getting the profileSrc from props */}
        {/* if profileScr is not present then we will display Fist later of First and last name ex:"Sandeep kundekar" return "SK"  */}
        {profileSrc !== "null" ? (
          <img
            className="w-14 h-14 bg-slate-300 rounded-full"
            src={profileSrc}
            alt=""
          />
        ) : (
          <h1
            style={{ backgroundColor: IframeColor }}
            className="w-14 h-14  rounded-full flex justify-center items-center font-medium text-xl  uppercase"
          >
            {userName}
          </h1>
        )}

        <div className="pl-2">
          {/* getting the name from props and  setting*/}
          <p className="text-lg font-medium">{name} </p>
          {/* setting Follow ,unFallow button */}

          {JSON.parse(localStorage.getItem("user"))._id === isAuthor ? (
            <p>{userEmail}</p>
          ) : (
            <button className="bg-blue-600 w-28 p-1 text-white rounded-xl">
              follow
            </button>
          )}
        </div>
      </div>
      <div className="flex">
        {/* mapping the categories which is extracted from props */}
        {Categories.map((ele, index) => {
          return (
            <div key={index} className="w-24 p-2 rounded-2xl bg-slate-300 m-2">
              {ele}
            </div>
          );
        })}
      </div>
      <div className="text-base font-normal p-2">
        {/* displaying the context  */}
        {/* if content is greater then 200 characters then reducing it to 200 characters */}
        {content.substring(0, 200)}{" "}
        {/* see more this button Navigates to View blogpage */}
        <button
          className="w-32 text-blue-600 h-auto p-2 bg-transparent hover:bg-slate-200 rounded-2xl"
          onClick={ViewBlog}
        >
          See more..
        </button>
      </div>
    </div>
  );
};
export default Blog;
