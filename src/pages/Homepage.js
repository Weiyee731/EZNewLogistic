import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, Provider } from 'react-redux'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { NotificationView } from "../components/NotificationView";
import { TextField } from "@mui/material";
import Footer from "../components/Footer/Footer";
import { TopbarNav } from "../components/TopbarNav";
import { GitAction } from "../store/action/gitAction";

export default function Homepage() {
    const { loading, state, viewNotification } = useSelector(state => ({
        loading: state.counterReducer.loading,
        state: state.counterReducer,
        viewNotification: state.counterReducer.viewNotification,
    }));

    const dispatch = useDispatch()

    const [trackingNumber, setTrackingNumber] = useState("");

    useEffect(() => {
        dispatch(GitAction.CallGetNotification())
    }, [])

    const fetchNotfication = () => {

    }

    return (
        <div>
            {/* swipeable images */}
            <Carousel
                showThumbs={false}
                swipeable={true}
                axis="horizontal"
                showStatus={false}
                infiniteLoop={true}
                autoPlay={true}
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
                <NotificationView type={"success"} message="This is a notification" />

                {/* notification area */}
                <div
                    style={{
                        marginTop: "10px",
                    }}
                >
                    Check status
                    <br />
                    <TextField
                        sx={{
                            width: "100%",
                        }}
                        id="trackingNumber"
                        type="text"
                        label="Tracking Number"
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        value={trackingNumber}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}