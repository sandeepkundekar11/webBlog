import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThreeDot from "../Images/three_dots.png";
import IframeLogic from "../Logic/UserLogic";
const Comment = ({ profileSrc, Name, commentText, commentAuthorId }) => {

  const navigate=useNavigate()
  const { GetIframeColor, GetUserIcon } = IframeLogic()
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  // profile icon name state
  const [commentAuthorIframe, setCommentAuthorIframe] = useState()
  // profile icon iframe color
  const [IframeColor, setIframeColor] = useState()

  // checking the comment author

  const [commentAuthor, setCommentAuthor] = useState(false)
  useEffect(() => {
    let presentUserId = JSON.parse(localStorage.getItem("user"))?._id
    if (presentUserId === commentAuthorId) {
      setCommentAuthor(true)
    }
    else {
      setCommentAuthor(false)
    }
  }, [commentAuthorId])
  useEffect(() => {
    let name;
    if (Name.includes("(Me)")) {
      name = Name.substring(0, Name.length - 4)
    }
    else {
      name = Name
    }
    setCommentAuthorIframe(GetUserIcon(name))
    setIframeColor(GetIframeColor(name[0]))
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

        <p className="text-lg font-semibold ml-2 hover:text-blue-500 cursor-pointer" onClick={()=>{
             navigate(`/profile/${commentAuthorId}`)
            //  navigating to comment author id
        }}>{Name}</p>
      </div>
      {/* comment content */}
      <div className="commentBody mt-1   min-h-10 w-full ">
        {commentText}
      </div>

      {/*  delete comment box */}

      {
        commentAuthor && <button
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
      }

    </div>
  );
};
export default Comment;
