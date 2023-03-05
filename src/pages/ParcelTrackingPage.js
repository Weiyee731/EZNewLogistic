import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, Provider } from 'react-redux'
import { GitAction } from "../store/action/gitAction";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography, Grid, TableCell } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import SearchBar from "../components/SearchBar/SearchBar";
import LoadingPanel from "../components/LoadingPanel/LoadingPanel";
import EmptyBox from "../assets/empty-box.png"
import { isArrayNotEmpty, isStringNullOrEmpty } from "../tools/Helpers";
import useAuth from "../hooks/useAuth";
import { toast, Flip } from "react-toastify";

import { Tracking } from "../components/Homepage/Tracking";
import { ParcelCalculation } from "../components/Homepage/ParcelCalculation";
export const ParcelTrackingPage = (props) => {
    const { userParcel, setting, parcelStatus, areaCodes, parcelPrice } = useSelector(state => ({
        userParcel: state.counterReducer.parcelStatus,
        setting: state.counterReducer.setting,
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
        <div className="row" style={{ position: "absolute", top: "120px", width: "100%", padding: "20px", paddingBottom: "50px" }}>
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