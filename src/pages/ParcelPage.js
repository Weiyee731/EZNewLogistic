import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, Provider } from 'react-redux'
import { GitAction } from "../store/action/gitAction";
import Box from '@mui/material/Box';
import {  Typography, TableCell } from '@mui/material';
import SearchBar from "../components/SearchBar/SearchBar";
import LoadingPanel from "../components/LoadingPanel/LoadingPanel";
import EmptyParcel from "../assets/empty-parcel.png"
import { isArrayNotEmpty } from "../tools/Helpers";
import useAuth from "../hooks/useAuth";

import TableComponents from "../components/TableComponents/TableComponents";
export const ParcelPage = (props) => {
    const { userParcel, setting, userProfile } = useSelector(state => ({
        userParcel: state.counterReducer.parcelStatus,
        setting: state.counterReducer.setting,
        userProfile: state.counterReducer.userProfile,
    }));
    const { auth } = useAuth()
    const dispatch = useDispatch()

    useEffect(() => {
        let LogonUser = localStorage.getItem("user")
        let LogonUserCode = ""

        if (LogonUser !== undefined) {
            LogonUserCode = JSON.parse(LogonUser).UserCode
            LogonUser = JSON.parse(LogonUser).UserID

            dispatch(GitAction.CallGetGeneralSetting({ UserID: LogonUser }))
            setUserCode(LogonUserCode)
            setUserID(LogonUser)

            if (props.type === "claim")
                dispatch(GitAction.CallGetParcelStatus({ trackingNumber: "and UserCode=(SELECT [SettingValue] FROM.[dbo].[T_General_Setting] WHERE  [SettingID] = 1)" }))
            else
                dispatch(GitAction.CallGetParcelStatus({ trackingNumber: "and UserID=" + LogonUser }))

        }
    }, [])

    const [UserCode, setUserCode] = React.useState("");
    const [UserID, setUserID] = React.useState("");
    const [searchKeywords, setSearchKeywords] = React.useState("");
    const [isFiltered, setIsFiltered] = React.useState(false);
    const [filteredParcel, setFilteredParcel] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const pageSize = 10;
    const [isSetUnknown, setUnknown] = React.useState(false);
    const [unKnownUserCode, setUnknownUserCode] = React.useState(3);

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
                        <div>{children}</div>
                    </Box>
                )}
            </div>
        );
    }

    const tableHeadCells = [
        {
            id: "CourierName",
            align: 'left',
            disablePadding: false,
            label: "快递公司",
        },
        {
            id: "TrackingNumber",
            align: 'left',
            disablePadding: false,
            label: "快递单号 ",
        },
        {
            id: "Item",
            align: 'left',
            disablePadding: false,
            label: "包裹名称",
        },
        {
            id: "ProductWeight",
            align: 'left',
            disablePadding: false,
            label: "重量",
        },
        {
            id: "ProductDimensionDeep",
            align: 'left',
            disablePadding: false,
            label: "尺寸",
        },
        {
            id: "Volume",
            align: 'left',
            disablePadding: false,
            label: "体积",
        },
        {
            id: "Price",
            align: 'left',
            disablePadding: false,
            label: "价格",
        },
        {
            id: "parcelStatus",
            align: 'left',
            disablePadding: false,
            label: "包裹状态",
        },
    ];


    const claimTableHeadCells = [
        {
            id: "CourierName",
            align: 'left',
            disablePadding: false,
            label: "快递公司",
        },
        {
            id: "TrackingNumber",
            align: 'left',
            disablePadding: false,
            label: "快递单号 ",
        },
        {
            id: "ProductWeight",
            align: 'left',
            disablePadding: false,
            label: "重量",
        },
        {
            id: "ProductDimensionDeep",
            align: 'left',
            disablePadding: false,
            label: "尺寸",
        },
        {
            id: "Volume",
            align: 'left',
            disablePadding: false,
            label: "体积",
        },
        {
            id: "parcelStatus",
            align: 'left',
            disablePadding: false,
            label: "包裹状态",
        },
    ];

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


    const calculateParcelPrice = (data) => {
        let parcelPrice = 0
        if (userProfile !== undefined && isArrayNotEmpty(userProfile) && userProfile.ReturnVal === undefined) {
            let MinimumPrice = userProfile[0].MinimumPrice
            let SelfPickOverCubic = userProfile[0].SelfPickOverCubic
            let ConsolidatedPrice = userProfile[0].ConsolidatedPrice
            let LargeDeliveryPrice = userProfile[0].LargeDeliveryPrice
            let SmallDeliveryFirstPrice = userProfile[0].SmallDeliveryFirstPrice
            let SmallDeliverySubPrice = userProfile[0].SmallDeliverySubPrice
            let userAreaID = userProfile[0].UserAreaID

            if (userAreaID === 1 || userAreaID === 5) {
                if (data.Volume < 0.013 && data.ProductWeight < 500)
                    parcelPrice = MinimumPrice
                else if (data.Volume >= 0.013 && data.ProductWeight < 500)
                    parcelPrice = data.Volume * SelfPickOverCubic
                else {
                    if (data.Volume < (data.ProductWeight / 500))
                        parcelPrice = (data.ProductWeight / 500) * SelfPickOverCubic
                    else
                        parcelPrice = data.Volume * SelfPickOverCubic
                }
            } else {

                let volumetricWeight = (data.ProductDimensionDeep * data.ProductDimensionHeight * data.ProductDimensionWidth) / 6000
                let selectedWeight = Math.ceil(data.ProductWeight)
                if (Math.ceil(volumetricWeight) > selectedWeight)
                    selectedWeight = Math.ceil(volumetricWeight)

                if (data.Volume < 0.5 && data.ProductWeight < 500)
                    parcelPrice = (selectedWeight - 1) * SmallDeliverySubPrice + SmallDeliveryFirstPrice
                else if (data.Volume >= 0.5 && data.ProductWeight < 500)
                    parcelPrice = data.Volume * LargeDeliveryPrice
                else {
                    if (data.Volume < (data.ProductWeight / 500))
                        parcelPrice = (data.ProductWeight / 500) * LargeDeliveryPrice
                    else
                        parcelPrice = data.Volume * LargeDeliveryPrice
                }
            }
        }
        return parcelPrice
    }

    if (setting.length > 0 && isSetUnknown === false) {
        setUnknownUserCode(setting[2].Column1)
        setUnknown(true)
    }

    const renderTableRows = (data, index) => {
        return (
            data.UserID !== UserID ?
                <LoadingPanel />
                :
                <>
                    <TableCell align="left" style={{ fontSize: "12px" }}>{data.CourierName}</TableCell>
                    <TableCell align="left" style={{ fontSize: "12px" }}>{data.TrackingNumber}</TableCell>
                    <TableCell align="left" style={{ fontSize: "12px" }}>{data.Item}</TableCell>
                    <TableCell align="left" style={{ fontSize: "12px" }}>{data.ProductWeight} kg</TableCell>
                    <TableCell align="left" style={{ fontSize: "12px" }}>{data.ProductDimensionDeep + "cm x " + data.ProductDimensionHeight + "cm x " + data.ProductDimensionWidth + "cm"}</TableCell>
                    <TableCell align="left" style={{ fontSize: "12px" }}>{parseFloat(data.Volume).toFixed(3)}</TableCell>
                    <TableCell align="left" style={{ fontSize: "12px" }}>{calculateParcelPrice(data) !== undefined ? parseFloat(calculateParcelPrice(data)).toFixed(2) : 0}</TableCell>
                    <TableCell align="left" style={{ fontSize: "12px" }}>{data.ContainerID === 0 ? "已入库" : data.StockStatusID === 3 ? data.ContainerRemark : "抵达古晋仓库"}</TableCell>
                </>
        )
    }

    const renderClaimTableRows = (data, index) => {
        return (
            data.UserID === UserID ?
                <LoadingPanel />
                :
                <>
                    <TableCell align="left" style={{ fontSize: "12px" }}>{data.CourierName}</TableCell>
                    <TableCell align="left" style={{ fontSize: "12px" }}>{data.TrackingNumber}</TableCell>
                    <TableCell align="left" style={{ fontSize: "12px" }}>{data.ProductWeight} kg</TableCell>
                    <TableCell align="left" style={{ fontSize: "12px" }}>{data.ProductDimensionDeep + "cm x " + data.ProductDimensionHeight + "cm x " + data.ProductDimensionWidth + "cm"}</TableCell>
                    <TableCell align="left" style={{ fontSize: "12px" }}>{parseFloat(data.Volume).toFixed(3)}</TableCell>
                    <TableCell align="left" style={{ fontSize: "12px" }}>{data.ContainerID === 0 ? "已入库" : data.StockStatusID === 3 ? data.ContainerRemark : "抵达古晋仓库"}</TableCell>
                </>
        )
    }

    return (
        <div className="row" style={{ position: "absolute", top: "120px", width: "100%", paddingRight: "20px", paddingBottom: "50px" }}>
            {
                props.type === "claim" &&
                <div className="row" style={{ paddingBottom: "10px" }}>
                    <Typography style={{ paddingLeft: "10px" }}>如以下是您的货物，请截图物流信息发进群，如货物超过<strong> 90 天</strong>无人认领，会由本司自行处理货物</Typography>
                </div>
            }
            {
                isArrayNotEmpty(userParcel) && userParcel[0].ReturnVal === undefined ?
                    <TableComponents
                        tableTopLeft={
                            <>
                                <SearchBar
                                    id=""
                                    placeholder="快递单号"
                                    label="快递单号"
                                    onChange={(e) => handleSearchInput(e.target.value)}
                                    tooltipText="Search with current data"
                                    value={searchKeywords}
                                />
                            </>
                        }
                        tableOptions={{
                            dense: true,
                            tableOrderBy: 'asc',
                            sortingIndex: "StockDate",
                            stickyTableHeader: true,
                        }}
                        paginationOptions={[20, 25, 30, { label: 'All', value: -1 }]}
                        tableHeaders={props.type === "claim" ? claimTableHeadCells : tableHeadCells}
                        tableRows={{
                            renderTableRows: props.type === "claim" ? renderClaimTableRows : renderTableRows,
                            checkbox: false,
                            checkboxColor: "primary",
                            onRowClickSelect: false
                        }}
                        selectedIndexKey={"StockID"}

                        Data={
                            isFiltered ?
                                isArrayNotEmpty(filteredParcel) ? filteredParcel : []
                                :
                                isArrayNotEmpty(userParcel) && userParcel[0].ReturnVal === undefined ? userParcel : []}
                    />
                    :
                    isArrayNotEmpty(userParcel) && userParcel[0].ReturnVal === 0 ?
                        <div style={{ textAlign: "center" }}>
                            <img src={EmptyParcel} style={{ height: "100pt" }} alt="EZ No Parcel"></img>
                            <Typography style={{ fontWeight: "600", fontSize: "13pt", color: "#253949", letterSpacing: 1 }}>暂无包裹资料</Typography>
                        </div>
                        :
                        < LoadingPanel />
            }

        </div>
    )
}