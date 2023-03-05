import React, { useEffect, useState } from "react";
import { useDispatch, } from "react-redux";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { GitAction } from "../../store/action/gitAction";
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import { toast } from "react-toastify";
import { isArrayNotEmpty, } from "../../tools/Helpers";

export const ParcelCalculation = ({ areaCodes, title, parcelPrice }) => {
    const [parcelDimension, setParcelDimension] = useState({
        weight: "", height: "", length: "", width: ""
    });
    const [deliveryArea, setDeliveryArea] = useState();

    const titleStyle = { paddingTop: "10px", fontWeight: "bold" }

    const dispatch = useDispatch();
    const handleSubmitTracking = () => {
        dispatch(GitAction.CallResetParcelPrice())
        let LogonUser = localStorage.getItem("user")
        if (LogonUser !== undefined) {
            LogonUser = JSON.parse(LogonUser).UserID
        }
        if (LogonUser !== undefined) {
            if (parcelDimension.weight !== "" && parcelDimension.height !== "" && parcelDimension.length !== "" && parcelDimension.width !== "" && deliveryArea !== "") {

                dispatch(GitAction.CallCalculateParcelPrice({
                    selectedAreaID: deliveryArea,
                    UserID: LogonUser,
                    parcelWeight: parcelDimension.weight,
                    parcelHeight: parcelDimension.height,
                    parcelWidth: parcelDimension.width,
                    parcelLength: parcelDimension.length
                }))
            }
            else
                toast.warning("请填写所需包裹资料")

        } else {
            toast.warning("请登录户口查询")
        }


    }
    return (
        <React.Fragment>
            <Typography variant="h6" style={{ fontWeight: "bold", color: 'black', textAlign: 'center' }}>
                {title}
            </Typography>
            <Grid container rowSpacing={2} columnSpacing={3} >
                <Grid item md={4} lg={2} >
                    <Typography style={titleStyle}>货物重量:</Typography>
                </Grid>
                <Grid item xs={12} md={6} >
                    <TextField
                        id="standard-number"
                        type="number"
                        sx={{ width: "100%" }}
                        InputProps={{
                            shrink: true,
                            endAdornment: <InputAdornment position="end">
                                <Typography variant="caption">kg</Typography>
                            </InputAdornment>
                        }}
                        onChange={(e) => {
                            let dimension = parcelDimension
                            dimension.weight = e.target.value
                            setParcelDimension(dimension)
                        }}
                        variant="standard"
                    />
                </Grid>
            </Grid>
            <Grid container rowSpacing={2} columnSpacing={3} >
                <Grid item md={4} lg={2} >
                    <Typography style={titleStyle}>货物长度:</Typography>
                </Grid>
                <Grid item xs={12} md={6} >
                    <TextField
                        id="standard-number"
                        type="number"
                        sx={{ width: "100%" }}
                        InputProps={{
                            shrink: true,
                            endAdornment: <InputAdornment position="end">
                                <Typography variant="caption">cm</Typography>
                            </InputAdornment>
                        }}
                        onChange={(e) => {
                            let dimension = parcelDimension
                            dimension.length = e.target.value
                            setParcelDimension(dimension)
                        }}
                        variant="standard"
                    />
                </Grid>
            </Grid>
            <Grid container rowSpacing={2} columnSpacing={3} >
                <Grid item md={4} lg={2} >
                    <Typography style={titleStyle}>货物宽度:</Typography>
                </Grid>
                <Grid item xs={12} md={6} >
                    <TextField
                        id="standard-number"
                        type="number"
                        sx={{ width: "100%" }}
                        InputProps={{
                            shrink: true,
                            endAdornment: <InputAdornment position="end">
                                <Typography variant="caption">cm</Typography>
                            </InputAdornment>
                        }}
                        onChange={(e) => {
                            let dimension = parcelDimension
                            dimension.width = e.target.value
                            setParcelDimension(dimension)
                        }}
                        variant="standard"
                    />
                </Grid>
            </Grid>
            <Grid container rowSpacing={2} columnSpacing={3} >
                <Grid item md={4} lg={2} >
                    <Typography style={titleStyle}>货物高度:</Typography>
                </Grid>
                <Grid item xs={12} md={6} >
                    <TextField
                        id="standard-number"
                        type="number"
                        sx={{ width: "100%" }}
                        InputProps={{
                            shrink: true,
                            endAdornment: <InputAdornment position="end">
                                <Typography variant="caption">cm</Typography>
                            </InputAdornment>
                        }}
                        onChange={(e) => {
                            let dimension = parcelDimension
                            dimension.height = e.target.value
                            setParcelDimension(dimension)
                        }}
                        variant="standard"
                    />
                </Grid>
            </Grid>

            <Grid container rowSpacing={2} columnSpacing={3} style={{ paddingTop: "5px" }}>
                <Grid item md={4} lg={2} >
                    <Typography style={titleStyle}>选择地区:</Typography>
                </Grid>
                <Grid item xs={12} md={6} >
                    <TextField
                        size="small"
                        sx={{ width: "100%" }}
                        select
                        value={deliveryArea}
                        onChange={(e) => setDeliveryArea(e.target.value)}
                    >
                        {
                            isArrayNotEmpty(areaCodes) ?
                                areaCodes.map((el, idx) =>
                                    <MenuItem key={idx + "__" + el.AreaCode} value={el.UserAreaID}>{el.AreaCode + " - " + el.AreaName}</MenuItem>
                                )
                                :
                                <MenuItem disabled><i>无可选地区 </i></MenuItem>
                        }
                    </TextField>
                </Grid>
            </Grid>

            <div className="row" style={{ paddingTop: "20px" }}>
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
                    onClick={() => handleSubmitTracking()}
                >
                    查询运费
                </Button>
            </div>

            {parcelPrice !== undefined && parcelPrice.length > 0 && parcelDimension.weight !== "" && parcelDimension.height !== "" && parcelDimension.length !== "" && parcelDimension.width !== "" && deliveryArea !== ""
                ?
                <div style={{ padding: "10pt" }}>
                    <Typography style={{ paddingTop: "5pt", letterSpacing: 1 }}> <strong>预测运费：</strong> RM {parcelPrice[0].Price !== null && parseFloat(parcelPrice[0].Price).toFixed(2)}</Typography>
                    <Typography style={{ paddingTop: "5pt", letterSpacing: 1 }}> <strong>货物实重：</strong> {parcelPrice[0].ParcelWeight} kg</Typography>
                    <Typography style={{ paddingTop: "5pt", letterSpacing: 1 }}> <strong>货物体积重：</strong> {parcelPrice[0].ParcelVolumeWeight} kg</Typography>
                    <Typography style={{ paddingTop: "5pt", letterSpacing: 1 }}> <strong>货物体积：</strong> {parcelPrice[0].ParcelVolume} m³</Typography>
                </div>
                :
                ""
            }
        </React.Fragment>
    )
}