import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { isStringNullOrEmpty } from "../Repository/Helper";

const RequireAuth = () => {
    const { auth, setAuth } = useAuth();
    const location = useLocation();

    useEffect(() => {
        let logonUser = localStorage.getItem("user")
        try {
            logonUser = JSON.parse(logonUser)
            if (!isStringNullOrEmpty(logonUser.UserID) && !isStringNullOrEmpty(logonUser.Username)) {
                setAuth(logonUser)
            }
        }
        catch (Exceptions) {
            localStorage.setItem("user", '')
        }
    }, [])
    
    return (
        auth?.UserID && auth?.Username
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth;