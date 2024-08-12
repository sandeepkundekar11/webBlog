import { useNavigate } from "react-router-dom"

const Page404 = () => {
    const Navigator=useNavigate()
    return (
        <div className="w-screen h-screen flex justify-center items-center flex-col">
            <h1 className="md:text-4xl sm:text-2xl font-extrabold">Oops, page not found!</h1>
            <p className="text-lg mt-5 font-medium text-center text-gray-600">
                The page you're looking for doesn't exist. Check the URL <br />or go back to the homepage.
            </p>
            <button className="w-40 mt-5 h-14 bg-gray-900 rounded-md text-white text-base hover:bg-gray-800"onClick={()=>
                {
                    Navigator("/")
                }
            }>Go to Homepage</button>
        </div>
    )
}
export default Page404