import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, Provider } from 'react-redux'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { NotificationView } from "../components/NotificationView";

export default function Homepage() {
    const { loading, state } = useSelector(state => ({
        loading: state.counterReducer.loading,
        state: state.counterReducer,
    }));

    const dispatch = useDispatch()

    console.log(state)

    return (
        <div className="App">
            <div
                style={{
                    width: "100%",
                    height: "80px",
                    backgroundColor: "white",
                    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                    display: "flex",
                }}
            >
                New-Logistics
            </div>
            {/* swipeable images */}
            <Carousel
                showThumbs={false}
                swipeable={true}
                axis="horizontal"
                showStatus={false}
            >
                <div>
                    <img src="https://img.freepik.com/premium-photo/transportation-logistics-container-cargo-ship-cargo-plane-3d-rendering-illustration_37416-487.jpg?w=2000" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="https://blog.solistica.com/hubfs/Fotos%20e%20infograf%C3%ADa%20Blogs%20Q4/Fotos%20Q4%20Noviembre%202020/Fotos%20Diciembre%20Q4%2020202/SOL-S13-B1-Blog%20Image%2002-1.jpg" />
                    <p className="legend">Legend 2</p>
                </div>
            </Carousel>

            <div
                style={{ margin: "10px 20px 0px 20px" }}
            >
                {/* notification area */}
                <NotificationView message="This is a notification" />
            </div>

        </div>
    );
}