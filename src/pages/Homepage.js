import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, Provider } from 'react-redux'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { NotificationView } from "../components/NotificationView";
import { Button, TextField, Typography } from "@mui/material";
import { GitAction } from "../store/action/gitAction";
import { BasicAlertDialog } from "../components/BasicAlertDialog";
import { useTheme } from '@mui/material/styles';

export default function Homepage() {
    const { loading, state, viewNotification, parcelStatus } = useSelector(state => ({
        loading: state.counterReducer.loading,
        state: state.counterReducer,
        viewNotification: state.counterReducer.viewNotification,
        parcelStatus: state.counterReducer.parcelStatus,
    }));

    const dispatch = useDispatch()

    const [trackingNumber, setTrackingNumber] = useState("");
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    const handleOpenClose = () => {
        setOpen(!open);

    };

    useEffect(() => {
        dispatch(GitAction.CallGetNotification({ status: 1 }))
    }, [])

    useEffect(() => {
        if (parcelStatus && parcelStatus.length > 0) {
            handleOpenClose();
        }
        return () => {
            setTrackingNumber("");
        }
    }, [parcelStatus])

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
                labels={false}
                showArrows={false}
            >
                <div>
                    <img src="https://img.freepik.com/premium-photo/transportation-logistics-container-cargo-ship-cargo-plane-3d-rendering-illustration_37416-487.jpg?w=2000" />
                </div>
                <div>
                    <img src="https://blog.solistica.com/hubfs/Fotos%20e%20infograf%C3%ADa%20Blogs%20Q4/Fotos%20Q4%20Noviembre%202020/Fotos%20Diciembre%20Q4%2020202/SOL-S13-B1-Blog%20Image%2002-1.jpg" />
                </div>
            </Carousel>

            <div
                style={{ margin: "40px 40px 0px 40px" }}
            >
                {/* notification area */}
                <Typography
                    variant="h4"
                    style={{ fontWeight: "bold", color: 'black' }}
                >
                    Notifications
                </Typography>
                {viewNotification && viewNotification.length > 0 ? viewNotification.map((item, index) => {
                    return (
                        <NotificationView
                            key={index}
                            message={item.NotificationDesc}
                            title={item.NotificationTitle}
                            date={item.CreatedDate}
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
                        marginTop: "80px",
                    }}
                >
                    <Typography
                        variant="h4"
                        style={{ fontWeight: "bold", color: 'black', textAlign: 'center' }}
                    >
                        Check your parcel status
                    </Typography>
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
                            color="secondary"
                            label="Tracking Number"
                            onChange={(e) => setTrackingNumber(e.target.value)}
                            value={trackingNumber}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                width: "15%",
                                color: 'secondary',
                            }}
                            onClick={() => dispatch(GitAction.CallGetParcelStatus2({ trackingNumber: `and TrackingNumber='${trackingNumber}'` }))}
                        >
                            Search
                        </Button>
                    </div>
                    {parcelStatus && parcelStatus.length > 0 &&
                        <BasicAlertDialog open={open} handleOpenClose={handleOpenClose} data={parcelStatus[0]} />
                    }
                </div>
            </div>
        </div>
    );
}