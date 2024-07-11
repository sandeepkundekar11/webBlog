// import likeImg from "../../Images/Like.png"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentImg from "../../Images/Comment.png";
import ShareImg from "../../Images/share.png";
import unlikeImg from "../../Images/unLike.png";
import { useSelector, useDispatch } from "react-redux";
import { getBlogByIdApiCall } from "../../Redux/Actions/GetBlogByIdAction";
import Loader from "../../helperComponents/Loader";
const ViewBlog = () => {
  const Dispatch = useDispatch();
  const { blogLoading, blogData } = useSelector((state) => state.blogById);

  // state use to toggle the follow and email fileds
  const [PresentUser, setPresentUser] = useState(false);

  // this state stores the blog information
  const [viewBlog, setViewBlog] = useState(null);

  // getting clicked blog id
  const { id } = useParams();
  useEffect(() => {
    // calling the api getBlogById
    Dispatch(getBlogByIdApiCall(id));
  }, [Dispatch, id]);

  //   checking that present user blog or other person blog and also getting the data to state
  useEffect(() => {
    // storing the blog in to state
    setViewBlog(blogData);

    // in the below block of code we are campairing the blogAuthor id and present user id
    // if both are same then present user only the author of this blog and then we will show only email filed
    // if both are not same the your not author of this blog and we will show follow button

    let blogAuthorId = viewBlog?.author?._id;
    let PresentUserId = JSON.parse(localStorage.getItem("user"))._id;
    if (blogAuthorId === PresentUserId) {
      setPresentUser(true);
    } else {
      setPresentUser(false);
    }
  }, [blogData, viewBlog?.author?._id]);
  return (
    <div className="h-full w-full pt-20 pb-10">
      {/* subBlog container */}
      <div className="viewBlog xl:w-3/5 md:w-4/5 w-11/12 m-auto">
        {/* blog heading */}
        <h1 className="ViewBlogHead text-4xl font-semibold">
          {viewBlog?.heading}
        </h1>

        {/* blog profile */}
        <div className="blogProfile flex mt-3 items-center">
          {/* profile pic */}
          <img className="w-16 h-16 bg-slate-500 rounded-full" src="" alt="" />
          {/* profile info start*/}
          {/* if we are seeing others blog then name and fallow button will be visible */}
          {/* if we are seeing personal blog then name and Email will be visible */}
          <div className=" ml-3">
            <h1 className="text-xl font-medium">{`${viewBlog?.author?.first_name} ${viewBlog?.author?.last_name}`}</h1>

            {/* toggling the follow button and email filed */}
            {PresentUser ? (
              <p>{viewBlog?.author?.email}</p>
            ) : (
              <button className="bg-blue-600 rounded-xl w-28 mt-2 text-white h-8">
                Follow
              </button>
            )}

            {/* <p>Sandeep1000@gmail.com</p> */}
          </div>
        </div>

        {/* profile Image */}

        {viewBlog?.image && (
          <div className="w-full h-96 bg-slate-200 rounded-lg mt-6">
            <img
              className="h-96 w-auto m-auto bg-slate-500  rounded-md"
              src={viewBlog?.image}
              alt=""
            />
          </div>
        )}
        {/* Blog Categories List */}
        <div className="viewBlogCategories flex flex-wrap mt-3">
          {viewBlog?.categories.map((ele, index) => {
            return (
              <div
                className="w-auto p-2 h-10 ml-3 bg-slate-100 rounded-3xl border"
                key={index}
              >
                {ele}
              </div>
            );
          })}
        </div>

        {/* Blog content */}
        <p className="mt-4 text-xl">{viewBlog?.content}</p>

        {/* bellow like comment share buttons container */}

        <div className="flex w-full border-t-2 mt-4 border-b-2 py-2 ">
          <div className="sm:w-96 w-full flex justify-between">
            {/* like dislike button */}
            <button className="w-12 h-12 hover:bg-slate-100 p-2 rounded-full">
              <img src={unlikeImg} alt="" />
            </button>
            {/* comment button */}
            <button className="w-12 h-12 hover:bg-slate-100 p-2 rounded-full">
              <img src={CommentImg} alt="" />
            </button>

            {/* share button */}
            <button className="w-12 h-12 hover:bg-slate-100 p-2 rounded-full">
              <img src={ShareImg} alt="" />
            </button>
          </div>
        </div>

        {/* comment section */}
      </div>
      {/* loader */}
      {blogLoading && <Loader />}
    </div>
  );
};
export default ViewBlog;
