import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import NavBar from "./Components/NavBar"

const PrivateComponent = () => {

    const [authenticated, setAuthenticated] = useState(true)

    useEffect(() => {
        let token = localStorage.getItem("token")
        if (token) {
            setAuthenticated(true)
        }
        else {
            setAuthenticated(false)
        }

    }, [])
    return (
        <div>
            {
                authenticated ? <>
                {/* navigation bar */}
                    <NavBar />
                    <Outlet />
                </> : <Navigate to='/login' />
            }
        </div>
    )
}

export default PrivateComponent