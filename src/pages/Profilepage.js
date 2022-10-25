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
import Chip from '@mui/material/Chip';

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
import { isArrayNotEmpty, isObjectUndefinedOrNull, isStringNullOrEmpty, getWindowDimensions } from '../tools/Helpers'
import { ParcelPage } from "./ParcelPage";
import { NotificationView } from "../components/NotificationView";

export const Profilepage = () => {
    const { auth, setAuth } = useAuth()
    const navigate = useNavigate()

    // dispatch and global props here
    const dispatch = useDispatch();
    const isFormSubmitting = useSelector(state => state.counterReducer.loading)
    const userProfile = useSelector(state => state.counterReducer.userProfile)
    const isUserProfileUpdate = useSelector(state => state.counterReducer.userUpdateReturnValue)
    const viewNotification = useSelector(state => state.counterReducer.viewNotification)

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
        dispatch(GitAction.CallGetNotification({ status: 1 }));

        if (!isObjectUndefinedOrNull(auth) && !isStringNullOrEmpty(auth.UserID)) {
            dispatch(GitAction.CallFetchUserProfileByID({ UserID: auth.UserID }));
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

    const renderSideMenu = () => {
        const selectedStyle = {
            bgcolor: 'rgb(99, 141, 161)',
            color: '#F5F5F5',
        }

        return (
            <Paper sx={{  width: '100%',  my: 2, py: 2 }}>
                <Typography variant="h5" component="p" sx={{ fontWeight: 600, textAlign: 'center' }}>目录</Typography>
                <MenuList>
                    <Divider />
                    <MenuItem onClick={() => handleSetCurrentPage(USER_PROFILE_PAGE)} sx={(currentPage === USER_PROFILE_PAGE) ? { ...selectedStyle } : {}}>
                        <ListItemIcon>
                            <PersonIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>您的资料</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => handleSetCurrentPage(PASSWORD_MANAGER_PAGE)} sx={(currentPage === PASSWORD_MANAGER_PAGE) ? { ...selectedStyle } : {}}>
                        <ListItemIcon>
                            <KeyIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>更改密码</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => handleSetCurrentPage(ALL_ORDERS_PAGE)} sx={(currentPage === ALL_ORDERS_PAGE) ? { ...selectedStyle } : {}}>
                        <ListItemIcon>
                            <FactCheckIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>您的订单</ListItemText>
                    </MenuItem>
                    <MenuItem disabled onClick={() => handleSetCurrentPage(CLAIM_CARGO_PAGE)} sx={(currentPage === CLAIM_CARGO_PAGE) ? { ...selectedStyle } : {}}>
                        <ListItemIcon>
                            <InventoryIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>货物认领</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => { navigate("/", { replace: true }) }}>
                        <ListItemIcon>
                            <HomeIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>返回页面</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>退出</ListItemText>
                    </MenuItem>
                </MenuList>
            </Paper>
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

        const Item = styled(Paper)(({ theme }) => ({
            backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#F4F5F5',
            ...theme.typography.body2,
            padding: theme.spacing(1),
            textAlign: 'left',
            color: theme.palette.text.secondary,
        }));

        return (

            <Card sx={{ py: 3, px: 2 }}>
                <CardHeader
                    title={
                        <Grid container>
                            <Grid item xs={12} lg={'auto'}>
                                <Typography variant="h6" component="p" sx={{ fontWeight: 600, mr: 2 }}>
                                    {profile && profile.Fullname}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} lg={3}>
                                <Typography variant="h6" component="p" sx={{ fontWeight: 600, color: '#0073DF' }}>
                                    ( 会员号:{profile && profile.UserCode} )[{profile && profile.AreaCode}]
                                </Typography>
                            </Grid>
                        </Grid>
                    }
                    subheader="这是你的个人资料板，请您慢用。"
                    action={
                        <IconButton aria-label="edit-profile" onClick={() => setEditMode(true)}>
                            <EditIcon />
                        </IconButton>
                    }
                />
                {
                    !isObjectUndefinedOrNull(profile) ?
                        <CardContent sx={{ width: '100%', padding: 0 }}>
                            <Grid container rowSpacing={2} columnSpacing={3} >
                                <Grid item xs={12}>
                                    <Typography variant="subtitle" component="p" sx={{ fontWeight: 600 }}>
                                        您的个人资料
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Item>
                                        户口: <b style={{ fontSize: 16, color: '#0073DF' }}>{profile.Username}</b>
                                    </Item>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Item>
                                        户口状态: <b style={{ fontSize: 16, color: '#FF5733' }}>{profile.UserStatus}</b>
                                    </Item>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Item>
                                        姓名: <b>{profile.Fullname}</b>
                                    </Item>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Item>
                                        昵称: <b>{profile.UserNickname}</b>
                                    </Item>
                                </Grid>

                                <Grid item xs={12} md={3}>
                                    <Item>
                                        地区: <b style={{ fontSize: 16, color: '#FF5733' }}>{profile.AreaCode}</b>
                                    </Item>
                                </Grid>
                                <Grid item xs={12} md={9}>
                                    <Item>
                                        地址: <b>{profile.UserAddress}</b>
                                    </Item>
                                </Grid>

                                <Grid item xs={12} md={6} lg={4} >
                                    <Item>
                                        电话: <b>{profile.UserContactNo}</b>
                                    </Item>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <Item>
                                        邮件: <b>{profile.UserEmailAddress}</b>
                                    </Item>
                                </Grid>
                                <Grid item xs={12} lg={4}>
                                    <Item>
                                        微信: <b>{profile.UserWechatID}</b>
                                    </Item>
                                </Grid>
                            </Grid>
                        </CardContent>
                        :
                        <CardContent>
                            <Typography variant="h6" component="p" sx={{ fontStyle: 'italic' }}> 没有资料 </Typography>
                        </CardContent>
                }
                {
                    !isObjectUndefinedOrNull(userProfile) && <UpdateProfileForm open={isEditMode} setOpenModal={setEditMode} profile={{ ...profile }} isUserProfileUpdate={isUserProfileUpdate} />
                }
            </Card>
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
                    toast.success("您的资料已经成功更新。", {
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
                    toast.error("您的资料无法更新，请稍后再试。", {
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
                    toast.error("请确保您已经填入重要输入 (*), 请重试输入并且提交表格。", {
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
                toast.error("请确保您已经填入重要输入 (*), 请重试输入并且提交表格。", {
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
                        更改个人资料
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
                                您可以随意的更改您的个人资料
                            </DialogContentText>
                            <TextField id="profile--fullname"
                                value={accountInfo.FULLNAME}
                                onChange={(event) => { handleInputChange("FULLNAME", event) }}
                                label="全名"
                                fullWidth
                                variant="filled"
                                required
                                size="small"
                                sx={{ my: 1 }}
                                error={isStringNullOrEmpty(accountInfo.FULLNAME)}
                                helperText={isStringNullOrEmpty(accountInfo.FULLNAME) ? "您必须填写你的名字" : ''}
                            />
                            <TextField id="profile--nickname"
                                value={accountInfo.USERNICKNAME}
                                onChange={(event) => { handleInputChange("USERNICKNAME", event) }}
                                label="昵称"
                                fullWidth
                                variant="filled"
                                size="small"
                                sx={{ my: 1 }}
                            />
                            <TextField id="profile--address"
                                value={accountInfo.USERADDRESS}
                                onChange={(event) => { handleInputChange("USERADDRESS", event) }}
                                label="住家地址"
                                fullWidth
                                variant="filled"
                                size="small"
                                sx={{ my: 1 }}
                            />
                            <TextField id="profile--contact"
                                value={accountInfo.CONTACTNO}
                                onChange={(event) => { handleInputChange("CONTACTNO", event) }}
                                label="电话号码"
                                fullWidth
                                variant="filled"
                                size="small"
                                sx={{ my: 1 }}
                                required
                                error={isStringNullOrEmpty(accountInfo.CONTACTNO)}
                                helperText={isStringNullOrEmpty(accountInfo.CONTACTNO) ? "您必须填写你的电话号码" : ''}
                            />
                            <TextField id="profile--email"
                                value={accountInfo.USEREMAIL}
                                onChange={(event) => { handleInputChange("USEREMAIL", event) }}
                                label="电子邮件"
                                fullWidth
                                variant="filled"
                                size="small"
                                sx={{ my: 1 }}
                                required
                                error={isStringNullOrEmpty(accountInfo.USEREMAIL)}
                                helperText={isStringNullOrEmpty(accountInfo.USEREMAIL) ? "您必须填写你的电子邮件" : ''}
                            />
                            <TextField id="profile--wechat"
                                value={accountInfo.WECHATID}
                                onChange={(event) => { handleInputChange("WECHATID", event) }}
                                label="微信"
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
                        最新资讯
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
                            No notification for the moment / 目前没有任何通告
                        </div>
                    }

                </AccordionDetails>
            </Accordion>

        )

    }

    const AddressManager = () => {
        const [isCopyText, setIsCopyText] = useState("拷贝")

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
                toast.error("系统出现故障，请重新登入。", {
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
            toast.error("系统出现故障，请重新登入。", {
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
            setIsCopyText("已拷贝！")
            setTimeout(() => { setIsCopyText("拷贝") }, 500)
        }

        return (
            <Card sx={{ py: 2, px: 2 }}>
                <CardHeader
                    title={
                        <Typography variant="h6" component="h6" sx={{ fontWeight: 600 }}>
                            您的地址
                        </Typography>
                    }
                    subheader={"请点击以下的资料，他会自动拷贝你所想要的信息"}
                />
                <CardContent>
                    {
                        !isObjectUndefinedOrNull(profile) &&
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="addresses table">
                                <TableBody>
                                    <Tooltip title={isCopyText} placement="top" arrow>
                                        <TableRow key={"Contact Person"} onClick={() => handleCopyToClipboard('雅威(10001KCH)')}>
                                            <TableCell component="th" scope="row" sx={{ ...TitleStyle }} > 收货人: </TableCell>
                                            <TableCell align="left" sx={{ ...CopyableStyle }}>雅威(10001KCH)</TableCell>
                                        </TableRow>
                                    </Tooltip>
                                    <TableRow key={"Address"}>
                                        <TableCell component="th" scope="row" sx={{ ...TitleStyle }}> 收货时间: </TableCell>
                                        <TableCell align="left" sx={{ ...NormalStyle }}>星期日 - 星期五 8.30 - 17.30</TableCell>
                                    </TableRow>
                                    <Tooltip title={isCopyText} placement="top" arrow>
                                        <TableRow key={"Collection Time"} onClick={() => handleCopyToClipboard('广东省东莞市虎门镇赤岗村赤岗路69号新艺工业园1号90雅威国际物流' + profile.UserCode + profile.AreaCode)}>
                                            <TableCell component="th" scope="row" sx={{ ...TitleStyle }}> 仓库地址: </TableCell>
                                            <TableCell align="left" sx={{ ...CopyableStyle }}>广东省东莞市虎门镇赤岗村赤岗路69号新艺工业园1号90雅威国际物流{profile.UserCode}{profile.AreaCode}</TableCell>
                                        </TableRow>
                                    </Tooltip>
                                    <Tooltip title={isCopyText} placement="top" arrow>
                                        <TableRow key={"Contact Number"} onClick={() => handleCopyToClipboard('13532819695')}>
                                            <TableCell component="th" scope="row" sx={{ ...TitleStyle }}> 电话号码: </TableCell>
                                            <TableCell align="left" sx={{ ...CopyableStyle }}>13532819695</TableCell>
                                        </TableRow>
                                    </Tooltip>
                                    <Tooltip title={isCopyText} placement="top" arrow>
                                        <TableRow key={"Postcode"} onClick={() => handleCopyToClipboard('523900')}>
                                            <TableCell component="th" scope="row" sx={{ ...TitleStyle }}> 邮政编码: </TableCell>
                                            <TableCell align="left" sx={{ ...CopyableStyle }}>523900</TableCell>
                                        </TableRow>
                                    </Tooltip>
                                    <Tooltip title={isCopyText} placement="top" arrow>
                                        <TableRow key={"RefNo"} onClick={() => handleCopyToClipboard(profile.UserCode + profile.AreaCode)}>
                                            <TableCell component="th" scope="row" sx={{ ...TitleStyle }}> 代号: </TableCell>
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
                        toast.error("请重新登入，并且重试更换密码。", {
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
                            更改密码
                        </Typography>
                    }
                    subheader="更新您的密码，请务必重新输入于确保的密码是于重新输入密码相称"
                />
                <CardContent>
                    {
                        invalidInput === true &&
                        <div style={{ marginBottom: 15 }}>
                            <Typography variant="body" component="p" sx={{ color: '#FF5733', fontSize: 14 }}>
                                你所设定的新密码必须符合以下条件： <br />
                                ~ 至少8个字母与以上 <br />
                                ～ 新密码与重新输入密码必须相称
                            </Typography>
                        </div>
                    }

                    <div>
                        <FormControl sx={{ width: '80%', my: 1 }} variant="outlined" required size="small" >
                            <InputLabel htmlFor="new-password">新的密码</InputLabel>
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
                            <InputLabel htmlFor="confirmation-password">重新输入密码</InputLabel>
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
                            <Button disabled={invalidInput} sx={{ my: 1, width: '80%' }} onClick={handleChangePassword} variant="contained"> 确认更改密码 </Button>
                            :
                            <Button disabled variant="contained" size="small" endIcon={<CircularProgress size="small" />} sx={{ width: '50%', my: 1 }}>
                                请稍等 ...
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
                        <UserProfile />
                        <NotificationAccordion />
                        <AddressManager />
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
                    {renderSideMenu()}
                </Grid>

                <Grid item xs={12} md={9} sx={(getWindowDimensions().screenWidth >= 768) ? { maxHeight: '70vh', overflowY: 'auto', my: 2 } : {}}>
                    {renderPageModule(currentPage)}
                </Grid>
            </Grid>

        </div>
    )
}