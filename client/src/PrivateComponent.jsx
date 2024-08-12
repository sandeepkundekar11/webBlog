import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "./Components/NavBar";
import { getProfileImageApiCall } from "./Redux/Actions/ProfileImageAction";

const PrivateComponent = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const Dispatch = useDispatch()
  // Authentication variable "defautl"  true
  const [authenticated, setAuthenticated] = useState(true);
  const [UserId, setUserID] = useState(null)
  //   getting the current route path
  const [path, setPath] = useState(null);
  //   using the uselocation hook for getting the current (path) route
  let location = useLocation();

  useEffect(() => {
    // setting and updating the path value when we are navigating to anather page
    setPath(location.pathname);
  }, [location.pathname]);

  // checking that user is authenticated or not
  useEffect(() => {
    // getting the token from local storage
    let token = localStorage.getItem("token");
    let userId = JSON.parse(localStorage.getItem("user"))?._id
    console.log(userId, "userId")
    setUserID(userId)
    if (token) {
      // if Token is present the user is authenticated
      setAuthenticated(true);
    } else {
      // and if token is not present then user is authenticated
      setAuthenticated(false);
    }
    Dispatch(getProfileImageApiCall())

    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

  }, []);

  return (
    <div>
      {authenticated ? (
        // if user is authenticated then return the outlate which represents all protected component like Home.jsx ....
        <>
          {/* navigation bar */}
          <NavBar path={path} userId={UserId} />
          <Outlet />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </>
      ) : (
        // if user is not authenticated then Directaly Navigate to Login page to login the user
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default PrivateComponent;
