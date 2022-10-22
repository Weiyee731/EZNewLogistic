import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, Provider } from 'react-redux'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { NotificationView } from "../components/NotificationView";
import { Button, TextField } from "@mui/material";
import { GitAction } from "../store/action/gitAction";

export default function Homepage() {
    const { loading, state, viewNotification, parcelStatus } = useSelector(state => ({
        loading: state.counterReducer.loading,
        state: state.counterReducer,
        viewNotification: state.counterReducer.viewNotification,
        parcelStatus: state.counterReducer.parcelStatus,
    }));

    const dispatch = useDispatch()

    const [trackingNumber, setTrackingNumber] = useState("");

    useEffect(() => {
        dispatch(GitAction.CallGetNotification({ status: 1 }))
    }, [])

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
                Notifications
                {viewNotification && viewNotification.length > 0 ? viewNotification.map((item, index) => {
                    return (
                        <NotificationView
                            message={item.NotificationDesc}
                            title={item.NotificationTitle}
                            date={item.Column1}
                        />
                    )
                })
                    :
                    <div
                        style={{
                            textAlign: 'center',
                            fontWeight: 'bold'
                        }}
                    >
                        No notification for the moment / 目前没有任何通告
                    </div>
                }

                {/* notification area */}
                <div
                    style={{
                        marginTop: "20px",
                    }}
                >
                    Check status
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginTop: '20px',
                            justifyContent: 'space-between'
                        }}
                    >
                        <TextField
                            sx={{
                                width: "80%",
                            }}
                            id="trackingNumber"
                            type="text"
                            label="Tracking Number"
                            onChange={(e) => setTrackingNumber(e.target.value)}
                            value={trackingNumber}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                width: "15%",
                            }}
                            onClick={() => dispatch(GitAction.CallGetParcelStatus({ trackingNumber: `and TrackingNumber='${trackingNumber}'` }))}
                        >
                            Search
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
}