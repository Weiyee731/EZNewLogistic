import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch, Provider } from 'react-redux'
import { GitAction } from "../store/action/gitAction";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Box from "@mui/material/Box";
import { styled } from '@mui/material/styles';

import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import KeyIcon from '@mui/icons-material/Key';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import useAuth from "../hooks/useAuth";
import { toast } from 'react-toastify'
import { isArrayNotEmpty, isObjectUndefinedOrNull, isStringNullOrEmpty, useWindowDimensions } from '../tools/Helpers'
import { ParcelTrackingPage } from "./ParcelTrackingPage";
import { ParcelPage } from "./ParcelPage";

import { NotificationView } from "../components/NotificationView";
import { TableHead } from "@mui/material";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LoadingPanel from "../components/LoadingPanel/LoadingPanel";

export const Profilepage = () => {
    const { auth, setAuth } = useAuth()
    const navigate = useNavigate()
    const { width } = useWindowDimensions()

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

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

    // dispatch and global props here
    const dispatch = useDispatch();
    const isFormSubmitting = useSelector(state => state.counterReducer.loading)
    const userProfile = useSelector(state => state.counterReducer.userProfile)
    const areaCodes = useSelector(state => state.counterReducer.areaCodes)
    const userParcel = useSelector(state => state.counterReducer.parcelStatus)
    const isUserProfileUpdate = useSelector(state => state.counterReducer.userUpdateReturnValue)
    const viewNotification = useSelector(state => state.counterReducer.viewNotification)
    const commission = useSelector(state => state.counterReducer.commission)


    const [value, setValue] = React.useState(0);
    const [isAgent, setIsAgent] = React.useState(false);
    const [agentCode, setAgentCode] = React.useState(0);
    // CONSTANT OR STYLE HERE
    const USER_PROFILE_PAGE = 'User Profile'
    const ALL_ORDERS_PAGE = 'All Orders'
    const PARCEL_TRACKING_PAGE = 'Parcel Tracking'
    const CLAIM_CARGO_PAGE = 'Claim Cargo'
    const PASSWORD_MANAGER_PAGE = 'Password Manager'

    // HOOKS HERE
    const [currentPage, setCurrentPage] = useState(USER_PROFILE_PAGE)
    const [profile, setProfile] = useState(null)

    // USE EFFECT
    useEffect(() => {
        dispatch(GitAction.CallGetNotification({ status: 2 }));
        dispatch(GitAction.CallFetchUserAreaCode());
        if (!isObjectUndefinedOrNull(auth) && !isStringNullOrEmpty(auth.UserID) && !isStringNullOrEmpty(auth.UserCode)) {
            dispatch(GitAction.CallFetchUserProfileByID({ UserID: auth.UserID }));
            dispatch(GitAction.CallViewCommissionByUserCode({ UserCode: auth.UserCode }));
        }
    }, [])

    useEffect(() => {
        if (!isObjectUndefinedOrNull(auth) && !isStringNullOrEmpty(auth.UserID) && !isStringNullOrEmpty(auth.UserCode)) {
            if (isArrayNotEmpty(areaCodes) && areaCodes.filter((x) => x.UserID == auth.UserID && x.AgentInd === 1).length > 0) {
                let areaID = ""
                areaCodes.filter((x) => x.UserID == auth.UserID && x.AgentInd === 1).map((y) => {
                    areaID = y.UserAreaID
                })
                dispatch(GitAction.CallGetParcelStatus({ trackingNumber: "and UserAreaID=" + areaID }))
                setIsAgent(true)
                setAgentCode(areaID)
            } else {
                dispatch(GitAction.CallGetParcelStatus({ trackingNumber: "and UserID=" + auth.UserID }))
                setIsAgent(false)
            }
        }
    }, [areaCodes])

    useEffect(() => {
        if (isArrayNotEmpty(userProfile) && profile !== userProfile[0]) {
            setProfile(userProfile[0])
        }
    }, [userProfile])

    const handleLogout = () => {
        setAuth({})
        dispatch(GitAction.CallResetUserProfile())
        localStorage.setItem("user", "")
    }

    const SideMenu = () => {
        const [expanded, setExpanded] = useState(true)

        const selectedStyle = {
            bgcolor: 'rgb(99, 141, 161)',
            color: '#F5F5F5',
            '&.child': {
                color: '#F5F5F5',
            }
        }

        const handleChange = (event, newValue) => {
            setValue(newValue);
            let LogonUser = localStorage.getItem("user")
            if (LogonUser !== undefined)
                LogonUser = JSON.parse(LogonUser).UserID
            switch (newValue) {
                case 0:
                    handleSetCurrentPage(USER_PROFILE_PAGE)
                    if (isArrayNotEmpty(areaCodes) && areaCodes.filter((x) => x.UserID == LogonUser && x.AgentInd === 1).length > 0) {
                        let areaID = ""
                        areaCodes.filter((x) => x.UserID == LogonUser && x.AgentInd === 1).map((y) => {
                            areaID = y.UserAreaID
                        })
                        dispatch(GitAction.CallGetParcelStatus({ trackingNumber: "and UserAreaID=" + areaID }))
                        setIsAgent(true)
                        setAgentCode(areaID)
                    } else {
                        dispatch(GitAction.CallGetParcelStatus({ trackingNumber: "and UserID=" + LogonUser }))
                        setIsAgent(false)
                    }


                    // dispatch(GitAction.CallGetParcelStatus({ trackingNumber: "and UserID=" + auth.UserID }))
                    break;

                case 1:
                    if (isArrayNotEmpty(areaCodes) && areaCodes.filter((x) => x.UserID == LogonUser && x.AgentInd === 1).length > 0) {
                        let areaID = ""
                        areaCodes.filter((x) => x.UserID == LogonUser && x.AgentInd === 1).map((y) => {
                            areaID = y.UserAreaID
                        })
                        dispatch(GitAction.CallGetParcelStatus({ trackingNumber: "and UserAreaID=" + areaID }))
                        setIsAgent(true)
                        setAgentCode(areaID)
                    } else {
                        dispatch(GitAction.CallGetParcelStatus({ trackingNumber: "and UserID=" + LogonUser }))
                        setIsAgent(false)
                    }

                    handleSetCurrentPage(ALL_ORDERS_PAGE)
                    break;

                case 2:
                    handleSetCurrentPage(PARCEL_TRACKING_PAGE)
                    break;

                case 3:
                    dispatch(GitAction.CallGetParcelStatus({ trackingNumber: "and UserCode=(SELECT [SettingValue] FROM.[dbo].[T_General_Setting] WHERE  [SettingID] = 1)" }))
                    setIsAgent(false)
                    handleSetCurrentPage(CLAIM_CARGO_PAGE)
                    break;

                default:
                    break;
            }
        };

        return (
            <div >
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'darkgrey' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="parcelType" variant="scrollable" scrollButtons
                            allowScrollButtonsMobile>
                            <Tab label="????????????" {...a11yProps(0)} />
                            <Tab label="????????????" {...a11yProps(1)} />
                            <Tab label="????????????" {...a11yProps(2)} />
                            <Tab label="???????????????" {...a11yProps(3)} />
                        </Tabs>
                    </Box>
                </Box>
            </div>
        )
    }

    const handleSetCurrentPage = (pageType) => {
        setCurrentPage(pageType)
    }


    const UserProfile = () => {

        const [expanded, setExpanded] = useState(true)
        const [userExpanded, setUserExpanded] = useState(false)
        const [referalModal, setReferalModal] = useState(false)

        const Item = styled(Paper)(({ theme }) => ({
            backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#F4F5F5',
            ...theme.typography.body2,
            // padding: theme.spacing(1),
            textAlign: 'left',
            color: theme.palette.text.secondary,
        }));
        return (
            <>
                <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}  >
                    {/* <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="profile-content"
                        id="profile-summary"
                    > */}


                    <AccordionDetails >
                        <AddressManager />
                    </AccordionDetails>
                </Accordion>
            </>

        )
    }

    const UpdateProfileForm = ({ open, setOpenModal, profile, isUserProfileUpdate }) => {
        const [openRegistrationModal, setOpenRegistrationModal] = useState(open)
        const [accountInfo, setAccountInfo] = useState(null)

        useEffect(() => {
            setOpenRegistrationModal(open)

            if (open === false) {
                setTimeout(() => { setAccountInfo(null) }, 300)
            }
            else {
                if (!isObjectUndefinedOrNull(profile)) {

                    const info = {
                        USERID: profile.UserID,
                        USERCODE: profile.UserCode,
                        USERAREAID: profile.UserAreaID,
                        FULLNAME: profile.Fullname,
                        USERNAME: profile.Username,
                        USERNICKNAME: isStringNullOrEmpty(profile.UserNickname) ? "-" : profile.UserNickname,
                        CONTACTNO: profile.UserContactNo,
                        USEREMAIL: isStringNullOrEmpty(profile.UserEmailAddress) ? "-" : profile.UserEmailAddress,
                        USERADDRESS: isStringNullOrEmpty(profile.UserAddress) ? "-" : profile.UserAddress,
                        WECHATID: isStringNullOrEmpty(profile.UserWechatID) ? "-" : profile.UserWechatID,
                        MINSELFPICKUPPRICE: isStringNullOrEmpty(profile.MinimumPrice) ? 0 : profile.MinimumPrice,
                        CUBICSELFPICKUPPRICE: isStringNullOrEmpty(profile.SelfPickOverCubic) ? 0 : profile.SelfPickOverCubic,
                        CONSOLIDATEPRICE: isStringNullOrEmpty(profile.ConsolidatedPrice) ? 0 : profile.ConsolidatedPrice,
                        DELIVERYCARGO: isStringNullOrEmpty(profile.LargeDeliveryPrice) ? 0 : profile.LargeDeliveryPrice,
                        DELIVERYFIRSTPRICE: isStringNullOrEmpty(profile.SmallDeliveryFirstPrice) ? 0 : profile.SmallDeliveryFirstPrice,
                        DELIVERYSUBPRICE: isStringNullOrEmpty(profile.SmallDeliverySubPrice) ? 0 : profile.SmallDeliverySubPrice,
                    }
                    setAccountInfo({ ...info })
                }
            }
        }, [open])

        useEffect(() => {
            if (isArrayNotEmpty(isUserProfileUpdate)) {
                if (isUserProfileUpdate[0].ReturnVal === 1 || isUserProfileUpdate[0].ReturnVal === "1") {
                    toast.success("?????????????????????????????????", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: false,
                        theme: "colored",
                    })

                    if (!isObjectUndefinedOrNull(profile))
                        dispatch(GitAction.CallFetchUserProfileByID({ UserID: profile.UserID }))
                    setTimeout(() => { setAccountInfo(null) }, 300)
                }
                else {
                    toast.error("?????????????????????????????????????????????", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: false,
                        theme: "colored",
                    })
                }
                dispatch(GitAction.CallResetUserUpdateReturnValue())
            }

        }, [isUserProfileUpdate])

        const handleCloseModal = () => {
            setOpenRegistrationModal(false)
            setOpenModal(false)
        }

        const handleInputChange = (name, event) => {
            let info = accountInfo;

            switch (name) {
                case 'FULLNAME':
                    info.FULLNAME = isStringNullOrEmpty(event.target.value) ? "" : event.target.value.toUpperCase()
                    setAccountInfo({ ...info })
                    break;

                case 'USERNAME':
                    info.USERNAME = event.target.value
                    setAccountInfo({ ...info })
                    break;

                case 'USERNICKNAME':
                    info.USERNICKNAME = event.target.value
                    setAccountInfo({ ...info })
                    break;

                case 'USERADDRESS':
                    info.USERADDRESS = event.target.value
                    setAccountInfo({ ...info })
                    break;

                case 'CONTACTNO':
                    info.CONTACTNO = event.target.value
                    setAccountInfo({ ...info })
                    break;

                case 'USEREMAIL':
                    info.USEREMAIL = event.target.value
                    setAccountInfo({ ...info })
                    break;

                case 'WECHATID':
                    info.WECHATID = event.target.value
                    setAccountInfo({ ...info })
                    break;

                default: break;
            }
        }

        const handleUpdateUserProfile = () => {
            let submittingProps = { ...accountInfo }

            if (!isObjectUndefinedOrNull(submittingProps)) {
                let isvalid = (
                    !isStringNullOrEmpty(submittingProps.FULLNAME) &&
                    !isStringNullOrEmpty(submittingProps.USERNAME) &&
                    !isStringNullOrEmpty(submittingProps.CONTACTNO) &&
                    !isStringNullOrEmpty(submittingProps.USEREMAIL)
                )

                if (isvalid) {
                    submittingProps.WECHATID = !isStringNullOrEmpty(submittingProps.WECHATID) ? submittingProps.WECHATID : "-"
                    submittingProps.USERNICKNAME = !isStringNullOrEmpty(submittingProps.USERNICKNAME) ? submittingProps.USERNICKNAME : "-"
                    submittingProps.USERADDRESS = !isStringNullOrEmpty(submittingProps.USERADDRESS) ? submittingProps.USERADDRESS : "-"

                    dispatch(GitAction.CallUpdateUserProfile(submittingProps))
                }
                else {
                    toast.error("?????????????????????", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: false,
                        theme: "colored",
                    })
                }
            }
            else {
                toast.error("?????????????????????", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: false,
                    theme: "colored",
                })
            }
        }

        return (
            <Dialog scroll="paper" open={openRegistrationModal} onClose={handleCloseModal} aria-labelledby="update-profile-title" aria-describedby="update-profile-description" >
                <DialogTitle id="update-profile-title">
                    <Typography variant="h5" component="p" sx={{ fontWeight: 600 }}>
                        ????????????
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModal}
                        sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500], }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                {
                    isObjectUndefinedOrNull(accountInfo) ?
                        <DialogContent>Relogin</DialogContent>
                        :
                        <DialogContent>
                            <TextField id="profile--fullname"
                                value={accountInfo.FULLNAME}
                                onChange={(event) => { handleInputChange("FULLNAME", event) }}
                                label="??????"
                                fullWidth
                                variant="standard"
                                required
                                size="small"
                                sx={{ my: 1 }}
                                error={isStringNullOrEmpty(accountInfo.FULLNAME)}
                                helperText={isStringNullOrEmpty(accountInfo.FULLNAME) ? "?????????????????????" : ''}
                            />
                            <TextField id="profile--contact"
                                value={accountInfo.CONTACTNO}
                                onChange={(event) => { handleInputChange("CONTACTNO", event) }}
                                label="??????"
                                fullWidth
                                variant="standard"
                                size="small"
                                sx={{ my: 1 }}
                                required
                                error={isStringNullOrEmpty(accountInfo.CONTACTNO)}
                                helperText={isStringNullOrEmpty(accountInfo.CONTACTNO) ? "???????????????????????????" : ''}
                            />
                            <TextField id="profile--email"
                                value={accountInfo.USEREMAIL}
                                onChange={(event) => { handleInputChange("USEREMAIL", event) }}
                                label="??????"
                                fullWidth
                                variant="standard"
                                size="small"
                                sx={{ my: 1 }}
                                required
                                error={isStringNullOrEmpty(accountInfo.USEREMAIL)}
                                helperText={isStringNullOrEmpty(accountInfo.USEREMAIL) ? "???????????????????????????" : ''}
                            />
                            <TextField id="profile--wechat"
                                value={accountInfo.WECHATID}
                                onChange={(event) => { handleInputChange("WECHATID", event) }}
                                label="??????"
                                fullWidth
                                variant="standard"
                                size="small"
                                sx={{ my: 1 }}
                            />
                        </DialogContent>

                }
                <DialogActions>
                    {
                        !isFormSubmitting ?
                            <Button sx={{ mx: 2, my: 1 }} onClick={handleUpdateUserProfile} variant="contained" fullWidth> ?????? </Button>
                            :
                            <Button disabled variant="contained" size="small" endIcon={<CircularProgress size="small" />} sx={{ width: '100%', mx: 2, my: 1 }}>
                                ????????? ...
                            </Button>
                    }
                </DialogActions>
            </Dialog>
        )
    }

    const NotificationAccordion = () => {
        const [expanded, setExpanded] = useState(true)

        return (
            <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)} style={{
                minHeight: "270px"
            }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="notification-content"
                    id="panel1bh-header"
                    sx={{ display: 'flex' }}

                >

                    <Typography sx={{ flexShrink: 0, fontWeight: 600, my: 'auto', mr: 2, color: "#004085" }}>
                        ????????????
                    </Typography>
                    {viewNotification && <Chip size="small" color="primary" sx={{ my: 'auto', minWidth: '50px' }} label={viewNotification.length} />}
                </AccordionSummary>
                <AccordionDetails>
                    {viewNotification && viewNotification.length > 0 ? viewNotification.map((item, index) => {
                        return (
                            <NotificationView
                                key={index}
                                message={item.NotificationDesc}
                                title={item.NotificationTitle}
                                date={item.CreatedDate}
                            />
                        )
                    })
                        :
                        <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                            ???????????????
                        </div>
                    }
                </AccordionDetails>
            </Accordion>

        )

    }

    const AddressManager = () => {
        const [isCopyText, setIsCopyText] = useState("??????")

        let UserCode = auth?.UserCode
        let Username = auth?.Username
        try {
            let local_storage = localStorage.getItem("user")
            if (!isStringNullOrEmpty(local_storage)) {
                if (isStringNullOrEmpty(UserCode) || isStringNullOrEmpty(Username)) {
                    local_storage = JSON.parse(local_storage)
                    UserCode = local_storage.UserCode
                    Username = local_storage.Username
                }
            }
            else {
                toast.error("???????????????????????????????????????", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: false,
                    theme: "colored",
                })
                handleLogout()
            }

        }
        catch {
            toast.error("???????????????????????????????????????", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: false,
                theme: "colored",
            })
            handleLogout()
        }

        const TitleStyle = {
            width: '20%',
            fontWeight: 600,
            bgcolor: '#F3F3F3',
            border: '1px solid rgba(77,77,77,.3)'
        }

        const CopyableStyle = {
            border: '1px solid rgba(77,77,77,.3)',
            cursor: 'pointer',
            '&:hover': { bgcolor: '#F3F3F3' }
        }

        const NormalStyle = {
            border: '1px solid rgba(77,77,77,.3)',
        }

        const handleCopyToClipboard = (text) => {
            navigator.clipboard.writeText(text)
            setIsCopyText("????????????")
            setTimeout(() => { setIsCopyText("??????") }, 500)
        }

        return (
            <Card elevation={0}>
                <Typography sx={{ fontWeight: 600 }}> ????????????????????????????????? </Typography>
                {/* <Typography sx={{ fontSize: "12px", color: "grey" }}>?????????????????????????????????</Typography> */}
                <CardContent>
                    {
                        !isObjectUndefinedOrNull(profile) &&
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="addresses table">
                                <TableBody>
                                    <Tooltip title={isCopyText} placement="top" arrow>
                                        <TableRow key={"Contact Person"} onClick={() => handleCopyToClipboard('(' + profile.UserCode + ') EZ ?????? ' + profile.AreaCode + " ???")}>
                                            <TableCell component="th" scope="row" sx={{ ...TitleStyle }} > ?????????: </TableCell>
                                            <TableCell align="left" sx={{ ...CopyableStyle }}>({profile.UserCode}) EZ ?????? {profile.AreaCode} ???</TableCell>
                                        </TableRow>
                                    </Tooltip>
                                    <TableRow key={"Address"}>
                                        <TableCell component="th" scope="row" sx={{ ...TitleStyle }}> ????????????: </TableCell>
                                        <TableCell align="left" sx={{ ...NormalStyle }}>????????? - ????????? 9.00 - 18.00</TableCell>
                                    </TableRow>
                                    <Tooltip title={isCopyText} placement="top" arrow>
                                        <TableRow key={"Collection Time"} onClick={() => handleCopyToClipboard('?????????????????????????????????????????????69???101???????????????1??????' + profile.AreaCode + "???" + profile.UserCode + "(?????????" + profile.UserCode + ")")}>
                                            <TableCell component="th" scope="row" sx={{ ...TitleStyle }}> ????????????: </TableCell>
                                            <TableCell align="left" sx={{ ...CopyableStyle }}>?????????????????????????????????????????????69???101???????????????1??????{profile.AreaCode} ??? {profile.UserCode}(?????????{profile.UserCode})</TableCell>
                                        </TableRow>
                                    </Tooltip>
                                    <Tooltip title={isCopyText} placement="top" arrow>
                                        <TableRow key={"Contact Number"} onClick={() => handleCopyToClipboard('13532819696')}>
                                            <TableCell component="th" scope="row" sx={{ ...TitleStyle }}> ????????????: </TableCell>
                                            <TableCell align="left" sx={{ ...CopyableStyle }}>13532819696</TableCell>
                                        </TableRow>
                                    </Tooltip>
                                    <Tooltip title={isCopyText} placement="top" arrow>
                                        <TableRow key={"Postcode"} onClick={() => handleCopyToClipboard('523900')}>
                                            <TableCell component="th" scope="row" sx={{ ...TitleStyle }}> ????????????: </TableCell>
                                            <TableCell align="left" sx={{ ...CopyableStyle }}>523900</TableCell>
                                        </TableRow>
                                    </Tooltip>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
                </CardContent>
            </Card>
        )
    }

    const PasswordManager = () => {
        const [newPassword, setNewPassword] = useState("")
        const [showNewPassword, setShowNewPassword] = useState(false)
        const [confirmPassword, setConfirmPassword] = useState("")
        const [invalidInput, setInvalidInput] = useState(false)

        useEffect(() => {
            if (isArrayNotEmpty(isUserProfileUpdate)) {
                if (isUserProfileUpdate[0].ReturnVal === 1 || isUserProfileUpdate[0].ReturnVal === '1') {
                    toast.success('??????????????????', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: false,
                        theme: "colored",
                    });
                    setNewPassword('')
                    setConfirmPassword('')
                    setShowNewPassword(false)
                    setInvalidInput(false)
                    dispatch(GitAction.CallResetUserUpdateReturnValue())
                }
                else {
                    toast.error('??????????????????', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: false,
                        theme: "colored",
                    });
                }
            }
        }, [isUserProfileUpdate])

        const handleInputChange = (name, event) => {
            switch (name) {
                case 'NEW-PASSWORD':
                    const validPassword = (!isStringNullOrEmpty(event.target.value) && event.target.value.length >= 8)
                    setInvalidInput(!validPassword)
                    setNewPassword(event.target.value)
                    break;

                case 'CONFIRM-PASSWORD':
                    const matchPassword = (event.target.value === newPassword)
                    setInvalidInput(!matchPassword)
                    setConfirmPassword(event.target.value)
                    break;

                default: break;
            }
        }

        const handleChangePassword = () => {
            let validPassword = (!isStringNullOrEmpty(newPassword) && confirmPassword === newPassword)
            if (validPassword) {
                let LogonUser = localStorage.getItem("user")
                try {
                    LogonUser = JSON.parse(LogonUser)
                    let USERID = auth ? auth.UserID : LogonUser.UserID
                    if (!isStringNullOrEmpty(USERID)) {
                        dispatch(GitAction.CallUpdatePassword({
                            USERID: USERID,
                            USERPASSWORD: newPassword
                        }))
                    }
                    else {
                        handleLogout()
                        toast.error("?????????????????????????????????????????????", {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            draggable: false,
                            theme: "colored",
                        })
                    }
                }
                catch { }
            }
            else
                setInvalidInput(true)
        }

        const handleInputKeydown = (e) => {
            if (e.key === 'Enter' || e.keyCode === 13)
                handleChangePassword()
        }

        return (
            <Card sx={{ py: 3, px: 2 }}>
                <CardHeader
                    title={
                        <Typography variant="h6" component="h6" sx={{ fontWeight: 600 }}>
                            ????????????
                        </Typography>
                    }
                    subheader="??????????????????????????????????????????????????????????????????????????????????????????"
                />
                <CardContent>
                    {
                        invalidInput === true &&
                        <div style={{ marginBottom: 15 }}>
                            <Typography variant="body" component="p" sx={{ color: '#FF5733', fontSize: 14 }}>
                                ??????????????????????????????????????????????????? <br />
                                ~ ??????8?????????????????? <br />
                                ??? ??????????????????????????????????????????
                            </Typography>
                        </div>
                    }

                    <div>
                        <FormControl sx={{ width: '80%', my: 1 }} variant="outlined" required size="small" >
                            <InputLabel htmlFor="new-password">????????????</InputLabel>
                            <FilledInput
                                id="new-password"
                                type={showNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(event) => handleInputChange('NEW-PASSWORD', event)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton aria-label="toggle password visibility" onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                                            {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                onKeyDown={handleInputKeydown}
                            />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl sx={{ width: '80%', my: 1 }} variant="outlined" required size="small" >
                            <InputLabel htmlFor="confirmation-password">??????????????????</InputLabel>
                            <FilledInput
                                id="confirmation-password"
                                type={'password'}
                                value={confirmPassword}
                                onChange={(event) => handleInputChange('CONFIRM-PASSWORD', event)}
                                label="Password"
                                onKeyDown={handleInputKeydown}
                            />
                        </FormControl>
                    </div>

                    {
                        !isFormSubmitting ?
                            <Button disabled={invalidInput} sx={{ my: 1, width: '80%' }} onClick={handleChangePassword} variant="contained"> ?????????????????? </Button>
                            :
                            <Button disabled variant="contained" size="small" endIcon={<CircularProgress size="small" />} sx={{ width: '50%', my: 1 }}>
                                ????????? ...
                            </Button>
                    }

                </CardContent>
            </Card>
        )
    }


    const [isEditMode, setEditMode] = React.useState(false)

    const renderPageModule = (page) => {

        const checkParcelStatus = (type) => {

            let data = []
            switch (type) {
                case "ChinaWarehouse":
                    if (isArrayNotEmpty(userParcel))
                        data = userParcel.filter((x) => x.ContainerID === null || x.ContainerID === "-").length
                    break;

                case "InShipping":
                    if (isArrayNotEmpty(userParcel))
                        data = userParcel.filter((x) => x.ContainerID !== null && x.ContainerID !== "-" && x.StockStatusID < 9).length
                    break;

                case "KuchingWarehouse":
                    if (isArrayNotEmpty(userParcel))
                        data = userParcel.filter((x) => x.ContainerID !== null && x.ContainerID !== "-" && x.StockStatusID >= 9).length
                    break;

                default:
                    break;
            }
            return data
        }

        switch (page) {
            case USER_PROFILE_PAGE:
                return (
                    <div style={{ top: "10px" }}>
                        <div className="row">
                            <div className="col-lg-8 col-md-6 col-sm-12">
                                <div className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 " style={{ paddingTop: "10px" }}>
                                        <Card style={{ backgroundColor: "#fff3cd", color: "#856404" }}>
                                            <CardContent style={{ padding: "15px", textAlign: "center" }}>
                                                <Typography style={{ fontWeight: "bold", fontSize: "20px" }}>????????????</Typography>
                                                <Typography style={{ fontWeight: "bold", fontSize: "20px" }}>{checkParcelStatus("ChinaWarehouse")}</Typography>
                                            </CardContent>
                                        </Card>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 " style={{ paddingTop: "10px" }}>
                                        <Card style={{ backgroundColor: "#cce5ff", color: "#004085" }}>
                                            <CardContent style={{ padding: "15px", textAlign: "center" }}>
                                                <Typography style={{ fontWeight: "bold", fontSize: "20px" }}>????????????</Typography>
                                                <Typography style={{ fontWeight: "bold", fontSize: "20px" }}>{checkParcelStatus("InShipping")}</Typography>
                                            </CardContent>
                                        </Card>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 " style={{ paddingTop: "10px" }}>
                                        <Card style={{ backgroundColor: "#d4edda", color: "#30b54e" }}>
                                            <CardContent style={{ padding: "15px", textAlign: "center" }}>
                                                <Typography style={{ fontWeight: "bold", fontSize: "20px" }}>????????????</Typography>
                                                <Typography style={{ fontWeight: "bold", fontSize: "20px" }}>{checkParcelStatus("KuchingWarehouse")}</Typography>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6  col-sm-12" style={{ paddingTop: "10px" }}>
                                <Card style={{ color: "#004085" }}>
                                    <CardContent style={{ padding: "25px" }}>
                                        <Grid container rowSpacing={3} columnSpacing={3} >
                                            <Grid item xs={8} md={8}>
                                                <Typography variant="h6" component="p" sx={{ fontWeight: 600, paddingLeft: "20px" }}>
                                                    <AccountCircleIcon />   ?????????:{profile && profile.UserCode} ({profile && profile.AreaCode})
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4} md={4} style={{ textAlign: "right", paddingRight: "20px" }}>
                                                <Button variant="contained" onClick={() => setEditMode(true)}> ???????????? </Button>
                                            </Grid>
                                        </Grid>

                                        {
                                            !isObjectUndefinedOrNull(userProfile) && <UpdateProfileForm open={isEditMode} setOpenModal={setEditMode} profile={{ ...profile }} isUserProfileUpdate={isUserProfileUpdate} />
                                        }
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        <div className="row" style={{ paddingTop: "40px" }}>
                            <div className="col-lg-8 col-md-12 col-sm-12 col-sm-12" style={{ paddingTop: "10px" }}>
                                <UserProfile />
                            </div>
                            <div className="col-lg-4 col-md-12 col-sm-12  col-sm-12" style={{ paddingTop: "10px" }}>
                                <NotificationAccordion />
                            </div>
                        </div>
                    </div>
                )
            case ALL_ORDERS_PAGE:
                return <ParcelPage type="selfparcel" isAgent={isAgent} areaCodes={areaCodes} agentCode={agentCode} />

            case PARCEL_TRACKING_PAGE:
                return <ParcelTrackingPage />

            case CLAIM_CARGO_PAGE:
                return <ParcelPage type="claim" isAgent={isAgent} areaCodes={areaCodes} agentCode={agentCode} />

            case PASSWORD_MANAGER_PAGE:
                return <PasswordManager />

            default: break;
        }
    }

    return (
        <div className="user-profile--container thin-scrollbar" style={{ padding: '2rem 2rem', display: 'flex', marginLeft: 'auto', marginRight: 'auto' }}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={12} >
                    <SideMenu />
                </Grid>
                {
                    profile !== null && profile.UserID !== undefined ?
                        <Grid item sx={(width >= 768) ? { overflowY: 'auto', width: "100%" } : { width: "100%" }}>
                            <div style={{ padding: '1rem 1rem' }}>
                                {renderPageModule(currentPage)}
                            </div>
                        </Grid>
                        :
                        <LoadingPanel />
                }
            </Grid>
        </div>
    )
}