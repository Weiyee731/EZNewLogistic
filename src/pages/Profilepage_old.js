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
import useAuth from "../hooks/useAuth";
import { toast } from 'react-toastify'
import { isArrayNotEmpty, isObjectUndefinedOrNull, isStringNullOrEmpty, useWindowDimensions } from '../tools/Helpers'
import { ParcelPage } from "./ParcelPage";
import { NotificationView } from "../components/NotificationView";
import { TableHead } from "@mui/material";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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
    const isUserProfileUpdate = useSelector(state => state.counterReducer.userUpdateReturnValue)
    const viewNotification = useSelector(state => state.counterReducer.viewNotification)
    const commission = useSelector(state => state.counterReducer.commission)
    const [value, setValue] = React.useState(0);
    // CONSTANT OR STYLE HERE
    const USER_PROFILE_PAGE = 'User Profile'
    const ALL_ORDERS_PAGE = 'All Orders'
    const CLAIM_CARGO_PAGE = 'Claim Cargo'
    const PASSWORD_MANAGER_PAGE = 'Password Manager'

    // HOOKS HERE
    const [currentPage, setCurrentPage] = useState(USER_PROFILE_PAGE)
    const [profile, setProfile] = useState(null)

    // USE EFFECT
    useEffect(() => {
        dispatch(GitAction.CallGetNotification({ status: 2 }));
        if (!isObjectUndefinedOrNull(auth) && !isStringNullOrEmpty(auth.UserID) && !isStringNullOrEmpty(auth.UserCode)) {
            dispatch(GitAction.CallFetchUserProfileByID({ UserID: auth.UserID }));
            dispatch(GitAction.CallViewCommissionByUserCode({ UserCode: auth.UserCode }));
        }
    }, [])

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
        };

        return (
            <div style={{ marginTop: '16px' }}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'darkgrey' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="parcelType" variant="fullWidth">
                            <Tab label="??????????????????" {...a11yProps(0)} />
                            <Tab label="?????????????????????" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        {/* {parcelLayout()} */}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {/* {parcelLayout()} */}
                    </TabPanel>
                </Box>
                <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
                    <AccordionSummary
                        aria-controls="sidemenu"
                        id="side-menu"
                        sx={{ textAlign: 'center' }}
                    >
                        <Typography variant="h5" component="p" sx={{ fontWeight: 600, textAlign: 'center', width: '100%' }}>??????</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ width: '100%' }}>
                            <MenuList>
                                <Divider />
                                <MenuItem onClick={() => handleSetCurrentPage(USER_PROFILE_PAGE)} sx={(currentPage === USER_PROFILE_PAGE) ? { ...selectedStyle } : {}}>
                                    <ListItemIcon>
                                        <PersonIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>????????????</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={() => handleSetCurrentPage(PASSWORD_MANAGER_PAGE)} sx={(currentPage === PASSWORD_MANAGER_PAGE) ? { ...selectedStyle } : {}}>
                                    <ListItemIcon>
                                        <KeyIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>????????????</ListItemText>
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={() => handleSetCurrentPage(ALL_ORDERS_PAGE)} sx={(currentPage === ALL_ORDERS_PAGE) ? { ...selectedStyle } : {}}>
                                    <ListItemIcon>
                                        <FactCheckIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>????????????</ListItemText>
                                </MenuItem>
                                <MenuItem disabled onClick={() => handleSetCurrentPage(CLAIM_CARGO_PAGE)} sx={(currentPage === CLAIM_CARGO_PAGE) ? { ...selectedStyle } : {}}>
                                    <ListItemIcon>
                                        <InventoryIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>????????????</ListItemText>
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={() => { navigate("/", { replace: true }) }}>
                                    <ListItemIcon>
                                        <HomeIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>????????????</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <LogoutIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>??????</ListItemText>
                                </MenuItem>
                            </MenuList>
                        </Box>

                    </AccordionDetails>
                </Accordion>
            </div>
        )
    }

    const handleSetCurrentPage = (pageType) => {
        setCurrentPage(pageType)

        // switch (pageType) {
        //     case sidebarItems[0]:
        //         setCurrentPage(sidebarItems[0])
        //         break;

        //     case sidebarItems[1]:
        //         setCurrentPage(sidebarItems[1])
        //         break;

        //     case sidebarItems[2]:
        //         setCurrentPage(sidebarItems[2])
        //         break;

        //     default: break;

        // }
    }


    const UserProfile = () => {
        const [isEditMode, setEditMode] = useState(false)
        const [expanded, setExpanded] = useState(true)
        const [userExpanded, setUserExpanded] = useState(false)
        const [referalModal, setReferalModal] = useState(false)

        const Item = styled(Paper)(({ theme }) => ({
            backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#F4F5F5',
            ...theme.typography.body2,
            padding: theme.spacing(1),
            textAlign: 'left',
            color: theme.palette.text.secondary,
        }));
        return (
            <>
                <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)} sx={{ my: 2 }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="profile-content"
                        id="profile-summary"
                    >
                        <Grid container>
                            <Grid item xs={12} lg={'auto'}>
                                <Typography variant="h6" component="p" sx={{ fontWeight: 600, mr: 2 }}>
                                    {profile && profile.Fullname}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} lg={9}>
                                <Typography variant="h6" component="p" sx={{ fontWeight: 600, color: '#0073DF' }}>
                                    ( ?????????:{profile && profile.UserCode} )[{profile && profile.AreaCode}]
                                </Typography>

                            </Grid>
                        </Grid>
                        <Grid container onClick={() => setReferalModal(true)}>
                            <Grid item xs={12} lg={6} >
                                <Typography component="p" sx={{ fontWeight: 600, mr: 2 }}>
                                    ???????????? ???<label style={{ fontWeight: 600, color: '#0073DF' }}>{profile && profile.TotalReferee}</label>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} lg={6} >
                                <Typography component="p" sx={{ fontWeight: 600, mr: 2 }}>
                                    ?????????????????? ??? <label style={{ fontWeight: 600, color: '#0073DF' }}>{profile && profile.RemainingCommission != null ? parseFloat(profile.RemainingCommission).toFixed(2) : 0}</label>
                                </Typography>
                            </Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                        <AddressManager />
                    </AccordionDetails>
                </Accordion>

                <Dialog scroll="paper" maxWidth="lg" open={referalModal} onClose={() => setReferalModal(false)} aria-labelledby="referal-modal" aria-describedby="referal-modal-description" >
                    <DialogTitle id="referal-modal">
                        <Typography variant="h5" component="p" sx={{ fontWeight: 600 }}>
                            ?????????????????????
                        </Typography>
                        <IconButton
                            aria-label="close"
                            onClick={() => setReferalModal(false)}
                            sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500], }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <TableContainer component={Paper}>
                            <Table size="medium" aria-label="referal table">
                                <TableHead>
                                    <TableRow style={{ backgroundColor: "#adb5bd" }}>
                                        <TableCell>?????????</TableCell>
                                        <TableCell>????????????</TableCell>
                                        <TableCell>????????????</TableCell>
                                        <TableCell>??????????????????</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        isArrayNotEmpty(commission) && commission[0].ReturnVal != 0 ?
                                            commission.map((data) => {
                                                return (
                                                    <TableRow key={"Contact Person"}>
                                                        <TableCell > {data.UserCode}</TableCell>
                                                        <TableCell  > {data.Fullname}</TableCell>
                                                        <TableCell> {data.TotalCommission !== null ? parseFloat(data.TotalCommission).toFixed(2) : 0}</TableCell>
                                                        <TableCell > {data.BalancedAmount !== null ? parseFloat(data.BalancedAmount).toFixed(2) : 0}</TableCell>
                                                    </TableRow>
                                                )
                                            })
                                            :
                                            <Typography style={{ padding: "10px", textAlign: "center" }}>???????????????????????????</Typography>
                                    }

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </DialogContent>
                </Dialog>
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
                    toast.error("???????????????????????????????????? (*), ????????????????????????????????????", {
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
                toast.error("???????????????????????????????????? (*), ????????????????????????????????????", {
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
                        ??????????????????
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
                            <DialogContentText>
                                ??????????????????????????????????????????
                            </DialogContentText>
                            <TextField id="profile--fullname"
                                value={accountInfo.FULLNAME}
                                onChange={(event) => { handleInputChange("FULLNAME", event) }}
                                label="??????"
                                fullWidth
                                variant="filled"
                                required
                                size="small"
                                sx={{ my: 1 }}
                                error={isStringNullOrEmpty(accountInfo.FULLNAME)}
                                helperText={isStringNullOrEmpty(accountInfo.FULLNAME) ? "???????????????????????????" : ''}
                            />
                            <TextField id="profile--username"
                                value={accountInfo.USERNAME}
                                onChange={(event) => { handleInputChange("USERNAME", event) }}
                                label="??????"
                                fullWidth
                                variant="filled"
                                required
                                size="small"
                                sx={{ my: 1 }}
                                error={isStringNullOrEmpty(accountInfo.USERNAME)}
                                helperText={isStringNullOrEmpty(accountInfo.USERNAME) ? "???????????????????????????" : ''}
                            />
                            <TextField id="profile--nickname"
                                value={accountInfo.USERNICKNAME}
                                onChange={(event) => { handleInputChange("USERNICKNAME", event) }}
                                label="??????"
                                fullWidth
                                variant="filled"
                                size="small"
                                sx={{ my: 1 }}
                            />
                            {/* <TextField id="profile--address"
                                value={accountInfo.USERADDRESS}
                                onChange={(event) => { handleInputChange("USERADDRESS", event) }}
                                label="????????????"
                                fullWidth
                                variant="filled"
                                size="small"
                                sx={{ my: 1 }}
                            /> */}
                            <TextField id="profile--contact"
                                value={accountInfo.CONTACTNO}
                                onChange={(event) => { handleInputChange("CONTACTNO", event) }}
                                label="????????????"
                                fullWidth
                                variant="filled"
                                size="small"
                                sx={{ my: 1 }}
                                required
                                error={isStringNullOrEmpty(accountInfo.CONTACTNO)}
                                helperText={isStringNullOrEmpty(accountInfo.CONTACTNO) ? "?????????????????????????????????" : ''}
                            />
                            <TextField id="profile--email"
                                value={accountInfo.USEREMAIL}
                                onChange={(event) => { handleInputChange("USEREMAIL", event) }}
                                label="????????????"
                                fullWidth
                                variant="filled"
                                size="small"
                                sx={{ my: 1 }}
                                required
                                error={isStringNullOrEmpty(accountInfo.USEREMAIL)}
                                helperText={isStringNullOrEmpty(accountInfo.USEREMAIL) ? "?????????????????????????????????" : ''}
                            />
                            <TextField id="profile--wechat"
                                value={accountInfo.WECHATID}
                                onChange={(event) => { handleInputChange("WECHATID", event) }}
                                label="??????"
                                fullWidth
                                variant="filled"
                                size="small"
                                sx={{ my: 1 }}
                            />
                        </DialogContent>

                }
                <DialogActions>
                    {
                        !isFormSubmitting ?
                            <Button sx={{ mx: 2, my: 1 }} onClick={handleUpdateUserProfile} variant="contained" fullWidth> Submit </Button>
                            :
                            <Button disabled variant="contained" size="small" endIcon={<CircularProgress size="small" />} sx={{ width: '100%', mx: 2, my: 1 }}>
                                A Moment ...
                            </Button>
                    }
                </DialogActions>
            </Dialog>
        )
    }

    const NotificationAccordion = () => {
        const [expanded, setExpanded] = useState(false)

        return (
            <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)} sx={{ my: 2, }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="notification-content"
                    id="panel1bh-header"
                    sx={{ display: 'flex' }}
                >

                    <Typography sx={{ flexShrink: 0, fontWeight: 600, my: 'auto', mr: 2 }}>
                        ????????????
                    </Typography>
                    {viewNotification && <Chip size="small" color="warning" sx={{ my: 'auto', minWidth: '50px' }} label={viewNotification.length} />}
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
                            No notification for the moment / ????????????????????????
                        </div>
                    }

                </AccordionDetails>
            </Accordion>

        )

    }

    const PersonalProfile = () => {
        const [isEditMode, setEditMode] = useState(false)
        const [expanded, setExpanded] = useState(true)

        const Item = styled(Paper)(({ theme }) => ({
            backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#F4F5F5',
            ...theme.typography.body2,
            padding: theme.spacing(1),
            textAlign: 'left',
            color: theme.palette.text.secondary,
        }));

        return (

            !isObjectUndefinedOrNull(profile) ?
                <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)} sx={{ my: 2 }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="user-content"
                        id="user-summary"
                    >
                        <Stack direction={"row"} justifyContent="space-between">
                            <Typography sx={{ flexShrink: 0, fontWeight: 600, my: 'auto', mr: 2 }}>
                                ??????????????????
                            </Typography>
                            <IconButton aria-label="edit-profile" onClick={() => setEditMode(true)}>
                                <EditIcon />
                            </IconButton>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container rowSpacing={2} columnSpacing={3} >
                            <Grid item xs={12} md={6}>
                                <Item>
                                    ??????: <b style={{ fontSize: 16, color: '#0073DF' }}>{profile.Username}</b>
                                </Item>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Item>
                                    ??????: <b style={{ fontSize: 16, color: '#FF5733' }}>{profile.AreaCode}</b>
                                </Item>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Item>
                                    ??????: <b>{profile.Fullname}</b>
                                </Item>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Item>
                                    ??????: <b>{profile.Username}</b>
                                </Item>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Item>
                                    ??????: <b>{profile.UserNickname}</b>
                                </Item>
                            </Grid>
                            <Grid item xs={12} md={6} >
                                <Item>
                                    ??????: <b>{profile.UserContactNo}</b>
                                </Item>
                            </Grid>
                            <Grid item xs={12} md={6} >
                                <Item>
                                    ??????: <b>{profile.UserEmailAddress}</b>
                                </Item>
                            </Grid>
                            <Grid item xs={12} md={6} >
                                <Item>
                                    ??????: <b>{profile.UserWechatID}</b>
                                </Item>
                            </Grid>
                            <Grid item xs={12} md={6} >
                                <Item>
                                    ?????????: <b>{profile.ReferalCode != null ? profile.ReferalCode : "-"}</b>
                                </Item>
                            </Grid>
                        </Grid>
                        {
                            !isObjectUndefinedOrNull(userProfile) && <UpdateProfileForm open={isEditMode} setOpenModal={setEditMode} profile={{ ...profile }} isUserProfileUpdate={isUserProfileUpdate} />
                        }
                    </AccordionDetails>
                </Accordion >
                :
                <Typography variant="subtitle1" component="p">??????????????????</Typography>
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
            width: '30%',
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
            <Card sx={{ mb: 2, borderTop: '1px solid rgba( 33, 33, 33, 0.3)', borderBottom: '1px solid rgba( 33, 33, 33, 0.3)' }} elevation={0}>
                <CardHeader
                    title={
                        <Typography variant="h6" component="h6" sx={{ fontWeight: 600 }}>
                            ????????????
                        </Typography>
                    }
                    subheader={"??????????????????????????????????????????????????????????????????"}
                />
                <CardContent>
                    {
                        !isObjectUndefinedOrNull(profile) &&
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="addresses table">
                                <TableBody>
                                    <Tooltip title={isCopyText} placement="top" arrow>
                                        <TableRow key={"Contact Person"} onClick={() => handleCopyToClipboard('??????(' + profile.UserCode + " " + profile.AreaCode + ')')}>
                                            <TableCell component="th" scope="row" sx={{ ...TitleStyle }} > ?????????: </TableCell>
                                            <TableCell align="left" sx={{ ...CopyableStyle }}>??????({profile.UserCode} {profile.AreaCode})</TableCell>
                                        </TableRow>
                                    </Tooltip>
                                    <TableRow key={"Address"}>
                                        <TableCell component="th" scope="row" sx={{ ...TitleStyle }}> ????????????: </TableCell>
                                        <TableCell align="left" sx={{ ...NormalStyle }}>????????? - ????????? 9.00 - 18.00</TableCell>
                                    </TableRow>
                                    <Tooltip title={isCopyText} placement="top" arrow>
                                        <TableRow key={"Collection Time"} onClick={() => handleCopyToClipboard('?????????????????????????????????????????????69??????????????????1???90??????????????????' + profile.UserCode + profile.AreaCode)}>
                                            <TableCell component="th" scope="row" sx={{ ...TitleStyle }}> ????????????: </TableCell>
                                            <TableCell align="left" sx={{ ...CopyableStyle }}>?????????????????????????????????????????????69??????????????????1???90??????????????????{profile.UserCode}{profile.AreaCode}</TableCell>
                                        </TableRow>
                                    </Tooltip>
                                    <Tooltip title={isCopyText} placement="top" arrow>
                                        <TableRow key={"Contact Number"} onClick={() => handleCopyToClipboard('13553858834')}>
                                            <TableCell component="th" scope="row" sx={{ ...TitleStyle }}> ????????????: </TableCell>
                                            <TableCell align="left" sx={{ ...CopyableStyle }}>13553858834</TableCell>
                                        </TableRow>
                                    </Tooltip>
                                    <Tooltip title={isCopyText} placement="top" arrow>
                                        <TableRow key={"Postcode"} onClick={() => handleCopyToClipboard('523900')}>
                                            <TableCell component="th" scope="row" sx={{ ...TitleStyle }}> ????????????: </TableCell>
                                            <TableCell align="left" sx={{ ...CopyableStyle }}>523900</TableCell>
                                        </TableRow>
                                    </Tooltip>
                                    <Tooltip title={isCopyText} placement="top" arrow>
                                        <TableRow key={"RefNo"} onClick={() => handleCopyToClipboard(profile.UserCode + profile.AreaCode)}>
                                            <TableCell component="th" scope="row" sx={{ ...TitleStyle }}> ??????: </TableCell>
                                            <TableCell align="left" sx={{ ...CopyableStyle }}>({profile.UserCode + profile.AreaCode})</TableCell>
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
                    toast.success('Your password is updated successfully.', {
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
                    toast.error('Error occured when trying to update password. Please try again.', {
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

    const renderPageModule = (page) => {
        switch (page) {
            case USER_PROFILE_PAGE:
                return (
                    <>
                        {/* <AddressManager /> */}
                        <UserProfile />
                        <PersonalProfile />
                        <NotificationAccordion />
                    </>
                )

            case ALL_ORDERS_PAGE:
                return <ParcelPage />

            case CLAIM_CARGO_PAGE:
                break;

            case PASSWORD_MANAGER_PAGE:
                return <PasswordManager />

            default: break;
        }
    }

    return (
        <div className="user-profile--container thin-scrollbar" style={{ minHeight: '70vh', padding: '1rem 0rem', maxWidth: '1200px', display: 'flex', marginLeft: 'auto', marginRight: 'auto' }}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={3} >
                    <SideMenu />
                </Grid>

                <Grid item xs={12} md={9} sx={(width >= 768) ? { maxHeight: '70vh', overflowY: 'auto', my: 2 } : {}}>
                    <div style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                        {renderPageModule(currentPage)}
                    </div>
                </Grid>
            </Grid>

        </div>
    )
}