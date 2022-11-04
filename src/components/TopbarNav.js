import React from "react";
import HamburgerMenu from "./Menu";
import useAuth from "../hooks/useAuth";
import PersonIcon from '@mui/icons-material/Person';
import { Button, IconButton } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useWindowDimensions } from "../tools/Helpers";
import { NavLink } from "react-router-dom";

export const TopbarNav = () => {
    const { auth } = useAuth()
    const { width } = useWindowDimensions();

    return (
        <div
            style={{
                height: "80px",
                backgroundColor: "#5A98B7",
                color: 'white',
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                display: "flex",
                alignItems: "center",
                flexFlow: 'row',
                flexWrap: 'nowrap',
                alignContent: 'space-between',
                paddingTop: "10px",
                paddingBottom: "10px",
                width: "100%",
            }}
        >
            <HamburgerMenu />
            <div className="col" />
            <div className="col align-self-center text-center">
                <h2>
                    雅威国际物流
                </h2>
            </div>
            <div className="col align-self-center d-flex flex-row-reverse">
                <NavLink to={auth.UserID !== null ? "/profile" : "/login"} style={{ textDecoration: 'none' }}>
                    {
                        width > 768 ? (
                            <Button style={{ marginRight: '10px', width: '100px', backgroundColor: 'white' }} variant="contained">{auth.UserID !== undefined ? '我的账号' : '点击注册'}</Button>
                        ) : (
                            <IconButton sx={{ color: 'white' }}>
                                <AccountCircleIcon />
                            </IconButton>
                        )
                    }
                </NavLink>
            </div>
        </div>
    )
}