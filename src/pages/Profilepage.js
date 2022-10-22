import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch, Provider } from 'react-redux'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
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
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import KeyIcon from '@mui/icons-material/Key';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import useAuth from "../hooks/useAuth";
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
    const isFormSubmitting = useSelector(state => state.counterReducer.loading)
    // HOOKS HERE
    const [openPasswordModal, setOpenPasswordModal] = useState(false)
    const [oldPassword, setOldPassword] = useState("")
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleLogout = () => {
        setAuth({})
        localStorage.setItem("user", "")
    }

    const openPasswordManagerModal = () => {
        setOpenPasswordModal(!openPasswordModal)
    }

    const handleInputChange = (name, event) => {
        switch (name) {
            case 'OLD-PASSWORD':
                setOldPassword(event.target.value)
                break;
            case 'NEW-PASSWORD':
                setNewPassword(event.target.value)
                break;
            case 'CONFIRM-PASSWORD':
                setConfirmPassword(event.target.value)
                break;

            default: break;
        }
    }

    const handleChangePassword = () => {
        console.log(oldPassword)
        console.log(newPassword)
        console.log(confirmPassword)
    }

    return (
        <div style={{ minHeight: '70vh', padding: '1rem 0rem', maxWidth: '1196px', display: 'flex', marginLeft: 'auto', marginRight: 'auto' }}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={3} >
                    <Paper sx={{ maxWidth: '90%', width: '300px', mx: 3, my: 2, py: 2 }}>
                        <div>
                            <Typography variant="h5" component="p" sx={{ fontWeight: 600, textAlign: 'center' }}>目录</Typography>
                        </div>
                        <MenuList>
                            <Divider />
                            <MenuItem>
                                <ListItemIcon>
                                    <PersonIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>您的资料</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={openPasswordManagerModal}>
                                <ListItemIcon>
                                    <KeyIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>更改密码</ListItemText>
                            </MenuItem>
                            <Divider />
                            <MenuItem>
                                <ListItemIcon>
                                    <FactCheckIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>您的订单</ListItemText>
                            </MenuItem>
                            <MenuItem>
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
                </Grid>

                <Grid item xs={12} md={9}>
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
                                    <Typography variant="h6" component="body" sx={{ fontWeight: 600 }}>
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
                </Grid>
            </Grid>

            {/* Password Manager Form | Modal */}
            <Dialog scroll="paper" open={openPasswordModal} onClose={() => setOpenPasswordModal(false)} aria-labelledby="password-manager" aria-describedby="password-manager-description" >
                <DialogTitle id="registration-title" sx={{fontWeight: 600}}>
                    {"Password Manager"}
                    <IconButton
                        aria-label="close"
                        onClick={() => setOpenPasswordModal(false)}
                        sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500], }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To update your password, you are require to enter your old password
                    </DialogContentText>

                    <FormControl sx={{ width: '100%', my: 1 }} variant="outlined" required size="small" >
                        <InputLabel htmlFor="old-password">Current Password</InputLabel>
                        <FilledInput
                            id="old-password"
                            type={showOldPassword ? 'text' : 'password'}
                            value={oldPassword}
                            onChange={(event) => handleInputChange('OLD-PASSWORD', event)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton aria-label="toggle password visibility" onClick={() => setShowOldPassword(!showOldPassword)} edge="end">
                                        {showOldPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <FormControl sx={{ width: '100%', my: 1 }} variant="outlined" required size="small" >
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
                    <FormControl sx={{ width: '100%', my: 1 }} variant="outlined" required size="small" >
                        <InputLabel htmlFor="confirmation-password">Confirmation Password</InputLabel>
                        <FilledInput
                            id="confirmation-password"
                            type={ 'password'}
                            value={confirmPassword}
                            onChange={(event) => handleInputChange('CONFIRM-PASSWORD', event)}
                            label="Password"
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    {
                        !isFormSubmitting ?
                            <Button sx={{ mx: 2, my: 1 }} onClick={handleChangePassword} variant="contained" fullWidth> Change Password </Button>
                            :
                            <Button disabled variant="contained" size="small" endIcon={<CircularProgress size="small" />} sx={{ width: '100%', mx: 2, my: 1 }}>
                                A Moment ...
                            </Button>
                    }
                </DialogActions>
            </Dialog>
            {/* Registration Form | Modal */}


        </div>
    )
}