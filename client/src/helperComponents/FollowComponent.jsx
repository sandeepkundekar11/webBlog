import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserLogic from "../Logic/UserLogic";

const FollowComponent = ({ userArray = [], followUnfollow }) => {

    const { GetIframeColor, GetUserIcon } = UserLogic();
    const Navigate = useNavigate()
    const [users, setUsers] = useState([])
    useEffect(() => {
        // updating the following and followers array and combining the profile Iframe and color
        let updateArray = userArray.map((ele) => {
            return {
                ...ele,
                profileIframe: GetUserIcon(`${ele?.first_name} ${ele?.last_name}`),  //getting the iframe if profile src is not available
                profileColor: GetIframeColor(`${ele?.first_name}`[0])   // getting profile background color
            }
        })

        console.log(updateArray)
        setUsers(updateArray)
    }, [userArray])


    return (
        <div className="grid w-full gap-4 p-6">
            {
                users?.map((ele) => {
                    return (
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center">
                                <div className="mr-4 h-12 w-12">
                                    {
                                        ele?.profileSrc ? <img src={ele?.profileSrc} alt="User" className="h-full w-full rounded-full bg-slate-500" /> :
                                            <div style={{ backgroundColor: ele?.profileColor }} className="h-full w-full rounded-full font-semibold flex justify-center items-center" >{ele?.profileIframe}</div>
                                    }

                                </div>
                                <div>
                                    <h3 className="text-sm font-medium cursor-pointer hover:text-blue-500" onClick={() => {
                                        Navigate(`/profile/${ele._id}`)
                                    }
                                    }>{`${ele?.first_name} ${ele?.last_name}`}</h3>
                                    <p className="text-xs text-gray-500 w-16 text-wrap">{ele?.email}</p>
                                </div>
                            </div>
                            {
                                // if logged in user id and follower or following user id is same then return different button
                                ele._id === JSON.parse(localStorage.getItem("user"))?._id ? <button className="rounded-lg shadow-sm border-2 px-4 py-2 text-sm hover:bg-blue-500 font-medium">You</button> :
                                    (
                                        // if logged in user id is present in mapped followers array then logged user following mapped user
                                        ele?.followers?.includes(JSON.parse(localStorage.getItem("user"))?._id) ?
                                            <button className="rounded-lg shadow-sm border-2 px-4 py-2 text-sm hover:bg-blue-500 font-medium" onClick={() => followUnfollow(ele?._id)}>Following</button> :
                                            <button className="rounded-lg shadow-sm border-2 px-4 py-2 text-sm hover:bg-blue-500 font-medium" onClick={() => followUnfollow(ele?._id)}>Follow</button>
                                    )
                            }

                        </div>
                    )
                })
            }
        </div>
    )
}

export default FollowComponent