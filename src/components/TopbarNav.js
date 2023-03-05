import React from "react";
import HamburgerMenu from "./Menu";
import useAuth from "../hooks/useAuth";
import PersonIcon from '@mui/icons-material/Person';
import { Button, IconButton, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useWindowDimensions } from "../tools/Helpers";
import { NavLink } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import logo from "../assets/EZ_logo.png"
export const TopbarNav = () => {
    const { auth } = useAuth()
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
            {/* <HamburgerMenu /> */}
            <div className="row">
                <label><img src={logo} height="25px" style={{ paddingLeft: "20px", paddingRight: "10px" }} />  壹智国际物流 </label>
            </div>
            {/* <div className="col align-self-center ">
                <label>  壹智国际物流 </label>
            </div> */}
            <div className="col align-self-center d-flex flex-row-reverse">
                <NavLink to={auth.UserID !== null ? "/profile" : "/login"} style={{ textDecoration: 'none' }}>
                    <IconButton><LogoutIcon sx={{ color: "white" }} /> <Typography style={{ color: "white" }}>退出</Typography> </IconButton>

                    {/* {
                        width > 768 ? (
                            <Button style={{ marginRight: '10px', width: '100px', backgroundColor: 'white' }} variant="contained">{auth.UserID !== undefined ? '我的账号' : '点击注册'}</Button>
                        ) : (
                            <IconButton sx={{ color: 'white' }}>
                                <AccountCircleIcon />
                            </IconButton>
                        )
                    } */}
                </NavLink>
            </div>
        </div>
    )
}