import React from "react";
import { Box, Button, Card, CardContent, CardHeader, Grid, TextField, Typography } from "@mui/material";
import { images } from "../../constants";

export const OurServices = () => {
    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}

const styles = {
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
}