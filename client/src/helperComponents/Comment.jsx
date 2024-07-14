import { useEffect, useState } from "react";
import ThreeDot from "../Images/three_dots.png";
import IframeLogic from "../Logic/UserLogic";
const Comment = ({ profileSrc, Name, commentText }) => {

  const { GetIframeColor, GetUserIcon } = IframeLogic()
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  // profile icon name state
  const [commentAuthorIframe, setCommentAuthorIframe] = useState()
  // profile icon iframe color
  const [IframeColor, setIframeColor] = useState()

  useEffect(() => {
    setCommentAuthorIframe(GetUserIcon(Name))
    setIframeColor(GetIframeColor(Name[0]))
  }, [Name])


  return (
    <div className="w-full h-auto mt-2 border-2 relative p-2">
      <div className="commentHead flex items-center">

        {
          profileSrc ? <img
            className="w-12 h-12 rounded-full bg-gray-700"
            src={profileSrc}
            alt=""
          /> : <h1 style={{ backgroundColor: IframeColor }} className="w-12 h-12  rounded-full flex justify-center items-center font-medium text-xl  uppercase">
            {commentAuthorIframe}
          </h1>
        }

        <p className="text-lg font-semibold ml-2">{Name}</p>
      </div>
      {/* comment content */}
      <div className="commentBody mt-1   min-h-10 w-full ">
        {commentText}
      </div>

      {/*  delete comment box */}
      <button
        className="w-6 h-6  absolute top-2  right-2"
        onClick={() => {
          setShowDeletePopup(!showDeletePopup);
        }}
        onBlur={() => {
          setShowDeletePopup(false);
        }}
      >
        <img src={ThreeDot} alt="" />
        {/* delete popup */}
        {showDeletePopup && (
          <div className="shadow-xl -mt-1 flex items-center justify-center -ml-24  w-32 h-10 rounded-md border bg-white">
            Delete
          </div>
        )}
      </button>
    </div>
  );
};
export default Comment;
