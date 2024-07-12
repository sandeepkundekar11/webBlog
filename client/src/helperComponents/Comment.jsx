import { useState } from "react";
import ThreeDot from "../Images/three_dots.png";
const Comment = ({ profileSrc, Name, commentText }) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  return (
    <div className="w-full h-auto mt-2 border-2 relative p-2">
      <div className="commentHead flex items-start">
        <img
          className="w-12 h-12 rounded-full bg-gray-700"
          src={profileSrc}
          alt=""
        />
        <p className="text-lg font-semibold ml-2">Sandeep N K</p>
      </div>
      <div className="commentBody mt-1 p-2  min-h-20 w-full ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
        perspiciatis illum ea iusto! Laudantium provident temporibus alias porro
        neque perferendis dolore deserunt aperiam est dignissimos, maxime
        eligendi ipsam sed fugit!
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
          <div className="shadow-xl mt-3 flex items-center justify-center -ml-20  w-32 h-10 rounded-md border bg-white">
            Delete
          </div>
        )}
      </button>
    </div>
  );
};
export default Comment;
