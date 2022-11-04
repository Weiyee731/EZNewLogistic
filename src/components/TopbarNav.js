import React from "react";
import HamburgerMenu from "./Menu";
import useAuth from "../hooks/useAuth";
import PersonIcon from '@mui/icons-material/Person';
import { Button } from "@mui/material";

export const TopbarNav = () => {
    const { auth } = useAuth()

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
            }}
        >
            <div className="col-3">
                <HamburgerMenu></HamburgerMenu>
            </div>
            <div className="col-8" style={{ textAlign: 'center' }}>
                <h2>
                    雅威国际物流
                </h2>
                
            </div>
            
            <Button className="col-1" style={{marginRight: '10px', width: '100px'}} variant="contained">点击注册</Button>
        </div>
    )
}