import { toast } from "react-toastify";

const ToasterLogic = () => {
  const successToaster=(message) => toast.success(message, {
    position: "top-center",
    autoClose: 5000,
    newestOnTo:false,
    hideProgressBar:true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme:"dark"
  });

  const errorToaster=(message)=>toast.error(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  return { successToaster,errorToaster}
};

export default ToasterLogic
