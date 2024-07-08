// import likeImg from "../../Images/Like.png"
import CommentImg from "../../Images/Comment.png"
import ShareImg from "../../Images/share.png"
import unlikeImg from "../../Images/unLike.png"
const ViewBlog = () => {
    return (
        <div className="h-full w-full pt-20 pb-10">
            {/* subBlog container */}
            <div className="viewBlog md:w-4/5 w-11/12 m-auto">
                {/* blog heading */}
                <h1 className="ViewBlogHead text-4xl font-semibold"> SNMP Trap sender application</h1>

               {/* blog profile */}
                <div className="blogProfile flex mt-3 items-center">
                    {/* profile pic */}
                    <img className="w-16 h-16 bg-slate-500 rounded-full" src="" alt="" />
                    {/* profile info start*/}
                    {/* if we are seeing others blog then name and fallow button will be visible */}
                    {/* if we are seeing personal blog then name and Email will be visible */}
                    <div className=" ml-3">
                        <h1 className="text-xl font-medium">Sandeep n K</h1>
                        <button className="bg-blue-600 rounded-xl w-28 mt-2 text-white h-8">Follow</button>
                        {/* <p>Sandeep1000@gmail.com</p> */}
                    </div>
                </div>

                {/* profile Image */}
                <div className="w-full h-96 bg-slate-200 rounded-lg mt-6">
                    <img className="h-96 w-auto m-auto bg-slate-500  rounded-md" src="http://localhost:8000/1720415175887_update_uplodmib_screen.png" alt="" />
                </div>


                {/* Blog Categories List */}
                <div className="viewBlogCategories flex flex-wrap mt-3">
                    {
                        [1, 2].map((ele, index) => {
                            return (
                                <div className="w-auto p-2 h-10 ml-3 bg-slate-100 rounded-3xl border" key={index}>Technology</div>
                            )
                        })
                    }
                </div>

                {/* Blog content */}
                <p className="mt-4 text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam neque quibusdam sit reprehenderit dicta ipsum enim iure molestias delectus? Assumenda, dignissimos veritatis atque quia recusandae suscipit aliquid esse id porro Lorem ipsum dolor sit amet consectetur adipisicing elit. At consectetur quidem itaque fuga voluptates assumenda? Odit alias quis
                    laudantium commodi nisi, enim voluptatibus molestiae doloribus illo laboriosam, vitae facere libero..</p>



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

        </div>
    )
}
export default ViewBlog