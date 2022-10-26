import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, Provider } from 'react-redux'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { NotificationView } from "../components/NotificationView";
import { Box, Button, Card, CardContent, CardHeader, Grid, TextField, Typography } from "@mui/material";
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
                style={{ margin: "40px 40px 0px 40px" }}
            >
                {/* notification area */}
                <Typography
                    variant="h4"
                    style={{ fontWeight: "bold", color: 'black' }}
                >
                    通告
                </Typography>

                {viewNotification && viewNotification.length > 0 ?
                    <Grid container spacing={2}>
                        {viewNotification.map((item, index) => {
                            return (
                                <Grid item xs={12} sm={12} md={12} lg={3} xl={2}>
                                    <NotificationView
                                        key={index}
                                        message={item.NotificationDesc}
                                        title={item.NotificationTitle}
                                        date={item.CreatedDate}
                                    />
                                </Grid>
                            )
                        })}
                    </Grid>
                    :
                    <div
                        style={{
                            textAlign: 'center',
                            fontWeight: 'bold'
                        }}
                    >
                        目前没有任何通告
                    </div>
                }

                {/* parcel area */}
                <div
                    style={{
                        marginTop: "80px",
                        marginBottom: "80px",
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
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
                                <TextField
                                    sx={{
                                        width: "100%",
                                        backgroundColor: 'white',
                                    }}
                                    id="trackingNumber"
                                    type="text"
                                    color="secondary"
                                    label="Tracking Number"
                                    onChange={(e) => setTrackingNumber(e.target.value)}
                                    value={trackingNumber}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        color: 'white',
                                    }}
                                    onClick={() => dispatch(GitAction.CallGetParcelStatus2({ trackingNumber: `and TrackingNumber='${trackingNumber}'` }))}
                                >
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                    {parcelStatus && parcelStatus.length > 0 &&
                        <Card sx={{ marginTop: '40px' }}>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12}>
                                        <Typography variant="h5" fontWeight={'bold'} component="div" sx={{ textAlign: 'center' }}>
                                            {parcelStatus[0].TrackingNumber}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid container spacing={2} lg={3} md={3} sm={12} sx={{ marginTop: '20px' }}>
                                        <Grid item xs={12} sm={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Typography variant="h3" fontWeight={'bold'} component="div" sx={{ textAlign: 'center', color: theme.palette.primary.main }}>
                                                {parcelStatus[0].Status} / N/A
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                            Current status
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} lg={3} md={3} sm={12} sx={{ marginTop: '20px' }}>
                                        <Grid item xs={12} sm={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Typography variant="h3" fontWeight={'bold'} component="div" sx={{ textAlign: 'center', color: theme.palette.primary.main }}>
                                                {parcelStatus[0].ProductDimensionDeep} * {parcelStatus[0].ProductDimensionHeight} * {parcelStatus[0].ProductDimensionWidth}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                            Volume
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} lg={3} md={3} sm={12} sx={{ marginTop: '20px' }}>
                                        <Grid item xs={12} sm={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Typography variant="h3" fontWeight={'bold'} component="div" sx={{ textAlign: 'center', color: theme.palette.primary.main }}>
                                                {parcelStatus[0].CourierName}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                            Courier Name
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} lg={3} md={3} sm={12} sx={{ marginTop: '20px' }}>
                                        <Grid item xs={12} sm={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Typography variant="h3" fontWeight={'bold'} component="div" sx={{ textAlign: 'center', color: theme.palette.primary.main }}>
                                                {parcelStatus[0].Remark}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                            Remark
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    }

                    {/* <BasicAlertDialog open={open} handleOpenClose={handleOpenClose} /> */}
                    {/* {parcelStatus && parcelStatus.length > 0 &&
                        <BasicAlertDialog open={open} handleOpenClose={handleOpenClose} data={parcelStatus[0]} />
                    } */}
                </div>
            </div>
        </div>
    );
}