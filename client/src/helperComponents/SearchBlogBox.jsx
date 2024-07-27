
const SearchBlogBox = ({ BlogHading, blogSrc, blogAuthor,onClickHandle }) => {

    return (
        <div className="w-full flex max-h-28 bg-white rounded-md  hover:bg-blue-50 p-2 cursor-pointer" onClick={onClickHandle}>
            {
                blogSrc &&
                <div className="w-auto">
                    <img className="w-24 h-24 bg-slate-300" src={blogSrc} alt="" />
                </div>
            }
            <div className="w-auto  ml-2 ">
                <h1 className="text-2xl font-semibold">{BlogHading}</h1>
                <span className="flex items-center">
                    <p className="text-sm font-medium">Author</p>
                    <p>-</p>
                    <p className="text-sm text-gray-600 font-medium">{blogAuthor}</p>
                </span>
            </div>
        </div>
    )
}
export default SearchBlogBox