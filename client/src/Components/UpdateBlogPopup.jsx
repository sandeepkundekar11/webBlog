import JoditEditor from 'jodit-react';
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { blogCategories, customStyles, editorConfig } from "../Constants";
import PopupContainerProvider from "../helperComponents/PopupContainerProvider";
const UpdateBlogPopup = ({ ImageUrl=null, Heading, Content, SelectedCategoriesArr = [], onCancel }) => {
    const [UpdateBlog, setUpdateBlog] = useState({
        ImageUrl: null,
        blogHeading: "",
        BlogContent: "",
        BlogSelectedCategoriesArr: []
    })
    const ImageRef = useRef(null)
    // image state to store the url of the updated image
    const [BlogImage, setBlogImage] = useState(null)
    const EditorRef = useRef()

    useEffect(() => {
        // setting the Initial Update Value
        setUpdateBlog({
            ImageUrl: ImageUrl,
            blogHeading: Heading,
            BlogContent: Content,
            BlogSelectedCategoriesArr: SelectedCategoriesArr
        })
    }, [Content, Heading, ImageUrl, SelectedCategoriesArr])
    return (
        <PopupContainerProvider>
            {/* update blog section */}
            <div className="UpdateBlogPopup p-4 overflow-hidden">
                <h1 className="text-start md:text-3xl text-xl font-bold text-blue-500">Update Profile</h1>

                <div className="blogSection">

                    <div className='m-auto h-48 w-full bg-slate-50 rounded-md'>
                        {
                            // if the Blog image or updated image is not null then we will display that image
                            (UpdateBlog?.ImageUrl!==null || BlogImage !== null) ? <div className="BlogImage relative w-3/4 m-auto h-48  mt-4 bg-slate-100 updateBlogImage ">
                                <button className='absolute -top-2 -right-2 w-8 h-8 bg-slate-400 text-black hover:text-white hover:bg-red-500 shadow-lg rounded-full ' onClick={() => {
                                    setUpdateBlog({ ...UpdateBlog, ImageUrl: null })
                                    setBlogImage(null)
                                    // ImageRef.current.value = null
                                }}>X</button>
                                <img className="h-full m-auto" src={ BlogImage || UpdateBlog?.ImageUrl } alt="das" />
                            </div>
                            // else displaying the input field to add the image
                                :
                                <div className="w-full h-full mt-3 m-auto flex justify-center items-center">
                                    <input ref={ImageRef} type="file" onChange={(e) => {
                                        let file = e.target.files[0]
                                        let ImageSrc = URL.createObjectURL(file)
                                        setUpdateBlog({
                                            ...UpdateBlog,
                                            ImageUrl:file
                                        })
                                        setBlogImage(ImageSrc)
                                        console.log(file)
                                    }} />
                                </div>
                        }

                    </div>

                    <div className="UpdateHeading">
                        <textarea onChange={(e) => {
                            setUpdateBlog({
                                ...UpdateBlog,
                                blogHeading: e.target.value
                            })
                        }} value={UpdateBlog?.blogHeading} className="w-full mt-4  placeholder:font-extrabold min-h-12 max-h-36 md:text-4xl sm:text-xl font-extrabold pl-3 outline-none placeholder:text-gray-700 text-black" placeholder="Update The Heading" type="text" name="" id="" />
                    </div>
                    <div className="UpdateBlogContent h-full">
                        <JoditEditor className='jodit-container mt-3' config={editorConfig} value={UpdateBlog?.BlogContent} ref={EditorRef} onChange={(newContent) => {
                            setUpdateBlog({
                                ...UpdateBlog,
                                BlogContent: newContent
                            })
                        }
                        } />
                    </div>
                    <div className="updateBlogCategories">
                        <Select
                            className="w-full h-10 mt-3"

                            value={UpdateBlog.BlogSelectedCategoriesArr}
                            isMulti={true}
                            // filtering the blogCategories and shows only not selected categories
                            options={blogCategories.filter((ele) => {
                                return !UpdateBlog.BlogSelectedCategoriesArr.some((cat) => cat.value === ele.value)
                            })}
                            classNamePrefix="select"
                            styles={customStyles}
                            onChange={(value) => {
                                console.log(value)
                                setUpdateBlog({
                                    ...UpdateBlog,
                                    BlogSelectedCategoriesArr: value
                                })
                            }} // Update state on change
                        />
                    </div>

                    <div className="updateBlogButtons flex mt-6">
                        <button className="w-28 h-10 bg-blue-500 shadow-md rounded-md mr-8 text-white hover:bg-blue-600" onClick={() => {
                            console.log(UpdateBlog)
                        }}>Update</button>
                        <button className="w-28 h-10 bg-red-400 shadow-md rounded-md text-white hover:bg-red-600" onClick={onCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </PopupContainerProvider>
    )
}
export default UpdateBlogPopup