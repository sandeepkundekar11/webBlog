import SearchImg from "../../Images/SearchBar.png";
const Home = () => {
    return (
        <div className="min-h-screen max-h-full w-screen">
            {/* blog filter section */}
            <div className="blogSearchSection pt-32 ">
                {/* start input search and display category container */}
                <div className="sub-blogSearchSection m-auto flex flex-col items-center ">
                    <h1 className="text-3xl mb-5 font-bold text-white">Create, Share, Inspire with BlogSpace</h1>
                    <div className="searchInput flex  bg-gray-100 rounded-md h-10" >
                        <img className="w-12 h-full p-1" src={SearchImg} alt="" />
                        <input className=" w-full h-full bg-gray-100 pl-2 rounded-md outline-none" type="text" placeholder="Search Categories" />
                    </div>

                    {/* category container */}
                    <div className="CategoriesContainer  w-full mt-4  ">
                        <span className="flex md:flex-row flex-col ">
                            <h1 className="text-xl w-44 text-white text-start text-nowrap">Top Categories :</h1>
                            <div className=" flex flex-wrap">
                                {
                                    // displaying all the categories
                                    [1, 2, 3, 4, 5, 6, 7].map((ele) => {
                                        return (
                                            <div className="w-24 h-6 rounded-sm text-blue-600 text-sm bg-gray-100 font-medium
                                                m-1 flex justify-center cursor-pointer items-center text-center">
                                                {"Technology"}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </span>
                    </div>

                    {/* search Blog button */}
                    <button className="mt-6 w-24 h-10 bg-blue-600 hover:bg-blue-700 text-white shadow-md rounded-md">Get Started</button>
                </div>
                {/* end input search and display category container */}
            </div>

            {/*  All blogs will be displayed here */}
            <div>
                <h1>All Blogs come here</h1>
            </div>
        </div>
    )
};
export default Home