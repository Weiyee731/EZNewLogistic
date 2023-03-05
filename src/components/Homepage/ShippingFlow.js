import React from "react";
import { Box, Button, Card, CardContent, CardHeader, Grid, TextField, Typography } from "@mui/material";
import { images } from "../../constants";
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { useWindowDimensions } from "../../tools/Helpers";

export const ShippingFlow = () => {
    const { width } = useWindowDimensions();
    return (
        <React.Fragment>
            <Typography variant="h4" style={styles.header}>
                代运流程
            </Typography>
            <Timeline
                sx={width <= 768 && {
                    [`& .${timelineItemClasses.root}:before`]: {
                        flex: 0,
                        padding: 2,
                    },
                }}
                position={width >= 768 ? "alternate" : "right"}
            >
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot sx={styles.timeLineDotPostion} />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <div style={styles.flowOfService}>
                            <div
                                style={{
                                    ...styles.ourServicesImageContainer,
                                    width: width >= 768 ? "150px" : "80px",
                                    height: width >= 768 ? "150px" : "80px"
                                }}
                            >
                                <img src={images.location} style={width >= 768 ? styles.ourServicesImage : styles.ourServicesImage768}  alt="EZ Location"/>
                            </div>
                            <div>
                                <Typography variant="h5" sx={{ maxWidth: width >= 768 ? '200px' : '150px' }}>
                                    注册/登录账户查看地址
                                </Typography>
                                <div style={styles.flowOfServiceDesc}>
                                    获取会员号和国内转运仓收货地址
                                </div>
                            </div>
                        </div>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot sx={styles.timeLineDotPostion} />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <div style={styles.flowOfService}>
                            <div
                                style={{
                                    ...styles.ourServicesImageContainer,
                                    width: width >= 768 ? "150px" : "80px",
                                    height: width >= 768 ? "150px" : "80px"
                                }}
                            >
                                <img src={images.warehouse} style={width >= 768 ? styles.ourServicesImage : styles.ourServicesImage768}  alt="EZ Warehouse"/>
                            </div>
                            <div>
                                <Typography variant="h5" sx={{ maxWidth: width >= 768 ? '200px' : '150px' }}>
                                    包裹寄送到仓库
                                </Typography>
                                <div style={styles.flowOfServiceDesc}>
                                    包裹验货签收，称重，量体积，入库国内仓库
                                </div>
                            </div>
                        </div>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot sx={styles.timeLineDotPostion} />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <div style={styles.flowOfService}>
                            <div
                                style={{
                                    ...styles.ourServicesImageContainer,
                                    width: width >= 768 ? "150px" : "80px",
                                    height: width >= 768 ? "150px" : "80px"
                                }}
                            >
                                <img src={images.shipment} style={width >= 768 ? styles.ourServicesImage : styles.ourServicesImage768}  alt="EZ Shipment"/>
                            </div>
                            <div>
                                <Typography variant="h5" sx={{ maxWidth: width >= 768 ? '200px' : '150px' }}>
                                    包裹转运马来西亚
                                </Typography>
                                <div style={styles.flowOfServiceDesc}>
                                    中国报关，马来西亚清关
                                </div>
                            </div>
                        </div>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot sx={styles.timeLineDotPostion} />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <div style={styles.flowOfService}>
                            <div
                                style={{
                                    ...styles.ourServicesImageContainer,
                                    width: width >= 768 ? "150px" : "80px",
                                    height: width >= 768 ? "150px" : "80px"
                                }}
                            >
                                <img src={images.tracking} style={width >= 768 ? styles.ourServicesImage : styles.ourServicesImage768}  alt="EZ Tracking"/>
                            </div>
                            <div>
                                <Typography variant="h5" sx={{ maxWidth: width >= 768 ? '200px' : '150px' }}>
                                    包裹追踪
                                </Typography>
                                <div style={styles.flowOfServiceDesc}>
                                    查看包裹运输状态
                                </div>
                            </div>
                        </div>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot sx={styles.timeLineDotPostion} />
                    </TimelineSeparator>
                    <TimelineContent>
                        <div style={styles.flowOfService}>
                            <div
                                style={{
                                    ...styles.ourServicesImageContainer,
                                    width: width >= 768 ? "150px" : "80px",
                                    height: width >= 768 ? "150px" : "80px"
                                }}
                            >
                                <img src={images.notification} style={width >= 768 ? styles.ourServicesImage : styles.ourServicesImage768}  alt="EZ Notification"/>
                            </div>
                            <div>
                                <Typography variant="h5" sx={{ maxWidth: width >= 768 ? '200px' : '150px' }}>
                                    包裹到仓通知
                                </Typography>
                                <div style={styles.flowOfServiceDesc}>
                                    通知取货，付款，确认收货
                                </div>
                            </div>
                        </div>
                    </TimelineContent>
                </TimelineItem>
            </Timeline>
        </React.Fragment>
    )
}

const styles = {
    header: {
        fontWeight: "bold",
        color: 'black',
        textAlign: 'center',
        marginBottom: '50px'
    },
    ourServicesImageContainer: {
        backgroundColor: '#fff',
        margin: '0 10px 30px 0',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 30px 45px 0px rgba(22,22,22,0.1)'
    },
    ourServicesImage: {
        width: 'auto',
        maxWidth: '100px',
        height: 'auto',
    },
    ourServicesImage768: {
        width: 'auto',
        maxWidth: '60px',
        height: 'auto',
    },
    flowOfService: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: '-10px'
    },
    flowOfServiceDesc: {
        color: '#7c7c7c',
        maxWidth: '150px',
    },
    timeLineDotPostion: {
        marginTop: '30px'
    }
}