import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, TextField, Typography } from "@mui/material";
import { GitAction } from "../../store/action/gitAction";

export const Tracking = ({ parcelStatus, title }) => {
    const [trackingNumber, setTrackingNumber] = useState("");
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            <Typography variant="h6" style={{ fontWeight: "bold", color: 'black', textAlign: 'center' }}>
                {title}
            </Typography>
            <TextField
                sx={{
                    width: "100%",
                    backgroundColor: 'white',

                }}
                multiline
                rows={6}
                style={{ marginBottom: '10px' }}
                id="trackingNumber"
                type="text"
                color="secondary"
                label="中国物流快递单号"
                onChange={(e) => setTrackingNumber(e.target.value)}
                value={trackingNumber}
            />

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
                    onClick={() => {
                        dispatch(GitAction.CallClearParcelStatus2())
                        dispatch(GitAction.CallGetParcelStatus2({ trackingNumber: `and TrackingNumber='${trackingNumber}'` }))
                    }}
                >
                    查询货物
                </Button>
            </div>

            {parcelStatus.length > 0 && trackingNumber !== ""
                ?
                parcelStatus[0].ReturnVal === 0 ?
                    <div style={{ padding: "20pt" }}>
                        <Typography style={{ paddingTop: "5pt", letterSpacing: 1 }}> <strong>无此单号物流信息</strong> </Typography>
                    </div>
                    :
                    <div style={{ padding: "10pt" }}>
                        <Typography style={{ paddingTop: "5pt", letterSpacing: 1 }}> <strong>物流单号：</strong> {parcelStatus[0].CourierName}   {parcelStatus[0].TrackingNumber}</Typography>
                        <Typography style={{ paddingTop: "5pt", letterSpacing: 1 }}> <strong>货物状态：</strong> {parcelStatus[0].Status !== "Created Performa Invoice" ? parcelStatus[0].ChineseStatus : "已取货"}</Typography>
                        <Typography style={{ paddingTop: "5pt", letterSpacing: 1 }}> <strong>货物重量：</strong> {parcelStatus[0].ProductWeight}kg</Typography>
                        <Typography style={{ paddingTop: "5pt", letterSpacing: 1 }}> <strong>货物尺寸：</strong> {parcelStatus[0].ProductDimensionDeep}cm x {parcelStatus[0].ProductDimensionHeight}cm x {parcelStatus[0].ProductDimensionWidth}cm</Typography>
                        <Typography style={{ paddingTop: "5pt", letterSpacing: 1 }}> <strong>货物体积：</strong> {parseFloat((parcelStatus[0].ProductDimensionDeep * parcelStatus[0].ProductDimensionHeight * parcelStatus[0].ProductDimensionWidth) / 1000000).toFixed(3)} m³</Typography>
                    </div>
                :
                ""
            }
        </React.Fragment>
    )
}