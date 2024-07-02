import { Provider } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Components/Main/Home"
import Login from "./Components/Main/Login"
import SignUp from "./Components/Main/Signup"
import PrivateComponent from "./PrivateComponent"
import store from "./Redux/Store"
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateComponent />}>
            <Route path="home" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
export default App
