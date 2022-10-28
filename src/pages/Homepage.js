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
import { images } from '../constants'
import { Tracking } from "../components/Homepage/Tracking";
import { OurServices } from "../components/Homepage/OurServices";
import { ShippingFlow } from "../components/Homepage/ShippingFlow";

export default function Homepage() {
    const { loading, state, viewNotification, parcelStatus } = useSelector(state => ({
        loading: state.counterReducer.loading,
        state: state.counterReducer,
        viewNotification: state.counterReducer.viewNotification,
        parcelStatus: state.counterReducer.parcelStatus,
    }));

    const dispatch = useDispatch()
    const [open, setOpen] = useState(true);

    const handleOpenClose = () => {
        setOpen(!open);
    };

    useEffect(() => {
        dispatch(GitAction.CallGetNotification({ status: 2 }))
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
                labels={false}
                showArrows={true}
            >
                <div>
                    <img src="https://img.freepik.com/premium-photo/transportation-logistics-container-cargo-ship-cargo-plane-3d-rendering-illustration_37416-487.jpg?w=2000" />
                </div>
                <div>
                    <img src="https://blog.solistica.com/hubfs/Fotos%20e%20infograf%C3%ADa%20Blogs%20Q4/Fotos%20Q4%20Noviembre%202020/Fotos%20Diciembre%20Q4%2020202/SOL-S13-B1-Blog%20Image%2002-1.jpg" />
                </div>
            </Carousel>

            <div
                style={{ height: '100%', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto' }}
            >
                <div style={styles.sectionMargin}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <Card style={{ height: "300pt" }}>
                                <CardContent>
                                    <Tracking parcelStatus={parcelStatus[0]} />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <Card style={{ height: "300pt", overflowY: "scroll", flexshrink: 0 }} >
                                <CardContent>
                                    <Typography variant="h6" style={{ fontWeight: "bold", color: 'black', textAlign: 'center', paddingBottom: "10pt" }}>
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
                </div>

                {/* Our services */}
                <div style={styles.sectionMargin}>
                    <OurServices />
                </div>

                {/* Flow of service */}
                <div style={styles.sectionMargin}>
                    <ShippingFlow />
                </div>
                <BasicAlertDialog open={open} handleOpenClose={handleOpenClose} />
            </div>
        </div>
    );
}

const styles = {
    sectionMargin: {
        margin: '60px auto'
    },
    header: {
        fontWeight: "bold",
        color: 'black',
        textAlign: 'center',
        marginBottom: '20px'
    },
    flowOfService: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    flowOfServiceDesc: {
        color: '#7c7c7c',
        maxWidth: '200px',
    }
}