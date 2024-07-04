import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Main/Home";
import Login from "./Components/Main/Login";
import SignUp from "./Components/Main/Signup";
import PrivateComponent from "./PrivateComponent";
import store from "./Redux/Store";
import AddBlog from "./Components/Main/AddBlog";
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
