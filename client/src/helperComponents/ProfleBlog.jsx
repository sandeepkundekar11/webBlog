import DOMPurify from "dompurify";
import commentIcon from "../Images/Comment.png";
import likeImg from "../Images/unLike.png";
const ProfleBlog = ({
  heading,
  content,
  viewBlog,
  imageSrc = null,
  likeCount = 0,
  commentCount = 0,
}) => {
  return (
    <div className="w-full bg-slate-50 h-full md:flex border p-4 m-2">
      {imageSrc && (
        <img className="md:w-72 h-52 bg-slate-500" src={imageSrc} alt="" />
      )}
      <div className="pl-2">
        <div className="h-5/6">
          <h1 className="text-xl text-blue-500 font-medium">{heading}</h1>
          <div className="mt-2" dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(content?.substring(0,200))}}/>
          <div className="flex mt-2 justify-around w-32">
            {/* comments */}
            <div className="flex">
              <p className="text-lg pr-1">{commentCount}</p>
              <img className="w-7 h-7" src={commentIcon} alt="" />
            </div>
            {/* likes */}
            <div className="flex">
              <p className="text-lg pr-1">{likeCount}</p>
              <img className="w-7 h-7" src={likeImg} alt="" />
            </div>
          </div>
        </div>
        <button
          className="w-28 h-8  hover:bg-blue-200 rounded-xl font-semibold float-right"
          onClick={viewBlog}
        >
          view
        </button>
      </div>
    </div>
  );
};
export default ProfleBlog;
