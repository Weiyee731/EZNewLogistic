import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, Provider } from 'react-redux'
import { GitAction } from "../store/action/gitAction";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import SearchBar from "../components/SearchBar/SearchBar";
import LoadingPanel from "../components/LoadingPanel/LoadingPanel";
import EmptyBox from "../assets/empty-box.png"
import { isStringNullOrEmpty } from "../tools/Helpers";
import useAuth from "../hooks/useAuth";

export const ParcelPage = () => {

    const { userParcel, setting } = useSelector(state => ({
        userParcel: state.counterReducer.parcelStatus,
        setting: state.counterReducer.setting,
    }));
    const { auth } = useAuth()
    const dispatch = useDispatch()

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    useEffect(() => {
        let LogonUser = localStorage.getItem("user")
        let LogonUserCode = ""

        if (LogonUser !== undefined) {
            LogonUserCode = JSON.parse(LogonUser).UserCode
            LogonUser = JSON.parse(LogonUser).UserID

            dispatch(GitAction.CallGetParcelStatus({ trackingNumber: "and UserID=" + LogonUser }))
            dispatch(GitAction.CallGetGeneralSetting({ UserID: LogonUser }))
            setUserCode(LogonUserCode)
        }
    }, [])

    const layoutStyle = { fontWeight: "600", fontSize: "10pt", color: "#253949", letterSpacing: 1 }
    const [value, setValue] = React.useState(0);
    const [parcelValue, setParcelValue] = React.useState(0);
    const [UserCode, setUserCode] = React.useState("");
    const [searchKeywords, setSearchKeywords] = React.useState("");
    const [isFiltered, setIsFiltered] = React.useState(false);
    const [filteredParcel, setFilteredParcel] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const pageSize = 10;
    const [isSetUnknown, setUnknown] = React.useState(false);
    const [unKnownUserCode, setUnknownUserCode] = React.useState(3);
    const parcelStatus = [
        { ContainerStatusID: 0, ContainerStatus: "All", ContainerStatusCN: "全部包裹" },
        { ContainerStatusID: 1, ContainerStatus: "Pending", ContainerStatusCN: "已入库系统" },
        { ContainerStatusID: 2, ContainerStatus: "China Warehouse", ContainerStatusCN: "已到中国仓库" },
        { ContainerStatusID: 3, ContainerStatus: "Loaded To Container", ContainerStatusCN: "已装箱" },
        { ContainerStatusID: 4, ContainerStatus: "Shipped", ContainerStatusCN: "已在船运途中" },
        { ContainerStatusID: 5, ContainerStatus: "Malaysia Kastam", ContainerStatusCN: "已到港，等待报关" },
        { ContainerStatusID: 6, ContainerStatus: "Malaysia Warehouse", ContainerStatusCN: "已到马来西亚仓库" },
        { ContainerStatusID: 7, ContainerStatus: "Unloaded Completed", ContainerStatusCN: "" }
    ];


    const handleChange = (event, newValue) => {
        let LogonUser = localStorage.getItem("user")
        let LogonUserCode = ""
        if (LogonUser !== undefined) {
            LogonUserCode = JSON.parse(LogonUser).UserCode
            LogonUser = JSON.parse(LogonUser).UserID
        }

        if (newValue === 0) {
            if (LogonUser !== undefined) {
                dispatch(GitAction.CallGetParcelStatus({ trackingNumber: "and UserID=" + LogonUser }))
                setUserCode(LogonUserCode)
            }
        }
        else {
            dispatch(GitAction.CallGetParcelStatus({ trackingNumber: "and UserCode=(SELECT [SettingValue] FROM.[dbo].[T_General_Setting] WHERE  [SettingID] = 1)" }))
            setUserCode(unKnownUserCode)
        }
        setValue(newValue);
    };

    const handleParcelStatusChange = (event, newValue) => {
        setParcelValue(newValue);
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

    const CheckUser = (Code) => {
        let listing = []
        if (userParcel.length > 0) {
            if (userParcel.filter((x) => parseInt(x.UserCode) === parseInt(Code)).length > 0)
                listing = userParcel
        }
        return listing
    }

    const handleSearchInput = (value) => {
        let DataSet = CheckUser(UserCode)
        let filteredListing = []
        DataSet.length > 0 && DataSet.filter((searchedItem) =>
            searchedItem.TrackingNumber !== null && searchedItem.TrackingNumber.toLowerCase().includes(
                value.toLowerCase()
            )
        ).map((filteredItem) => {
            filteredListing.push(filteredItem);
        })

        setPage(Math.ceil(filteredListing.length / pageSize))
        setSearchKeywords(value)
        setIsFiltered(true)
        setFilteredParcel(filteredListing)
    }

    const checkUserParcel = (statusID) => {
        let listing = []

        if (isFiltered === true)
            listing = filteredParcel
        else
            listing = CheckUser(UserCode)

        let dataListing = []
        if (listing.length > 0) {
            if (parcelValue === 0)
                dataListing = listing
            else
                dataListing = listing.filter((x) => x.StockStatusID === statusID)
        }
        return dataListing
    }

    const handlePageChange = (event, page) => {
        setPage(page)
    }

    if (setting.length > 0 && isSetUnknown === false) {
        setUnknownUserCode(setting[2].Column1)
        setUnknown(true)
    }

    const userParcelLayout = (statusID) => {
        return (
            <div className="row" style={{ paddingRight: "5pt" }}>
                <Grid container style={{ paddingBottom: "10pt", textAlign: "right", flexFlow: "row-reverse" }}>
                    <Pagination count={Math.ceil(checkUserParcel(statusID).length / pageSize)} page={page} onChange={handlePageChange} />
                </Grid>
                {
                    checkUserParcel(statusID).length > 0 ?
                        checkUserParcel(statusID).map((data, index) => {
                            return (
                                index > ((page - 1) * pageSize) - 1 && index < (page * pageSize) &&
                                <div className="row" style={{ paddingTop: "10pt" }}>
                                    <Card>
                                        <CardContent>
                                            <Grid container spacing={2}>
                                                <Grid item md={6} xs={12} sm={6}>
                                                    <Typography style={layoutStyle}>物流信息：{data.CourierName}  {data.TrackingNumber}</Typography>
                                                    <Typography style={layoutStyle}>包裹名称：{data.Item}</Typography>
                                                    <Typography style={layoutStyle}>包裹状态：{data.StockStatus}</Typography>
                                                </Grid>
                                                <Grid item md={6} xs={12} sm={6}>
                                                    <Typography style={layoutStyle}>包裹尺寸：{data.ProductDimensionDeep + "cm x " + data.ProductDimensionHeight + "cm x " + data.ProductDimensionWidth + "cm"}</Typography>
                                                    <Typography style={layoutStyle}>包裹重量：{data.ProductWeight + "kg"}</Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </div>
                            )
                        })
                        :
                        <div style={{ textAlign: "center" }}>
                            <img src={EmptyBox} style={{ height: "150pt" }}></img>
                            <Typography style={{ fontWeight: "600", fontSize: "15pt", color: "#253949", letterSpacing: 1 }}>暂无此状态包裹</Typography>
                        </div>
                }
            </div >
        )
    }

    const parcelLayout = () => {
        return (
            <div className="row">
                {
                    UserCode === unKnownUserCode ?
                        userParcel.length > 0 ?
                            CheckUser(UserCode).length > 0 ?
                                <>
                                    <div className="row">
                                        <Typography style={{ fontSize: "12pt", color: "#253949", letterSpacing: 1 }}>如有属于您的快递单号包裹可截图快递物流信息联系我们的客服</Typography>
                                        <Typography style={{ fontWeight: "600", fontSize: "10pt", color: "#253949", letterSpacing: 1, paddingBottom: "10pt" }}>注意： 如包裹超过3个月无人认领，公司会自行处理包裹，不做另行通知</Typography>
                                    </div>
                                    <Grid container spacing={2}>
                                        {
                                            CheckUser(UserCode).map((data, index) => {
                                                return (
                                                    <Grid item md={6} xs={12} sm={12}>
                                                        <Card>
                                                            <CardContent>
                                                                <Typography style={layoutStyle}># {index + 1}</Typography>
                                                                <Typography style={layoutStyle}>物流信息：{data.CourierName}  {data.TrackingNumber}</Typography>
                                                                <Typography style={layoutStyle}>包裹名称：{data.Item}</Typography>
                                                                <Typography style={layoutStyle}>包裹状态：{parcelStatus.length > 0 && parcelStatus.filter((x) => x.ContainerStatusID === data.StockStatusID).map((y) => { return (y.ContainerStatusCN) })}</Typography>
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </Grid>
                                </>
                                :
                                <LoadingPanel />
                            :
                            <div style={{ textAlign: "center" }}>
                                <img src={EmptyBox} style={{ height: "150pt" }}></img>
                                <Typography style={{ fontWeight: "600", fontSize: "15pt", color: "#253949", letterSpacing: 1 }}>暂无待认领包裹</Typography>
                            </div>
                        :
                        <div className="row">
                            <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'darkgrey' }}>
                                    <Tabs value={parcelValue} onChange={handleParcelStatusChange} aria-label="parcelStatus"
                                        orientation="vertical" sx={{ borderRight: 1, borderColor: 'divider' }} variant="scrollable">
                                        {
                                            parcelStatus.length > 0 && parcelStatus.map((x, index) => {
                                                return (<Tab label={x.ContainerStatusCN} {...a11yProps(x.ContainerStatusID)} />)
                                            })
                                        }
                                    </Tabs>
                                </Box>
                                {
                                    parcelStatus.length > 0 && parcelStatus.map((x, index) => {

                                        return (<TabPanel style={{ width: "100%" }} value={parcelValue} index={x.ContainerStatusID}>  {userParcelLayout(x.ContainerStatusID)}  </TabPanel>)
                                    })
                                }
                            </Box>
                        </div>
                }
            </div>
        )
    }

    return (
        <div className="container" style={{ padding: "15pt" }}>
            {
                UserCode !== unKnownUserCode &&
                <SearchBar
                    id=""
                    placeholder="快递单号"
                    label="快递单号"
                    onChange={(e) => handleSearchInput(e.target.value)}
                    className="searchbar-input mb-auto"
                    tooltipText="Search with current data"
                    value={searchKeywords}
                />
            }
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'darkgrey' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="parcelType" variant="fullWidth">
                        <Tab label="我的包裹资料" {...a11yProps(0)} />
                        <Tab label="待认领包裹资料" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    {parcelLayout()}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {parcelLayout()}
                </TabPanel>
            </Box>
        </div>
    )
}