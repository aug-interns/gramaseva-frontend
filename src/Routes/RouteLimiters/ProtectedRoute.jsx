import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "@asgardeo/auth-react"

export const ProtectedRoute = () => {

    const { state } = useAuthContext();

    if (!state.isAuthenticated) {
        return <Navigate to={'/'} replace/>
    }

    return (
        <Outlet/>
    )
}