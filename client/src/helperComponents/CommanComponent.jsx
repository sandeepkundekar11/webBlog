import HomeImg from "../Images/HomeImg.png"
const CommanComponent = ({ children, heading, subHeading, text }) => {
    return (
        <div className="w-screen h-screen flex justify-center items-center md:bg-inherit bg-slate-100">
            <div className=" containerPage  flex justify-center items-center bg-slate-100 shadow-md">
                <div className="imageContainer w-96 h-5/6 bg-white p-5 joinUserBox md:block hidden">
                    <h1 className="text-5xl font-bold text-wrap text-white ">{heading}</h1>
                    <p className="mt-2 text-xl text-gray-200">{subHeading}</p>
                    <p className="mt-8 text-base text-gray-300">{text}</p>
                    <img src={HomeImg} className="mt-7 w-80 h-60" alt="" />
                </div>
                <div className="signup md:w-96 w-full h-5/6 bg-slate-100">
                    {children}
                </div>
            </div>
        </div>
    )
}
export default CommanComponent