const PopupContainerProvider=({children})=>
{
    return(
        <div className="w-screen h-screen fixed top-0 left-0 popupProvider flex justify-center items-center z-50">{children}</div>
    )
}
export default PopupContainerProvider