import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, Provider } from 'react-redux'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { NotificationView } from "../components/NotificationView";
import { Box, Button, Card, CardContent, CardHeader, Grid, TextField, Typography } from "@mui/material";
import { GitAction } from "../store/action/gitAction";
import { BasicAlertDialog } from "../components/BasicAlertDialog";
import { useTheme } from '@mui/material/styles';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { letterSpacing } from "@mui/system";

export default function Homepage() {
    const { loading, state, viewNotification, parcelStatus } = useSelector(state => ({
        loading: state.counterReducer.loading,
        state: state.counterReducer,
        viewNotification: state.counterReducer.viewNotification,
        parcelStatus: state.counterReducer.parcelStatus,
    }));

    const dispatch = useDispatch()

    const [trackingNumber, setTrackingNumber] = useState("");
    const [open, setOpen] = useState(true);
    const theme = useTheme();

    const handleOpenClose = () => {
        setOpen(!open);
    };

    useEffect(() => {
        dispatch(GitAction.CallGetNotification({ status: 1 }))
    }, [])

    useEffect(() => {
        if (parcelStatus && parcelStatus.length > 0) {
            console.log(parcelStatus[0])
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
                style={{ marginTop: "20px" }}
                className="container"
            >
                <Grid container spacing={2} style={{ paddingBottom: "20pt" }}>
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <Card style={{ height: "300pt" }}>
                            <CardContent>
                                <Typography variant="h6" style={{ fontWeight: "bold", color: 'black', textAlign: 'center' }}  >
                                    物流查询
                                </Typography>
                                <TextField
                                    sx={{
                                        width: "100%",
                                        backgroundColor: 'white',
                                    }}
                                    style={{ marginBottom: '10px' }}
                                    id="trackingNumber"
                                    type="text"
                                    color="secondary"
                                    label="Tracking Number"
                                    onChange={(e) => setTrackingNumber(e.target.value)}
                                    value={trackingNumber}
                                />
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    sx={{
                                        color: 'white',
                                        display: 'block',
                                        margin: '0 auto',
                                        width: '100px',
                                        fontWeight: 'bold',
                                    }}
                                    onClick={() => dispatch(GitAction.CallGetParcelStatus2({ trackingNumber: `and TrackingNumber='${trackingNumber}'` }))}
                                >
                                    查询
                                </Button>
                                {parcelStatus && parcelStatus.length > 0 &&
                                    <Card style={{ marginTop: "10pt" }}>
                                        <CardContent>
                                            <Typography style={{ paddingTop: "5pt", letterSpacing: 1 }}  > <strong>物流单号：</strong> {parcelStatus[0].CourierName}   {parcelStatus[0].TrackingNumber}</Typography>
                                            <Typography style={{ paddingTop: "5pt", letterSpacing: 1 }}  > <strong>货物状态：</strong> {parcelStatus[0].Status}</Typography>
                                            <Typography style={{ paddingTop: "5pt", letterSpacing: 1 }}  > <strong>货物尺寸：</strong> {parcelStatus[0].ProductDimensionDeep}cm x {parcelStatus[0].ProductDimensionHeight}cm x {parcelStatus[0].ProductDimensionWidth}cm</Typography>
                                            <Typography style={{ paddingTop: "5pt", letterSpacing: 1 }}  > <strong>货物体积：</strong> {parseFloat((parcelStatus[0].ProductDimensionDeep * parcelStatus[0].ProductDimensionHeight * parcelStatus[0].ProductDimensionWidth) / 1000000).toFixed(3)} m³</Typography>
                                            <Typography style={{ paddingTop: "5pt", letterSpacing: 1 }}  > <strong>货物重量：</strong> {parcelStatus[0].ProductWeight}kg</Typography>
                                        </CardContent>
                                    </Card>
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={6} xs={12} >
                        <Card style={{ height: "300pt", overflowY: "scroll", flexshrink: 0 }} >
                            <CardContent>
                                <Typography variant="h6" style={{ fontWeight: "bold", color: 'black', textAlign: 'center', paddingBottom: "10pt" }}  >
                                    公告处
                                </Typography>
                                <div>
                                    {viewNotification.map((item, index) => {
                                        return (
                                            <>
                                                <NotificationView
                                                    key={index}
                                                    message={item.NotificationDesc}
                                                    title={item.NotificationTitle}
                                                    date={item.CreatedDate}
                                                />
                                            </>
                                        )
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <div>
                    我们的服务
                </div>

                {/* <BasicAlertDialog open={open} handleOpenClose={handleOpenClose} /> */}
            </div>
        </div >
    );
}