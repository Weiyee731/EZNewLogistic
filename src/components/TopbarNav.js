import React from "react";
import HamburgerMenu from "./Menu";

export const TopbarNav = () => {
    return (
        <div
            style={{
                height: "80px",
                backgroundColor: "white",
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                display: "flex",
                alignItems: "center",
                paddingTop: "10px",
                paddingBottom: "10px",
                paddingY: "10px",
            }}
        >
            <div style={{

            }}>
                <HamburgerMenu></HamburgerMenu>
            </div>
            <div style={{
                width: '100%',
                textAlign: 'center'
            }}>
                <h2>
                    New-Logistics
                </h2>
            </div>
        </div>
    )
}