import React from "react";
import { Box, Button, Card, CardContent, CardHeader, Grid, TextField, Typography } from "@mui/material";
import { images } from "../../constants";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

export const FlowOfDelivery = () => {
    return (
        <React.Fragment>
            <Typography variant="h4" style={styles.header}>
                代运流程
            </Typography>
            <Timeline position="alternate">
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot sx={styles.timeLineDotPostion} />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
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
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot sx={styles.timeLineDotPostion} />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <div style={styles.flowOfService}>
                            <div>
                                <Typography variant="h5">
                                    包裹寄送到仓库
                                </Typography>
                                <div style={styles.flowOfServiceDesc}>
                                    包裹验货签收，称重，量体积，入库国内仓库
                                </div>
                            </div>
                            <div style={styles.ourServicesImageContainer}>
                                <img src={images.warehouse} style={styles.ourServicesImage} />
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
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot sx={styles.timeLineDotPostion} />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <div style={styles.flowOfService}>
                            <div>
                                <Typography variant="h5">
                                    包裹追踪
                                </Typography>
                                <div style={styles.flowOfServiceDesc}>
                                    查看包裹运输状态
                                </div>
                            </div>
                            <div style={styles.ourServicesImageContainer}>
                                <img src={images.tracking} style={styles.ourServicesImage} />
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
    flowOfService: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: '-40px'
    },
    flowOfServiceDesc: {
        color: '#7c7c7c',
        maxWidth: '200px',
    },
    timeLineDotPostion: {
        marginTop: '30px'
    }
}