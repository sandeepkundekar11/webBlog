import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddBlog from "./Components/Main/AddBlog";
import Home from "./Components/Main/Home";
import Login from "./Components/Main/Login";
import Profile from "./Components/Main/Profile";
import SignUp from "./Components/Main/Signup";
import ViewBlog from "./Components/Main/ViewBlog";
import PrivateComponent from "./PrivateComponent";
import store from "./Redux/Store";
const App = () => {
  return (
    // wrapped with Redux provider
    <Provider store={store}>
      {/* wrapped with browserRouter */}
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          {/* Wrapped with Protected route */}
          {/* only authenticated user only able access these protected Pages */}
          <Route path="/" element={<PrivateComponent />}>
            <Route path="/" element={<Home />} />
            <Route path="/addblog" element={<AddBlog />} />
            <Route path="/viewblog/:id" element={<ViewBlog />} />
            <Route path="/profile/:userId" element={<Profile/>}/>
          </Route>
          {/* Protected Wrapper ends */}

          {/* Not found Route */}
          {/* if user navigates to some page which is not available then this page will be written */}
          <Route path="*" element={<h1>Route not available</h1>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
export default App;
