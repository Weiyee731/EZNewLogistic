import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Card, CardContent, CardHeader, Grid, TextField, Typography } from "@mui/material";
import { GitAction } from "../../store/action/gitAction";

export const Tracking = ({ parcelStatus }) => {
    const [trackingNumber, setTrackingNumber] = useState("");
    const dispatch = useDispatch();

    return (
        <React.Fragment>
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
                label="快递单号"
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
            {parcelStatus &&
                <Card style={{ marginTop: "10pt" }}>
                    <CardContent>
                        <Typography style={{ paddingTop: "5pt", letterSpacing: 1 }}> <strong>物流单号：</strong> {parcelStatus.CourierName}   {parcelStatus.TrackingNumber}</Typography>
                        <Typography style={{ paddingTop: "5pt", letterSpacing: 1 }}> <strong>货物状态：</strong> {parcelStatus.Status}</Typography>
                        <Typography style={{ paddingTop: "5pt", letterSpacing: 1 }}> <strong>货物尺寸：</strong> {parcelStatus.ProductDimensionDeep}cm x {parcelStatus.ProductDimensionHeight}cm x {parcelStatus.ProductDimensionWidth}cm</Typography>
                        <Typography style={{ paddingTop: "5pt", letterSpacing: 1 }}> <strong>货物体积：</strong> {parseFloat((parcelStatus.ProductDimensionDeep * parcelStatus.ProductDimensionHeight * parcelStatus.ProductDimensionWidth) / 1000000).toFixed(3)} m³</Typography>
                        <Typography style={{ paddingTop: "5pt", letterSpacing: 1 }}> <strong>货物重量：</strong> {parcelStatus.ProductWeight}kg</Typography>
                    </CardContent>
                </Card>
            }
        </React.Fragment>
    )
}