import React from "react";

export const NotificationView = ({ message, type }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                height: "80px",
                backgroundColor: "white",
                borderWidth: "3px 3px 3px 22px",
                borderColor: type === "success" ? "green" : "red",
                borderStyle: "solid",
                borderRadius: "10px",
                alignItems: "center",
                padding: "0px 20px 0px 20px",
            }}
        >
            {message}
        </div>
    );
}