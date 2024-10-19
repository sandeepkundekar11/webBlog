import { useState } from "react"
import { useDispatch } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import ToasterLogic from "../Logic/ToasterLogic"
import { DeleteUserApiCall } from "../Redux/Actions/DeleteUserAction"
import PopupContainerProvider from "./PopupContainerProvider"
const DeleteProfilePopup = ({ text }) => {
    const [showDeletePopup, setDeletePopup] = useState(false)
    const [TypedValue, setTypedValue] = useState()
    const Dispatch = useDispatch()
    const Navigate = useNavigate()
    const { successToaster } = ToasterLogic()
    const OnDeleteuser = () => {
        if (TypedValue === "DELETE") {
            Dispatch(DeleteUserApiCall(successToaster, Navigate))
            setDeletePopup(false)
        }
    }
    return (
        <div>
            <p className="text-base text-blue-700 hover:font-bold transition-all font-medium cursor-pointer mt-5" onClick={() => {
                setDeletePopup(true)
            }}>{text}</p>
            {
                showDeletePopup &&
                <PopupContainerProvider>
                    <div className=" DeleteProfilePopup bg-white rounded-md shadow-md p-2">
                        <h1 className="text-2xl font-medium text-center">Delete Profile</h1>
                        <p className="text-base text-red-600 font-medium mt-4 text-center">Are you sure you want to delete your profile? This action is irreversible.</p>
                        <p className="text-base font-normal text-gray-600 mt-4 text-center">All your data, including your profile information, settings, and saved content, will be permanently deleted.</p>
                        <p className="text-base font-normal text-center text-gray-600 mt-5">If you just want to deactivate your profile temporarily, consider <NavLink className="text-blue-500">Logout</NavLink> instead.</p>

                        <p className="text-base font-normal text-center mt-5">Please type <span className="text-lg font-semibold">'DELETE'</span> to confirm:</p>
                        <input value={TypedValue} onChange={(e) => {
                            setTypedValue(e.target.value)
                        }} className="w-full h-11 rounded-md border-2 pl-2  focus:border-2 outline-none focus:border-red-600" type="text" name="" id="" />

                        <div className="buttons flex justify-between mt-2">
                            <button onClick={() => {
                                setDeletePopup(false)
                            }} className=" bg-blue-500 px-2 rounded-md text-white h-10 border shadow-md">Cancel</button>
                            <button onClick={OnDeleteuser} className={`h-10 text-white ${TypedValue === "DELETE" ? "bg-red-600 cursor-pointer" : "bg-gray-600 cursor-not-allowed"} px-2 rounded-md border shadow-md`}>Delete Profile</button>
                        </div>
                    </div>
                </PopupContainerProvider>
            }

        </div>
    )
}
export default DeleteProfilePopup