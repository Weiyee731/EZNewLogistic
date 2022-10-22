import React from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { SelfCollect } from "../components/pricing/SelfCollect";
import { SmallParcel } from "../components/pricing/SmallParcel";
import { LargeParcel } from "../components/pricing/LargeParcel";

export const Pricingpage = () => {
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const [value, setValue] = React.useState(0);

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

    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'darkgrey' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="自取收費" {...a11yProps(0)} />
                        <Tab label="派送收费(海运小包派送)" {...a11yProps(1)} />
                        <Tab label="派送收费(海运大貨派送)" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <SelfCollect />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <SmallParcel />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <LargeParcel />
                </TabPanel>
            </Box>
        </div>
    )
}