import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"

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
                    <Outlet />
                </> : <Navigate to='/login' />
            }
        </div>
    )
}

export default PrivateComponent