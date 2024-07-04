import { useState } from 'react';
import Select from 'react-select';
import { blogCategories, customStyles } from '../../Constants';
import uploadImg from "../../Images/Upload-img.png";
const AddBlog = () => {
  // blog information state
  const [Blog, setBlog] = useState({
    image: null,
    heading: "",
    content: "",
    categories: []
  })

  // image user State
  const [imgUrl, setImgUrl] = useState(null)

  // handle add image function
  const HandleImage = (e) => {
    // get the image file
    let imgFile = e.target.files[0]
    // create its url and store in one variable
    let imgSource = URL.createObjectURL(imgFile)
    // set in setUrl state
    setImgUrl(imgSource)
    // setting in Blog information state
    setBlog({
      ...Blog,
      image: imgFile
    })
  }


  // handle remove image 
  const RemoveImage = () => {
    // setting Image user to null
    setImgUrl(null)
    // setting blog image to null
    setBlog({
      ...Blog,
      image: null
    })
    console.log(Blog)

  }
  return <>
    <div className="addBlogContainer pt-20">
      <h1 className='text-center text-3xl font-bold'>Create Post</h1>
      <div className="addSubContainer">
        {/* add sub Container */}
        {/* in this blog we are adding blog image and show in one box and that image preview is removed on cancel */}
        <div className="addImg h-40 w-full bg-slate-300 flex flex-col justify-center items-center">
          <button className='w-48 h-10 bg-white relative rounded-lg'>
            <input type="file" onChange={HandleImage} className='absolute w-full h-full left-0  p-0 opacity-0 group' />
            <span className='flex p-2 group-hover:text-white  text-blue-500'>
              <img className='h-7 w-8 ' src={uploadImg} alt="" />
              <p className='font-medium  '>Upload Main Image</p>
            </span>
          </button>
          {
            // image preview
            Blog?.image !== null && (
              <div className='relative'>
                <button className='bg-white rounded-full w-7 h-7 absolute -top-1 hover:bgb' onClick={RemoveImage}>X</button>
                <img className='w-20 h-20 bg-slate-50 mt-3' src={imgUrl} alt="" />
              </div>
            )
          }
          {/* <h1 className='text-white mt-1'>{Blog.image}</h1> */}
        </div>
        {/* add blog content */}
        <div className="blogContent mt-4">
          {/* title */}
          <div className="title">
            <p className="text-lg font-medium pb-2">Title</p>
            <input type="text" className="w-full h-10 border-2 pl-3 outline-none focus:border-blue-500" placeholder="Title" />
          </div>
          {/* blog body (content) */}
          <div className="Content">
            <p className="text-lg font-medium mt-3 pb-2"> Content</p>
            <textarea rows={5} placeholder="Type your blog" name="" id="" className=" outline-none w-full border-2 pl-3 p-2 focus:border-blue-500"></textarea>
          </div>
          {/* categories */}
          <div className="categories">
            {/* using the multi select dropdown */}
            <p className="text-lg font-medium mt-2">Select Categories</p>
            <Select className='w-full h-10 ' isMulti options={blogCategories} styles={customStyles} />
          </div>
        </div>
      </div>
    </div>
  </>;
};
export default AddBlog;
