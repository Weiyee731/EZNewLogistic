import React from "react";

export const NotificationView = ({ title, message, type, date }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                // height: "80px",
                backgroundColor: "white",
                borderWidth: "3px 3px 3px 22px",
                borderColor: type === "success" ? "green" : "red",
                borderStyle: "solid",
                borderRadius: "10px",
                padding: "20px",
                margin: "10px 0px 10px 0px",
            }}
        >
            <div
                style={{
                    fontSize: "25px",
                    fontWeight: "bold",
                    color: "#101010",
                }}
            >
                {title}
            </div>
            <div dangerouslySetInnerHTML={{ __html: message }} />
            <div
                style={{
                    color: '#a9a9a9'
                }}
            >
                {date}
            </div>
        </div>
    );
}