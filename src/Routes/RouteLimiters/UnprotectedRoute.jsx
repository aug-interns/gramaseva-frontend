import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "@asgardeo/auth-react";

export const UnprotectedRoute = () => {

    const { state } = useAuthContext();

    if (state.isAuthenticated) {
        return <Navigate to={'/home'} replace/>
    }

    return (
        <Outlet/>
    )
}