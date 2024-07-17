const {
  default: PopupContainerProvider,
} = require("../helperComponents/PopupContainerProvider");

const UpdateProfilePopup = () => {
  return (
    <PopupContainerProvider>
      <div className="updateProfilePopup"></div>
    </PopupContainerProvider>
  );
};

export default UpdateProfilePopup;
