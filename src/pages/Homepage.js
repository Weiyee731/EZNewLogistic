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
import Register from "../assets/Slide/Register.png"
// import double11 from "../assets/Slide/1111.png"
import sharing from "../assets/Slide/sharing.png"
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

export default function Homepage() {
    const { loading, state, viewNotification, parcelStatus } = useSelector(state => ({
        loading: state.counterReducer.loading,
        state: state.counterReducer,
        viewNotification: state.counterReducer.viewNotification,
        parcelStatus: state.counterReducer.parcelStatus,
    }));
    BootstrapDialogTitle.propTypes = {
        children: PropTypes.node,
        onClose: PropTypes.func.isRequired,
    };

    const dispatch = useDispatch()
    const [open, setOpen] = useState(true);
    const [NotificationOpen, setNotificationOpen] = useState(false);

    const handleOpenClose = () => {
        setOpen(!open);
        setNotificationOpen(!NotificationOpen);
    };

    const handleNotificationClose = () => {
        setNotificationOpen(!NotificationOpen);
    }

    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(3),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));

    function BootstrapDialogTitle(props) {
        const theme = useTheme();
        const { children, onClose, ...other } = props;

        return (
            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: "#5A98B7", color: 'white' }} {...other}>
                {children}
            </DialogTitle>
        );
    }

    BootstrapDialogTitle.propTypes = {
        children: PropTypes.node,
        onClose: PropTypes.func.isRequired,
    };


    useEffect(() => {
        dispatch(GitAction.CallGetNotification({ status: 2 }))
    }, [])

    return (
        <div>
            {/* swipeable images */}
            {/* <Carousel
                showThumbs={false}
                swipeable={true}
                axis="horizontal"
                showStatus={false}
                infiniteLoop={true}
                autoPlay={true}
                labels={false}
                showArrows={true}
            > */}
                {/* <div>
                    <img src={Register} alt="Yourway Register" />
                    <img src="https://pic.52112.com/180705/JPG-180705_428/xtHosKp6oG_small.jpg" />
                </div>
                <div>
                    <img src={sharing} alt="Yourway Referal" />
                </div> */}
                {/* <div>
                    <img src={double11} alt="Yourway 1111" />
                </div> */}
                {/* <div>
                    <img src="https://blog.solistica.com/hubfs/Fotos%20e%20infograf%C3%ADa%20Blogs%20Q4/Fotos%20Q4%20Noviembre%202020/Fotos%20Diciembre%20Q4%2020202/SOL-S13-B1-Blog%20Image%2002-1.jpg" />
                </div> */}
            {/* </Carousel> */}

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
                {
                    viewNotification.length > 0 && viewNotification.map((item, index) => {
                        return (
                            <BootstrapDialog
                                aria-labelledby="customized-dialog-title"
                                open={NotificationOpen}
                                fullWidth
                                maxWidth="md"
                            >
                                <BootstrapDialogTitle id="customized-dialog-title" >
                                    {item.NotificationTitle}
                                </BootstrapDialogTitle>
                                <DialogContent dividers>
                                    <Typography gutterBottom>
                                        <div dangerouslySetInnerHTML={{ __html: item.NotificationDesc }} />
                                    </Typography>
                                    <br />
                                    <br />
                                    <Grid container>
                                        <Grid item xs={10} sm={10} md={10} style={{ alignItems: "center", display: "flex" }}>
                                        </Grid>
                                        <Grid item xs={2} sm={2} md={2} >
                                            <Typography style={{ fontWeight: "bold", color: 'black', fontSize: "11pt", letterSpacing: 2 }}  >
                                                壹智国际物流
                                            </Typography>
                                            <Typography style={{ color: 'gray', fontSize: "10pt" }}  >
                                                {item.CreatedDate}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Button color='secondary' autoFocus onClick={() => handleNotificationClose()}>
                                        了解
                                    </Button>
                                </DialogActions>
                            </BootstrapDialog>
                        )
                    })
                }
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