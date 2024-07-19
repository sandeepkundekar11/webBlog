import PopupContainerProvider from "../helperComponents/PopupContainerProvider"
import CancelPopUpIcon from "../Images/cancel_popup.png"
const ManageBlogPopup = ({ onDelete, onUpdate, onCancel }) => {
    return (
        <PopupContainerProvider>
            <div className="md:w-96 w-72 h-64 shadow-md bg-white p-2 rounded-md ManageConfirmationPopup">
                <button className="CancelManagePopup w-8 float-right hover:bg-slate-200 rounded-full h-8" onClick={onCancel}><img src={CancelPopUpIcon} alt="" /></button>
                <p className="text-lg font-medium mb-2">What would you like to do with this post?</p>

                <p className="text-base font-normal">Permanently remove the blog from </p>
                <button className="w-36 h-9 rounded-md mt-2 shadow-md bg-blue-500 hover:bg-blue-600 text-white" onClick={onUpdate}>Update Blog</button>

                <p className="text-base font-normal mt-3">  Edit the content of the post.</p>
                <button className="w-36 h-9 rounded-md mt-2 shadow-md bg-red-500 text-white hover:bg-red-600" onClick={onDelete}>Delete Blog</button>

            </div>
        </PopupContainerProvider>
    )
}
export default ManageBlogPopup