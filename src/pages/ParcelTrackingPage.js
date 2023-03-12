import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, Provider } from 'react-redux'
import { GitAction } from "../store/action/gitAction";
import { Card, Typography, Grid } from '@mui/material';
import { Tracking } from "../components/Homepage/Tracking";
import { ParcelCalculation } from "../components/Homepage/ParcelCalculation";
export const ParcelTrackingPage = (props) => {
    const { parcelStatus, areaCodes, parcelPrice } = useSelector(state => ({
        parcelStatus: state.counterReducer.parcelStatus,
        areaCodes: state.counterReducer.areaCodes,
        parcelPrice: state.counterReducer.parcelPrice
    }));
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(GitAction.CallClearParcelStatus2())
        dispatch(GitAction.CallResetParcelPrice())
        dispatch(GitAction.CallFetchUserAreaCode())
    }, [])


    const titleStyle = { fontWeight: "bold", paddingBottom: "10px" }

    return (
        <div className="row" style={{ top: "120px", width: "100%" }}>
            <Card style={{ padding: "10px" }}>
                <Grid container rowSpacing={2} columnSpacing={3} >
                    <Grid item xs={12} md={6}>
                        <Typography style={titleStyle}>货物查询</Typography>
                        <Tracking parcelStatus={parcelStatus} />
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <Typography style={titleStyle}>运费计算</Typography>
                        <ParcelCalculation areaCodes={areaCodes} parcelPrice={parcelPrice} />
                    </Grid>
                </Grid>
            </Card>

        </div>
    )
}