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
                style={{ height: '100%', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto' }}
            >
                <div style={styles.sectionMargin}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                            <Card style={{ height: "300pt" }}>
                                <CardContent>
                                    <Typography variant="h6" style={{ fontWeight: "bold", color: 'black', textAlign: 'center' }}>
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
                                                <Typography style={{ paddingTop: "5pt", letterSpacing: 1 }}> <strong>物流单号：</strong> {parcelStatus[0].CourierName}   {parcelStatus[0].TrackingNumber}</Typography>
                                                <Typography style={{ paddingTop: "5pt", letterSpacing: 1 }}> <strong>货物状态：</strong> {parcelStatus[0].Status}</Typography>
                                                <Typography style={{ paddingTop: "5pt", letterSpacing: 1 }}> <strong>货物尺寸：</strong> {parcelStatus[0].ProductDimensionDeep}cm x {parcelStatus[0].ProductDimensionHeight}cm x {parcelStatus[0].ProductDimensionWidth}cm</Typography>
                                                <Typography style={{ paddingTop: "5pt", letterSpacing: 1 }}> <strong>货物体积：</strong> {parseFloat((parcelStatus[0].ProductDimensionDeep * parcelStatus[0].ProductDimensionHeight * parcelStatus[0].ProductDimensionWidth) / 1000000).toFixed(3)} m³</Typography>
                                                <Typography style={{ paddingTop: "5pt", letterSpacing: 1 }}> <strong>货物重量：</strong> {parcelStatus[0].ProductWeight}kg</Typography>
                                            </CardContent>
                                        </Card>
                                    }
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item md={6} xs={12} >
                            <Card style={{ height: "300pt", overflowY: "scroll", flexshrink: 0 }} >
                                <CardContent>
                                    <Typography variant="h6" style={{ fontWeight: "bold", color: 'black', textAlign: 'center', paddingBottom: "10pt" }}>
                                        公告处
                                    </Typography>
                                    <div>
                                        {viewNotification.map((item, index) => {
                                            return (
                                                <NotificationView
                                                    key={index}
                                                    message={item.NotificationDesc}
                                                    title={item.NotificationTitle}
                                                    date={item.CreatedDate}
                                                />
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
                    <Typography variant="h4" style={styles.header}>
                        我们的服务
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={12} md={12} lg={3} xl={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={styles.ourServicesImageContainer}>
                                <img src={images.delivery} style={styles.ourServicesImage} />
                            </div>
                            <Typography variant="h5">
                                代运
                            </Typography>
                            <div style={styles.ourServicesDesc}>
                                我们提供专业中马海运物流服务，善于处理包裹，装柜，报关，清关以及派送的事务。
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={3} xl={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={styles.ourServicesImageContainer}>
                                <img src={images.purchase} style={styles.ourServicesImage} />
                            </div>
                            <Typography variant="h5">
                                代购
                            </Typography>
                            <div style={styles.ourServicesDesc}>
                                我们提供一条龙代购服务。主要让您更简易方便购买中国平台货物
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={3} xl={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={styles.ourServicesImageContainer}>
                                <img src={images.pay} style={styles.ourServicesImage} />
                            </div>
                            <Typography variant="h5">
                                代付
                            </Typography>
                            <div style={styles.ourServicesDesc}>
                                我们提供人民币兑换，充值，代付与转账服务。高汇率兑换率，快充安全
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={3} xl={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={styles.ourServicesImageContainer}>
                                <img src={images.search} style={styles.ourServicesImage} />
                            </div>
                            <Typography variant="h5">
                                木架与验货
                            </Typography>
                            <div style={styles.ourServicesDesc}>
                                我们提供验货与打木架服务，保障与减少货物破损机率
                            </div>
                        </Grid>
                    </Grid>
                </div>

                {/* Flow of service */}
                <div style={styles.sectionMargin}>
                    <Typography variant="h4" style={styles.header}>
                        代运流程
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                            <div style={styles.flowOfService}>
                                <div style={styles.ourServicesImageContainer}>
                                    <img src={images.location} style={styles.ourServicesImage} />
                                </div>
                                <div>
                                    <Typography variant="h5">
                                        注册/登录账户查看地址
                                    </Typography>
                                    <div style={styles.flowOfServiceDesc}>
                                        获取会员号和国内转运仓收货地址
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} />
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                            <div style={styles.flowOfService}>
                                <div style={styles.ourServicesImageContainer}>
                                    <img src={images.warehouse} style={styles.ourServicesImage} />
                                </div>
                                <div>
                                    <Typography variant="h5">
                                        包裹寄送到仓库
                                    </Typography>
                                    <div style={styles.flowOfServiceDesc}>
                                        包裹验货签收，称重，量体积，入库国内仓库
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                            <div style={styles.flowOfService}>
                                <div style={styles.ourServicesImageContainer}>
                                    <img src={images.shipment} style={styles.ourServicesImage} />
                                </div>
                                <div>
                                    <Typography variant="h5">
                                        包裹转运马来西亚
                                    </Typography>
                                    <div style={styles.flowOfServiceDesc}>
                                        中国报关，马来西亚清关
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} />
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                            <div style={styles.flowOfService}>
                                <div style={styles.ourServicesImageContainer}>
                                    <img src={images.tracking} style={styles.ourServicesImage} />
                                </div>
                                <div>
                                    <Typography variant="h5">
                                        包裹追踪
                                    </Typography>
                                    <div style={styles.flowOfServiceDesc}>
                                        查看包裹运输状态
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                            <div style={styles.flowOfService}>
                                <div style={styles.ourServicesImageContainer}>
                                    <img src={images.notification} style={styles.ourServicesImage} />
                                </div>
                                <div>
                                    <Typography variant="h5">
                                        包裹到仓通知
                                    </Typography>
                                    <div style={styles.flowOfServiceDesc}>
                                        通知取货，付款，确认收货
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
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
    ourServicesImageContainer: {
        backgroundColor: '#fff',
        width: '150px',
        height: '150px',
        marginBottom: '30px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 30px 45px 0px rgba(22,22,22,0.1)'
    },
    ourServicesImage: {
        width: '100px',
        height: '100px'
    },
    ourServicesDesc: {
        color: '#7c7c7c',
        padding: '0 20px',
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