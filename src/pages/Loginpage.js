import React, { useState } from "react";
import { TopbarNav } from "../components/TopbarNav";
import useAuth from "../hooks/useAuth";
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

export const Loginpage = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"; // capture the page where user came from, then it will navigate back to the page after login

    const handleLogin = () => {
        // setAuth({user, pwd, roles, accessToken})
        // navigate(from, {replace: true});
    }

    return (
        <div>
            
        </div>
    )
}