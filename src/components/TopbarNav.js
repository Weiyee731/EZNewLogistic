import React from "react";
import useAuth from "../hooks/useAuth";
import { Button, IconButton, Typography } from "@mui/material";
import { useWindowDimensions } from "../tools/Helpers";
import { NavLink } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import logo from "../assets/EZ_logo.png"
export const TopbarNav = () => {
    const { auth, setAuth } = useAuth()
    const { width } = useWindowDimensions();

    return (
        <div
            style={{
                height: "35px",
                backgroundColor: "#23395d",
                color: 'white',
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                display: "flex",
                alignItems: "center",
                flexFlow: 'row',
                flexWrap: 'nowrap',
                alignContent: 'space-between',
                paddingTop: "10px",
                paddingBottom: "10px",
                paddingRight: "10px",
                width: "100%",
            }}
        >
            <div className="row">
                <label><img src={logo} height="25px" style={{ paddingLeft: "20px", paddingRight: "10px" }} />  壹智国际物流 </label>
            </div>
            {
                localStorage.getItem("user") !== "" &&
                <div className="col align-self-center d-flex flex-row-reverse">
                    <NavLink to={auth.UserID !== null ? "/profile" : "/login"} style={{ textDecoration: 'none' }}>
                        <IconButton onClick={() => {
                            setAuth({})
                            localStorage.setItem("user", "")
                        }}><LogoutIcon sx={{ color: "white" }} /> <Typography style={{ color: "white" }}>退出</Typography> </IconButton>
                    </NavLink>
                </div>
            }

        </div>
    )
}