import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { blogCategories, customStyles, editorConfig } from "../../Constants";
import Loader from "../../helperComponents/Loader";
import uploadImg from "../../Images/Upload-img.png";
import { addBlogApiCall } from "../../Redux/Actions/AddblogAction";
const AddBlog = () => {
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const editor = useRef(null);
  const { addBlogLoading, addBlogMessage, addBlogError } = useSelector(
    (state) => state.addBlog
  );
  const FileRef = useRef(null);
  // blog information state
  const [Blog, setBlog] = useState({
    image: null,
    heading: "",
    content: "",
    categories: [],
  });

  // Blog Warning
  const [BlogWarning, setBlogWarning] = useState({
    headingWarning: "",
    ContentWarning: "",
    CategoryWarning: "",
  });

  // image user State
  const [imgUrl, setImgUrl] = useState(null);

  // handle add image function
  const HandleImage = (e) => {
    // get the image file
    let imgFile = e.target.files[0];
    // create its url and store in one variable
    let imgSource = URL.createObjectURL(imgFile);
    // set in setUrl state
    setImgUrl(imgSource);
    // setting in Blog information state
    setBlog({
      ...Blog,
      image: imgFile,
    });
  };

  // handle remove image
  const RemoveImage = () => {
    // setting Image user to null
    setImgUrl(null);
    // setting blog image to null
    setBlog({
      ...Blog,
      image: null,
    });

    FileRef.current.value = null;
    console.log(Blog);
  };

  // handle blog heading and Blog content

  const HandleBlogInput = (e) => {
    let { name, value } = e.target;
    setBlog({
      ...Blog,
      [name]: value,
    });
  };

  //
  const PublishBlog = () => {
    let newWarning = {
      headingWarning: "",
      ContentWarning: "",
      CategoryWarning: "",
    };

    //checking blog heading is entered or not if not then will through the warning
    if (Blog.heading.length <= 5) {
      newWarning.headingWarning = "Heading can't be less then 6 characters";
    } else {
      newWarning.headingWarning = "";
    }

    // Checking if Blog content is entered or not if not then will through the warning
    if (Blog.content.length <= 9) {
      newWarning.ContentWarning = "Content can't be less then 10 characters";
    } else {
      newWarning.ContentWarning = "";
    }

    // checking if Blog categories are added or not if not then through the warning

    if (Blog.categories.length < 1) {
      newWarning.CategoryWarning = "Please Enter Atlist one category";
    } else {
      newWarning.CategoryWarning = "";
    }

    setBlogWarning(newWarning);

    // checking for all the blog fields conditions

    if (
      Blog.heading.length >= 6 &&
      Blog.content.length >=10 &&
      Blog.categories.length > 0
    ) {
      // call api
      let formData = new FormData();
      formData.append("heading", Blog.heading);
      let blogCategories = Blog.categories.map((ele) => ele.value);
      formData.append("categories", blogCategories);
      formData.append("blog", Blog.image);
      formData.append("content", Blog.content);

      Dispatch(addBlogApiCall(formData, navigate));
    }
  };
  return (
    <>
      <div className="addBlogContainer pt-20">
        <h1 className="text-start text-2xl ml-4 text-gray-500 font-bold">
          Create Post
        </h1>
        <div className="addSubContainer">
          {/* add sub Container */}
          {/* in this blog we are adding blog image and show in one box and that image preview is removed on cancel */}
          <div className="addImg h-40 w-full bg-slate-300 flex flex-col justify-center items-center">
            <button className="w-48 h-10 bg-white relative rounded-lg">
              <input
                type="file"
                name="blog"
                ref={FileRef}
                onChange={HandleImage}
                className="absolute w-full h-full left-0  p-0 opacity-0 group"
              />
              <span className="flex p-2 group-hover:text-white  text-blue-500">
                <img className="h-7 w-8 " src={uploadImg} alt="" />
                <p className="font-medium  ">Upload Main Image</p>
              </span>
            </button>
            {
              // image preview
              Blog?.image !== null && (
                <div className="relative">
                  <button
                    className="bg-white rounded-full w-7 h-7 absolute -top-1 hover:bg-blue-500"
                    onClick={RemoveImage}
                  >
                    X
                  </button>
                  <img
                    className="w-40 h-20 bg-slate-50 mt-3"
                    src={imgUrl}
                    alt=""
                  />
                </div>
              )
            }
            {/* <h1 className='text-white mt-1'>{Blog.image}</h1> */}
          </div>
          {/* add blog content */}
          <div className="blogContent mt-4">
            {/* title */}
            <div className="Heading">
             
              <textarea
                type="text"
                name="heading"
                onChange={HandleBlogInput}
                className="w-full  placeholder:font-extrabold min-h-12 max-h-36 md:text-4xl sm:text-xl font-extrabold pl-3 outline-none placeholder:text-gray-700 text-black"
                placeholder="New Post Title here ...."
              />
              {/* heading warning */}
              <p className="text-sm text-red-500 font-medium">
                {BlogWarning.headingWarning}
              </p>
            </div>
            {/* blog body (content) */}
            <div className="Content">
            
              <JoditEditor   className='jodit-container' config={editorConfig}  ref={editor} value={Blog.content} onChange={(newContent) => {
                setBlog({
                  ...Blog,
                  content: newContent
                })
              }
              }/>
              {/* content warning */}
              <div className="w-full flex justify-between">
                <p className="text-sm text-red-500 font-medium">
                  {BlogWarning.ContentWarning}
                </p>{" "}
                <span>{Blog.content.length}/Max</span>
              </div>
            </div>
            {/* categories */}
            <div className="categories">
              {/* using the multi select dropdown */}

              <Select
                className="w-full h-10 border-none outline-none"
                isMulti
                placeholder="Select The Categories"
                options={blogCategories}
                styles={customStyles}
                defaultValue={Blog.categories}
                onChange={(value) => {
                  setBlog({
                    ...Blog,
                    categories: value,
                  });
                }}
              />
              {/* categories warning */}
              <p className="text-sm text-red-500 font-medium">
                {BlogWarning.CategoryWarning}
              </p>
            </div>
          </div>

          {/* public blog button */}
          <div className="flex justify-end mt-4">
            <button
              className="w-24 h-10 bg-blue-600 text-white rounded-md hover:bg-blue-900"
              onClick={PublishBlog}
            >
              Publish
            </button>
          </div>
        </div>

        {addBlogLoading && <Loader />}
      </div>
    </>
  );
};
export default AddBlog;
