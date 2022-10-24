import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, Provider } from 'react-redux'
import { GitAction } from "../store/action/gitAction";
import { Card, CardContent, Typography, Grid,Tabs, Tab,Box } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import SearchBar from "../components/SearchBar/SearchBar";
import LoadingPanel from "../components/LoadingPanel/LoadingPanel";
import EmptyBox from "../assets/empty-box.png"

export const ParcelPage = () => {
    const { userParcel } = useSelector(state => ({
        userParcel: state.counterReducer.parcelStatus,
    }));
    const dispatch = useDispatch()

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    useEffect(() => {
        dispatch(GitAction.CallGetParcelStatus({ trackingNumber:  localStorage.getItem("user") !== undefined ? "and UserID=" + JSON.parse(localStorage.getItem("user")).UserID : "and UserID=" + 1 }))
        setUserID(localStorage.getItem("user") !== undefined ? JSON.parse(localStorage.getItem("user")).UserID : 1)
    }, [])

    const layoutStyle = { fontWeight: "600", fontSize: "10pt", color: "#253949", letterSpacing: 1 }
    const [value, setValue] = React.useState(0);
    const [parcelValue, setParcelValue] = React.useState(0);
    const [UserID, setUserID] = React.useState("");
    const [searchKeywords, setSearchKeywords] = React.useState("");
    const [isFiltered, setIsFiltered] = React.useState(false);
    const [filteredParcel, setFilteredParcel] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const pageSize = 10;

    const [unKnownUserID, setUnknownUserID] = React.useState(3);
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
        if (newValue === 0) {
            dispatch(GitAction.CallGetParcelStatus({ trackingNumber:  localStorage.getItem("user") !== undefined ? "and UserID=" + JSON.parse(localStorage.getItem("user")).UserID : "and UserID=" + 1 }))
            setUserID(localStorage.getItem("user") !== undefined ? JSON.parse(localStorage.getItem("user")).UserID : 1)
        }
        else {
            dispatch(GitAction.CallGetParcelStatus({ trackingNumber: "and UserCode=(SELECT [SettingValue] FROM.[dbo].[T_General_Setting] WHERE  [SettingID] = 1)" }))
            setUserID(unKnownUserID)
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

    const CheckUser = (ID) => {
        let listing = []
        if (userParcel.length > 0) {
            if (userParcel.filter((x) => parseInt(x.UserID) === parseInt(ID)).length > 0)
                listing = userParcel
        }
        return listing
    }

    const handleSearchInput = (value) => {
        let DataSet = CheckUser(UserID)
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
            listing = CheckUser(UserID)

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

    const userParcelLayout = (statusID) => {
        return (
            <div className="row" style={{paddingRight:"5pt"}}>
                <Grid container style={{ paddingBottom: "10pt", textAlign: "right", flexFlow: "row-reverse" }}>
                    <Pagination count={Math.ceil(checkUserParcel(statusID).length / pageSize)} page={page} onChange={handlePageChange} />
                </Grid>
                {
                    checkUserParcel(statusID).length > 0 ?
                        <Grid container spacing={2}>
                            {
                                checkUserParcel(statusID).map((data, index) => {
                                    return (
                                        index > ((page - 1) * pageSize) - 1 && index < (page * pageSize) &&
                                        <Grid item md={6} xs={12} sm={12} >
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
                                        </Grid>
                                    )
                                })
                            }
                        </Grid >
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
                    UserID === unKnownUserID ?
                        userParcel.length > 0 ?
                            CheckUser(UserID).length > 0 ?
                                <>
                                    <div className="row">
                                        <Typography style={{ fontSize: "14pt", color: "#253949", letterSpacing: 1 }}>如有属于您的快递单号包裹可截图快递物流信息联系我们的客服</Typography>
                                        <Typography style={{ fontWeight: "600", fontSize: "10pt", color: "#253949", letterSpacing: 1, paddingBottom: "10pt" }}>注意： 如包裹超过3个月无人认领，公司会自行处理包裹，不做另行通知</Typography>
                                    </div>
                                    <Grid container spacing={2}>
                                        {
                                            CheckUser(UserID).map((data, index) => {
                                                return (
                                                    <Grid item md={6} xs={12} sm={6}>
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
        <div className="container">
            {
                UserID !== unKnownUserID &&
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