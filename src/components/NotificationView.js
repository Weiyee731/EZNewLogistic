import React from "react";
import { Card, CardContent, Typography, Divider } from "@mui/material";

export const NotificationView = ({ title, message, type, date }) => {
    return (
        <Card sx={{ margin: '10px 0' }}>
            <CardContent>
                <Typography variant="h4" fontWeight={'bold'}>
                    {title}
                </Typography>
                <div dangerouslySetInnerHTML={{ __html: message }} />
                <Divider variant="middle" sx={{ margin: '10px 0' }} />
                <div
                    style={{
                        color: '#a9a9a9'
                    }}
                >
                    {date}
                </div>
            </CardContent>
        </Card>
    );
}