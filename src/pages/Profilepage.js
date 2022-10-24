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
import { styled } from '@mui/material/styles';

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
import { isArrayNotEmpty, isStringNullOrEmpty } from '../tools/Helpers'
import { ParcelPage } from "./ParcelPage";

export const Profilepage = () => {
    const { auth, setAuth } = useAuth()
    const navigate = useNavigate()
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#F4F5F5',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    }));

    // dispatch and global props here
    const dispatch = useDispatch();
    const isFormSubmitting = useSelector(state => state.counterReducer.loading)
    const isUserProfileUpdate = useSelector(state => state.counterReducer.userUpdateReturnValue)
    // HOOKS HERE
    const USER_PROFILE_PAGE = 'User Profile'
    const ALL_ORDERS_PAGE = 'All Orders'
    const CLAIM_CARGO_PAGE = 'Claim Cargo'
    const PASSWORD_MANAGER_PAGE = 'Password Manager'

    const [currentPage, setCurrentPage] = useState(USER_PROFILE_PAGE)

    const handleLogout = () => {
        setAuth({})
        localStorage.setItem("user", "")
    }



    const renderSideMenu = () => {
        return (
            <Paper sx={{ maxWidth: '90%', width: '300px', mx: 3, my: 2, py: 2 }}>
                <Typography variant="h5" component="p" sx={{ fontWeight: 600, textAlign: 'center' }}>目录</Typography>
                <MenuList>
                    <Divider />
                    <MenuItem onClick={() => handleSetCurrentPage(USER_PROFILE_PAGE)} sx={(currentPage === USER_PROFILE_PAGE) ? { bgcolor: '#FF5A1D', color: '#F5F5F5' } : {}}>
                        <ListItemIcon>
                            <PersonIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>您的资料</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => handleSetCurrentPage(PASSWORD_MANAGER_PAGE)} sx={(currentPage === PASSWORD_MANAGER_PAGE) ? { bgcolor: '#FF5A1D', color: '#F5F5F5' } : {}}>
                        <ListItemIcon>
                            <KeyIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>更改密码</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => handleSetCurrentPage(ALL_ORDERS_PAGE)} sx={(currentPage === ALL_ORDERS_PAGE) ? { bgcolor: '#FF5A1D', color: '#F5F5F5' } : {}}>
                        <ListItemIcon>
                            <FactCheckIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>您的订单</ListItemText>
                    </MenuItem>
                    <MenuItem disabled onClick={() => handleSetCurrentPage(CLAIM_CARGO_PAGE)} sx={(currentPage === CLAIM_CARGO_PAGE) ? { bgcolor: '#FF5A1D', color: '#F5F5F5' } : {}}>
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
        return (
            <Card sx={{ m: 2, py: 3, px: 2 }}>
                <CardHeader
                    title={
                        <div style={{ display: 'flex' }}>
                            <Typography variant="h6" component="h6" sx={{ fontWeight: 600, mr: 2, my: 'auto' }}>
                                {auth.FullName}
                            </Typography>
                            <Typography variant="h5" component="h5" sx={{ fontWeight: 600, my: 'auto', color: '#0073DF' }}>
                                ( 会员号:{auth.Username} )
                            </Typography>
                        </div>
                    }
                    subheader="You can edit your information in this page"
                    action={
                        <IconButton aria-label="edit-profile">
                            <EditIcon />
                        </IconButton>
                    }
                />
                <CardContent sx={{ width: '100%', padding: 0 }}>
                    <Grid container rowSpacing={1} columnSpacing={3} >
                        <Grid item xs={12}>
                            <Typography variant="h6" component="p" sx={{ fontWeight: 600 }}>
                                您的个人资料
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Item>
                                姓名: <b>{auth.FullName}</b>
                            </Item>
                        </Grid>
                        <Grid item xs={6}>
                            <Item>
                                昵称: <b>{auth.UserNickname}</b>
                            </Item>
                        </Grid>
                        <Grid item xs={4}>
                            <Item>
                                电话: <b>{auth.UserContactNo}</b>
                            </Item>
                        </Grid>
                        <Grid item xs={4}>
                            <Item>
                                邮件: <b>{auth.UserEmailAddress}</b>
                            </Item>
                        </Grid>
                        <Grid item xs={4}>
                            <Item>
                                微信: <b>{auth.WeChatID}</b>
                            </Item>
                        </Grid>
                    </Grid>
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
            console.log(isUserProfileUpdate)
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
            console.log(newPassword)
            console.log(confirmPassword)
            let validPassword = (!isStringNullOrEmpty(newPassword) && newPassword.length >= 8 && confirmPassword === newPassword)

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
                        toast.error("")
                    }
                }
                catch {

                }

                console.log(auth)
                console.log(newPassword)

            }
            else
                setInvalidInput(true)
        }

        return (
            <Card sx={{ m: 2, py: 3, px: 2 }}>
                <CardHeader
                    title={
                        <Typography variant="h6" component="h6" sx={{ fontWeight: 600 }}>
                            更改密码
                        </Typography>
                    }
                    subheader="To update your password, you are require to enter your old password"
                />
                <CardContent>
                    {
                        invalidInput === true &&
                        <div style={{ marginBottom: 15 }}>
                            <Typography variant="body" component="p" sx={{ color: '#FF5733', fontSize: 14 }}>
                                The password contains invalid input. Please check with the inputs to fulfill: <br />
                                ~ Minimum 8 characters <br />
                                ~ Password is match with the Confirmation Password
                            </Typography>
                        </div>
                    }

                    <div>
                        <FormControl sx={{ width: '50%', my: 1 }} variant="outlined" required size="small" >
                            <InputLabel htmlFor="new-password">New Password</InputLabel>
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
                            />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl sx={{ width: '50%', my: 1 }} variant="outlined" required size="small" >
                            <InputLabel htmlFor="confirmation-password">Confirmation Password</InputLabel>
                            <FilledInput
                                id="confirmation-password"
                                type={'password'}
                                value={confirmPassword}
                                onChange={(event) => handleInputChange('CONFIRM-PASSWORD', event)}
                                label="Password"
                            />
                        </FormControl>
                    </div>

                    {
                        !isFormSubmitting ?
                            <Button disabled={invalidInput} sx={{ my: 1, width: '50%' }} onClick={handleChangePassword} variant="contained"> Change Password </Button>
                            :
                            <Button disabled variant="contained" size="small" endIcon={<CircularProgress size="small" />} sx={{ width: '50%', my: 1 }}>
                                A Moment ...
                            </Button>
                    }

                </CardContent>
            </Card>
        )
    }

    const renderPageModule = (page) => {
        switch (page) {
            case USER_PROFILE_PAGE:
                return <UserProfile />

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
        <div style={{ minHeight: '70vh', padding: '1rem 0rem', maxWidth: '1196px', display: 'flex', marginLeft: 'auto', marginRight: 'auto' }}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={3} >
                    {renderSideMenu()}
                </Grid>

                <Grid item xs={12} md={9}>
                    {renderPageModule(currentPage)}
                </Grid>
            </Grid>

        </div>
    )
}