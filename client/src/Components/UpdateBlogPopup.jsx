import JoditEditor from 'jodit-react';
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { blogCategories, customStyles } from "../Constants";
import PopupContainerProvider from "../helperComponents/PopupContainerProvider";
const UpdateBlogPopup = ({ ImageUrl, Heading, Content, SelectedCategoriesArr = [],onCancel }) => {
    const [UpdateBlog, setUpdateBlog] = useState({
        ImageUrl: "",
        blogHeading: "",
        BlogContent: "",
        BlogSelectedCategoriesArr: []
    })
    const EditorRef = useRef()

    useEffect(() => {
        setUpdateBlog({
            ImageUrl: ImageUrl,
            blogHeading: Heading,
            BlogContent: Content,
            BlogSelectedCategoriesArr: [...SelectedCategoriesArr] || []
        })
    }, [Content, Heading, ImageUrl, SelectedCategoriesArr])
    return (
        <PopupContainerProvider>
            {/* update blog section */}
            <div className="UpdateBlogPopup p-4 overflow-hidden">
                <h1 className="text-start md:text-2xl text-xl font-semibold">Update Profile</h1>

                <div className="blogSection">
                    <div className="BlogImage w-full h-40 mt-4 bg-slate-100 updateBlogImage ">
                        <img src={UpdateBlog?.ImageUrl} alt="das" />
                    </div>
                    <div className="UpdateHeading">
                        <input value={UpdateBlog?.blogHeading} className="w-full outline-none focus:border-blue-300 h-10 border-2 rounded-md mt-3 pl-2" placeholder="Update The Heading" type="text" name="" id="" />
                    </div>
                    <div className="UpdateBlogContent">
                        <JoditEditor value={UpdateBlog?.BlogContent} className='mt-3' ref={EditorRef} onChange={(newContent) => {
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
                            defaultValue={UpdateBlog?.BlogSelectedCategoriesArr}
                            isMulti={true}
                            // filtering the blogCategories and shows only not selected categories
                            options={blogCategories.filter((ele) => {
                                return UpdateBlog?.BlogSelectedCategoriesArr.includes(ele?.value)
                            })}
                            classNamePrefix="select"
                            styles={customStyles}
                            onChange={() => {

                            }} // Update state on change
                        />
                    </div>

                    <div className="updateBlogButtons flex mt-6">
                        <button className="w-28 h-10 bg-blue-500 shadow-md rounded-md mr-8 text-white hover:bg-blue-600">Update</button>
                        <button className="w-28 h-10 bg-red-400 shadow-md rounded-md text-white hover:bg-red-600" onClick={onCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </PopupContainerProvider>
    )
}
export default UpdateBlogPopup