import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "../../helperComponents/Comment";
import Loader from "../../helperComponents/Loader";
import CommentImg from "../../Images/Comment.png";
import likeImg from "../../Images/Like.png";
import ShareImg from "../../Images/share.png";
import unlikeImg from "../../Images/unLike.png";
import ToasterLogic from "../../Logic/ToasterLogic";
import IframeLogic from "../../Logic/UserLogic";
import { addCommentApiCall } from "../../Redux/Actions/AddCommentAction";
import { getLikesApiCall } from "../../Redux/Actions/AddLikeAction";
import { DeleteBlogApiCall } from "../../Redux/Actions/DeleteBlogAction";
import { followUnfollowApiCall } from "../../Redux/Actions/FollowAndUnfollowAction";
import { getBlogByIdApiCall } from "../../Redux/Actions/GetBlogByIdAction";
import {
  getAllCommentApiCall,
  GetAllLikesApiCall,
} from "../../Redux/Actions/GetCommentsAndLikesAction";
import ManageBlogPopup from "../ManageBlogPopup";
const ViewBlog = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  useEffect(() => {
    let id = JSON.parse(localStorage.getItem("user"))._id;
    setUserId(id);
  }, []);
  const { GetIframeColor, GetUserIcon } = IframeLogic();
  const { successToaster } = ToasterLogic();
  const Dispatch = useDispatch();


  // it sets how many number of comments should be visible if it 2 then only two comments will be visible
  const [commentCoutToShow, setCommentCountToShow] = useState(1);
  // profile name if author is profile is not available
  const [IframeName, setIframeName] = useState();

  // profile color
  const [IframeColor, setIframColor] = useState();

  //   blog data
  const { blogLoading, blogData } = useSelector((state) => state.blogById);
  //   add comment data
  const { addCommentMessage, addCommentLoading } = useSelector(
    (state) => state.addComment
  );
  //  get all comment of this present blog
  const { blogComments, blogCommentLoading } = useSelector(
    (state) => state.getBlogComment
  );

  // Likes data
  const { likesMessage, likesLoading } = useSelector((state) => state.addLikes);
  // like of the blog state
  const [likes, setLikes] = useState([]);

  // get all likes of this present blog
  const { blogLikes, blogLikesLoading } = useSelector(
    (state) => state.getBlogLikes
  );
  // state to store the  blogcomments
  const [comments, setComments] = useState([]);
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

  useEffect(() => {
    // getting all the blog comments
    Dispatch(getAllCommentApiCall(id));
    // calling the api getBlogById
    Dispatch(getBlogByIdApiCall(id));
  }, [Dispatch, id]);

  useEffect(() => {
    // here we are rotating the comments array so that alway user will see lateast comments
    let RotatedArr = [];
    for (let i = blogComments?.length - 1; i >= 0; i--) {
      RotatedArr.push(blogComments[i]);
    }
    setComments(RotatedArr);
  }, [blogComments]);

  useEffect(() => {
    // getting the blog author information
    let Author = blogData?.author;
    // getting the user full name
    let name = `${Author?.first_name} ${Author?.last_name}`;

    // setting the Profile icons
    setIframeName(GetUserIcon(name));
    // setting the Profile color
    setIframColor(GetIframeColor(name[0]));
  }, [blogData]);

  useEffect(() => {
    // when our add comment api is called then that time calling get all comment api
    Dispatch(getAllCommentApiCall(id));
    // hiding the Add comment box
    setShowHideCommentBox(false);

    // making empty to content
    setContent("");
  }, [addCommentMessage]);

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

  useEffect(() => {
    // getting all blog likes
    // when our like api is called that time again get all likes api is called
    Dispatch(GetAllLikesApiCall(id));
  }, [likesMessage]);

  useEffect(() => {
    // setting the Like blog state
    setLikes(blogLikes);
  }, [blogLikes]);

  const addComment = () => {
    if (content.length > 2) {
      // call api
      Dispatch(addCommentApiCall(id, content, successToaster));
    }
  };

  // add like section

  const onLikeDisLike = () => {
    // calling the Like dislike api
    Dispatch(getLikesApiCall(id, successToaster));
    // getting all blog likes
    Dispatch(GetAllLikesApiCall(id));
  };

  // manage blog popup logic
  const [openManagePopup, setOpenManagePopup] = useState(false);
  const { DeletedBlogMessage, DeleteBlogLoading } = useSelector(
    (state) => state.deleteBlog
  );


  // follow unfollow logic
  //follow unfollow message
  const { FollowInfollowMessage, FollowUnfollowLoading } = useSelector((state) => state.followUnfollow)
  const followUnfollow = () => {
    let followerId = JSON.parse(localStorage.getItem("user"))._id
    let blogAuthorId = viewBlog?.author?._id;
    // calling the follow unfollw api
    Dispatch(followUnfollowApiCall(followerId, blogAuthorId, successToaster))
    setTimeout(()=>{
     // calling the api getBlogById
    Dispatch(getBlogByIdApiCall(id));
    },500)
  }



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

          {blogData?.author?.profileSrc ? (
            <img
              className="w-16 h-16 bg-slate-500 rounded-full border"
              src={blogData?.author?.profileSrc}
              alt=""
            />
          ) : (
            <h1
              style={{ backgroundColor: IframeColor }}
              className="w-14 h-14  rounded-full flex justify-center items-center font-medium text-xl  uppercase"
            >
              {IframeName}
            </h1>
          )}
          {/* profile info start*/}
          {/* if we are seeing others blog then name and fallow button will be visible */}
          {/* if we are seeing personal blog then name and Email will be visible */}
          <div className=" ml-3">
            <h1 onClick={() => navigate(`/profile/${viewBlog?.author?._id}`)} className="text-xl cursor-pointer hover:text-blue-500 font-medium">{`${viewBlog?.author?.first_name} ${viewBlog?.author?.last_name}`} {PresentUser && `(Me)`}</h1>

            {/* toggling the follow button and email filed */}
            {PresentUser ? (
              <p>{viewBlog?.author?.email}</p>
            ) :
              <>
                {

                  viewBlog?.author?.followers.includes(JSON.parse(localStorage.getItem("user"))._id) ?
                    <button className="bg-blue-100 rounded-xl w-28 mt-2 text-black font-medium h-8" onClick={followUnfollow}>
                      Following
                    </button> : <button className="bg-blue-600 rounded-xl w-28 mt-2 text-white h-8" onClick={followUnfollow}>
                      Follow
                    </button>

                }
              </>

            }

            {/* <p>Sandeep1000@gmail.com</p> */}
          </div>
        </div>
        {
          // only the author of the blog only can delete or edit the post
          PresentUser && (
            <div className="flex justify-end">
              <button
                className="w-28 h-8 text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow-lg"
                onClick={() => setOpenManagePopup(true)}
              >
                Manage
              </button>
            </div>
          )
        }

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
            <button
              className="w-12 h-12 hover:bg-slate-100 p-2 rounded-full"
              onClick={onLikeDisLike}
            >
              {likes?.some((ele) => ele._id === userId) ? (
                <img src={likeImg} alt="" />
              ) : (
                <img src={unlikeImg} alt="" />
              )}
              {/* <img src={unlikeImg} alt="" /> */}
              <p className="-mt-2">{likes?.length}</p>
              {/* <img src={likeImg} alt="" /> */}
            </button>
            {/* comment button */}
            <button
              className="w-12 h-12 hover:bg-slate-100 p-2 rounded-full"
              //   show Hiding the comment box
              onClick={() => setShowHideCommentBox(!showHideCommentBox)}
            >
              <img src={CommentImg} alt="" />
              <p className="-mt-2">{blogComments?.length}</p>
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
          <p className="font-medium text-2xl">
            Comments ({blogComments?.length}) :
          </p>
          <div className="w-full flex flex-col">
            {comments?.map((ele, index) => {
              if (index + 1 <= commentCoutToShow) {
                return (
                  <Comment
                    key={index}
                    Name={`${ele?.author.first_name} ${ele?.author.last_name} ${ele?.author?._id === userId ? "(Me)" : ""}`}
                    commentText={ele?.content}
                    profileSrc={ele?.author?.profileSrc}
                    commentAuthorId={ele?.author?._id}
                  />
                );
              }
            })}
          </div>

          {/* show more comment button */}
          {
            // this button will be visible when comments length is more then 2
            blogComments?.length > 1 && (
              <button
                className="w-full h-10 bg-gray-200 hover:bg-gray-300 mt-4 rounded-lg"
                onClick={() => {
                  // normally only one comment should be visible
                  // when we click on show more then all blogs should be visible
                  // and again if click on read less  then again show only 1 blog
                  if (commentCoutToShow <= 1) {
                    // showing all blogs
                    setCommentCountToShow(blogComments?.length);
                  } else {
                    // showing only 1 blog
                    setCommentCountToShow(1);
                  }
                }}
              >
                {commentCoutToShow < 2 ? "Read More.." : "Read less"}
              </button>
            )
          }
        </div>

        {/* comment section */}
      </div>
      {/* loader */}
      {(blogLoading ||
        addCommentLoading ||
        blogCommentLoading ||
        likesLoading ||
        blogLikesLoading ||
        DeleteBlogLoading ||
         FollowUnfollowLoading) && <Loader />}

      {/* popup display */}
      {/* manage popup for managing the blog like delete the blog or update the blog */}
      {openManagePopup && (
        <ManageBlogPopup
          onCancel={() => {
            setOpenManagePopup(false);
          }}
          onDelete={() => {
            Dispatch(DeleteBlogApiCall(id, navigate));
          }}
          onUpdate={() => { }}
        />
      )}
    </div>
  );
};
export default ViewBlog;
