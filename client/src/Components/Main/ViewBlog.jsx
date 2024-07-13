// import likeImg from "../../Images/Like.png"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Comment from "../../helperComponents/Comment";
import Loader from "../../helperComponents/Loader";
import CommentImg from "../../Images/Comment.png";
import ShareImg from "../../Images/share.png";
import unlikeImg from "../../Images/unLike.png";
import ToasterLogic from "../../Logic/ToasterLogic";
import { addCommentApiCall } from "../../Redux/Actions/AddCommentAction";
import { getBlogByIdApiCall } from "../../Redux/Actions/GetBlogByIdAction";
import { getAllCommentApiCall } from "../../Redux/Actions/GetCommentsAndLikesAction";
const ViewBlog = () => {
  const {successToaster}=ToasterLogic()
  const Dispatch = useDispatch();
  //   blog data
  const { blogLoading, blogData } = useSelector((state) => state.blogById);
  //   add comment data
  const { addCommentMessage, addCommentLoading } = useSelector(
    (state) => state.addComment
  );
  //  get all comment of this present blog
  const { blogComments, blogCommentLoading } = useSelector((state) => state.getBlogComment)
  //   show hiding the comment box
  const [showHideCommentBox, setShowHideCommentBox] = useState(false);
  // state use to toggle the follow and email fileds
  const [PresentUser, setPresentUser] = useState(false);

  //   comment state
  const [content, setContent] = useState("");
  // this state stores the blog information
  const [viewBlog, setViewBlog] = useState(null);

  // getting clicked blog id
  const { id } = useParams();

  // getting all the blog comments
  useEffect(() => {
    Dispatch(getAllCommentApiCall(id))

  }, [Dispatch, id])
  useEffect(() => {
    // calling the api getBlogById
    Dispatch(getBlogByIdApiCall(id));
  }, [Dispatch, id]);

  useEffect(() => {
    // calling get all comment api
    Dispatch(getAllCommentApiCall(id))
    // hiding the Add comment box
    setShowHideCommentBox(false);

    // making empty to content
    console.log("calling")
    setContent("");
    // setting the toaster to notify that comment is been added
  }, [addCommentMessage])



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

  //   calling the add comment api
  const addComment = () => {
    if (content.length > 2) {
      // call api
      Dispatch(addCommentApiCall(id, content,successToaster));
    }
  };
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
            <button
              className="w-12 h-12 hover:bg-slate-100 p-2 rounded-full"
              //   show Hiding the comment box
              onClick={() => setShowHideCommentBox(!showHideCommentBox)}
            >
              <img src={CommentImg} alt="" />
              <p className="-mt-2">5</p>
            </button>

            {/* share button */}
            <button className="w-12 h-12 hover:bg-slate-100 p-2 rounded-full">
              <img src={ShareImg} alt="" />
            </button>
          </div>
        </div>

        {/* comment Section */}
        <div className="w-full pb-10">
          {/* add comment container */}

          {showHideCommentBox && (
            //   show Hiding the comment box
            <>
              <div className="w-full">
                {/* add comment text filed */}
                <textarea
                  className="w-full mt-4 border-2 focus:border-blue-500 outline-none rounded-xl p-2"
                  name=""
                  id=""
                  cols="10"
                  rows="3"
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                  placeholder="Add Comment"
                ></textarea>
              </div>
              <div className="flex justify-end border-b-2 pb-2">
                {/* add comment buttons */}
                <button
                  className="w-40  h-10 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => setShowHideCommentBox(false)}
                >
                  Cancel
                </button>
                <button
                  className="w-40 ml-4 h-10 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={addComment}
                >
                  Comment
                </button>
              </div>
            </>
          )}

          {/* show comments container */}
          <div className="w-full">
            {blogComments?.map((ele, index) => {
              return <Comment key={index} />;
            })}
          </div>
        </div>

        {/* comment section */}
      </div>
      {/* loader */}
      {(blogLoading || addCommentLoading || blogCommentLoading) && <Loader />}
    </div>
  );
};
export default ViewBlog;
