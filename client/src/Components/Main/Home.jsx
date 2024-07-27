import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchImg from "../../Images/SearchBar.png";
import { GetAllBlogsApiCall } from "../../Redux/Actions/GetAllBlogsAction";
import Loader from "../../helperComponents/Loader";
import SearchBlogBox from "../../helperComponents/SearchBlogBox";
import Blog from "../Blog";
const Home = () => {
  const Dispatch = useDispatch();
  const Navigate = useNavigate();

  // searched blog
  const [SearchedBlog, setSearchBlog] = useState("")
  // getting all blog loader and Allblogs
  const { BlogsLoading, Allblogs } = useSelector((state) => state.allBlogs);

  const [blogs, setBlogs] = useState([]);
  // all blog categories
  const [BlogCategories, setBlogCategories] = useState([])
  // categories count
  const [CategoryCount, setCategoryCount] = useState(4)
  // selected categories for the filter
  const [SelectedCategories, setSelectedCategories] = useState([])
  // show dropdown state
  const [ShowDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    // dispatching GetAllBlog api Function from GetAll blog action file
    Dispatch(GetAllBlogsApiCall());
  }, [Dispatch]);


  useEffect(() => {
    // getting and storing in to the setBlogs State
    setBlogs(Allblogs);

    // getting all the categories and removing duplicate categories for it using filter
    let categories = Allblogs?.reduce((acc, curr) => {
      acc.push(curr.categories)
      return acc
    }, []).flat().filter((ele, index, self) => {
      return self.indexOf(ele) === index
    }).map((ele) => {
      return {
        category: ele,
        selected: false
      }
    })
    setBlogCategories(categories)


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

          {/* search blog container */}
          <div className="relative" onBlur={() => {
            setTimeout(() => {
              setShowDropdown(false)
            }, 300)
          }
          }>
            <div className="searchInput flex  bg-gray-100 rounded-md h-10" >
              <img className="w-12 h-full p-1" src={SearchImg} alt="" />
              <input
                className=" w-full h-full bg-gray-100 pl-2 rounded-md outline-none"
                type="text"
                placeholder="Search Blogs or User..."
                onChange={(e) => {
                  setSearchBlog(e.target.value)
                }
                }
                onFocus={() => {
                  setShowDropdown(true)
                }}
              />
            </div>
            {/* search dropdown */}
            {
              ShowDropdown && (
                <div className="blogSearchBar w-full absolute  top-10 min-h-0 max-h-56 overflow-scroll bg-white shadow-2xl rounded-md ">
                  {
                    // return the blog which matches the first name and blog heading with entered input
                    blogs?.filter((ele) => {
                      if (SearchedBlog !== "" &&
                        (ele?.heading?.toLowerCase().includes(SearchedBlog?.toLowerCase())
                          || ele?.author.first_name.toLowerCase().includes(SearchedBlog.toLowerCase()))
                      ) {
                        return ele
                      }

                    }).map((ele, index) => {
                      return (
                        <SearchBlogBox key={index}
                          BlogHading={ele?.heading}
                          blogAuthor={`${ele?.author?.first_name} ${ele?.author?.last_name}`}
                          blogSrc={ele?.image} onClickHandle={() => {
                            Navigate(`/viewblog/${ele?._id}`);
                          }
                          } />
                      )
                    })
                  }
                </div>
              )
            }
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
                  BlogCategories?.map((ele, index) => {
                    if (index + 1 < CategoryCount) {
                      return (
                        <div
                          onClick={() => {
                            // defining one temporary array 
                            let newSelectedCategories;
                            if (SelectedCategories.includes(ele.category)) {
                              // checking that selected category is already present in SelectedCategoriesArr then we remove and from 
                              // selectedCategories Array and store in temporary variable else we add the category
                              newSelectedCategories = SelectedCategories.filter((cat) => {
                                return cat !== ele?.category
                              })
                            }
                            else {
                              // adding category
                              newSelectedCategories = [...SelectedCategories, ele?.category]
                            }

                            // setting the blog categoriesArrary  and if selectedCategories array contains blog category then return selected true 
                            // to that blog category and based on that category we are changing the category color
                            setBlogCategories((arr) => {
                              return arr.map((cat) => {
                                return {
                                  category: cat?.category,
                                  selected: newSelectedCategories.includes(cat?.category) ? true : false
                                }
                              })
                            })
                            //  setting that temporary category to the SelectedCategories array
                            setSelectedCategories(newSelectedCategories)
                          }
                          }
                          key={index}
                          className={`w-24 h-8 hover:bg-blue-500 hover:text-white  rounded-md text-blue-600 text-sm  font-medium
                          m-1 flex justify-center cursor-pointer items-center text-center ${ele?.selected ? "bg-blue-500 text-white" : "bg-gray-100"}`}
                        >
                          {ele?.category}
                        </div>
                      );
                    }

                  })
                }
                {/* category show hide button */}
                <button className=" flex items-end text-blue-300 h-8 text-lg font-medium ml-3" onClick={() => {
                  CategoryCount === 4 ? setCategoryCount(BlogCategories.length+1) : setCategoryCount(4)
                }
                }>
                  {CategoryCount === 4 ? `+${BlogCategories?.length - CategoryCount}` : "See less..."}
                </button>
              </div>
            </span>
          </div>
        </div>
        {/* end input search and display category container */}
      </div>

      {/*  All blogs will be displayed here */}
      <div className="xl:w-2/4 md:w-4/5 w-full m-auto flex flex-col-reverse overflow-y-hidden">
        {
          // mapping all the blogs and setting the properties
          blogs?.filter((ele) => {
            // return the blogs which is being selected
            if (ele?.categories.some((cat) => SelectedCategories.includes(cat)) || SelectedCategories.length === 0) {
              return ele
            }
          })?.map((ele, index) => {
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
                profileSrc={ele?.author?.profileSrc}
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
