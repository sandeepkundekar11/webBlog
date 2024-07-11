import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchImg from "../../Images/SearchBar.png";
import { GetAllBlogsApiCall } from "../../Redux/Actions/GetAllBlogsAction";
import Loader from "../../helperComponents/Loader";
import Blog from "../Blog";
const Home = () => {
  const Dispatch = useDispatch();
  const Navigate = useNavigate();
  // getting all blog loader and Allblogs
  const { BlogsLoading, Allblogs } = useSelector((state) => state.allBlogs);

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // dispatching GetAllBlog api Function from GetAll blog action file
    Dispatch(GetAllBlogsApiCall());
  }, [Dispatch]);

  useEffect(() => {
    // getting and storing in to the setBlogs State
    setBlogs(Allblogs);
  }, [Allblogs]);
  return (
    <div className="min-h-screen max-h-full w-full">
      {/* blog filter section */}
      <div className="blogSearchSection pt-32 flex items-center ">
        {/* start input search and display category container */}
        <div className="sub-blogSearchSection m-auto flex flex-col items-center ">
          <h1 className="text-3xl mb-5 font-bold text-white">
            Create, Share, Inspire with BlogSpace
          </h1>
          <div className="searchInput flex  bg-gray-100 rounded-md h-10">
            <img className="w-12 h-full p-1" src={SearchImg} alt="" />
            <input
              className=" w-full h-full bg-gray-100 pl-2 rounded-md outline-none"
              type="text"
              placeholder="Search Categories"
            />
          </div>

          {/* category container */}
          <div className="CategoriesContainer  w-full mt-4  ">
            <span className="flex md:flex-row flex-col ">
              <h1 className="text-xl w-44 text-white text-start text-nowrap">
                Top Categories :
              </h1>
              <div className=" flex flex-wrap">
                {
                  // displaying all the categories
                  [1, 2, 3, 4, 5, 6, 7].map((ele, index) => {
                    return (
                      <div
                        key={index}
                        className="w-24 h-6 rounded-sm text-blue-600 text-sm bg-gray-100 font-medium
                                                m-1 flex justify-center cursor-pointer items-center text-center"
                      >
                        {"Technology"}
                      </div>
                    );
                  })
                }
              </div>
            </span>
          </div>

          {/* search Blog button */}
          <button className="mt-6 w-24 h-10 bg-blue-600 hover:bg-blue-700 text-white shadow-md rounded-md">
            Get Started
          </button>
        </div>
        {/* end input search and display category container */}
      </div>

      {/*  All blogs will be displayed here */}
      <div className="xl:w-2/4 md:w-4/5 w-full m-auto overflow-y-hidden">
        {
          // mapping all the blogs and setting the properties
          blogs?.map((ele, index) => {
            return (
              <Blog
                key={index}
                Title={ele?.heading}
                Categories={ele?.categories}
                content={ele?.content}
                name={`${ele?.author?.first_name} ${ele?.author?.last_name}`}
                ViewBlog={() => {
                  Navigate(`/viewblog/${ele?._id}`);
                }}
                userEmail={ele?.author.email}
                isAuthor={ele?.author?._id}
              />
            );
          })
        }
      </div>

      {/* pagination  container */}
      <div className="flex xl:w-2/4 md:w-4/5 w-full m-auto overflow-y-hidden mb-12">
        {[1, 2, 3, 4, 5].map((ele, index) => {
          return (
            <div
              className="w-12 h-12 flex justify-center items-center border m-2 hover:bg-blue-500"
              key={index}
            >
              {ele}
            </div>
          );
        })}
      </div>

      {
        // adding the loader
        BlogsLoading && <Loader />
      }
    </div>
  );
};
export default Home;
