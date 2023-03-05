import React, { useEffect, useRef } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TempSelfCollect } from "../components/pricing/TempSelfCollect";
import { SelfCollect } from "../components/pricing/SelfCollect";
import { SmallParcel } from "../components/pricing/SmallParcel";
import { LargeParcel } from "../components/pricing/LargeParcel";

import IconButton from "@mui/material/IconButton"
import PrintIcon from '@mui/icons-material/Print';
import { useReactToPrint } from 'react-to-print';


export const Pricingpage = () => {
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const [value, setValue] = React.useState(0);
    const [print, setPrint] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const renderPrintListing = () => {
        return (
            <>
                <TempSelfCollect />
                <div className="row" style={{ textAlign: "right", padding: "10pt" }}>
                    <label style={{ fontWeight: "bold", fontSize: "15pt" }}>壹智国际物流</label>
                </div>
            </>
        )
    }

    return (
        <div>

            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'darkgrey' }}>
                    <Tabs textColor="secondary" value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="古晋自取收費" {...a11yProps(0)} />
                        {/* <Tab label="派送收费(海运小包派送)" {...a11yProps(1)} />
                        <Tab label="派送收费(海运大貨派送)" {...a11yProps(2)} /> */}
                    </Tabs>
                </Box>
                <div style={{ textAlign: "right", paddingRight: "10pt" }}>
                    <IconButton onClick={handlePrint}>
                        <PrintIcon />
                    </IconButton>
                </div>
                <TabPanel value={value} index={0}>
                    <TempSelfCollect />
                </TabPanel>
                {/* <TabPanel value={value} index={1}>
                    <SmallParcel />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <LargeParcel />
                </TabPanel> */}
            </Box>
            <div style={{ display: "none" }} >
                <div ref={componentRef}>
                    {renderPrintListing()}
                </div>
            </div>
        </div>
    )
}