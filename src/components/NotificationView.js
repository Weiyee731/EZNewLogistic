import React from "react";

export const NotificationView = ({ message }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                height: "80px",
                backgroundColor: "white",
                borderWidth: "2px 2px 2px 22px",
                borderColor: "green",
                borderStyle: "solid",
                borderRadius: "10px",
            }}
        >
            {message}
        </div>
    );
}