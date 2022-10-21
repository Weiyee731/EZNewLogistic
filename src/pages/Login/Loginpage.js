import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, Provider } from 'react-redux'
import { TopbarNav } from "../../components/TopbarNav";
import useAuth from "../../hooks/useAuth";
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { GitAction } from "../../store/action/gitAction";
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import LoginWallpaper from "../../assets/login-wallpaper.jpg"
import './Loginpage.css';

export const Loginpage = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"; // capture the page where user came from, then it will navigate back to the page after login

    const dispatch = useDispatch();

    const [loginAccount, setLoginAccount] = useState({
        USERNAME: '',
        PASSWORD: '',
        REMEMBER: false,
    })
    const [showPassword, setShowPassword] = useState(false)
    const isFormSubmitting = useSelector(state => state.counterReducer.loading)

    useEffect(() => {
        console.log(isFormSubmitting)
    })

    const handleLogin = () => {
        console.log(loginAccount)
        dispatch(GitAction.CallLoading())
        // setAuth({user, pwd, roles, accessToken})
        // navigate(from, {replace: true});
    }

    const setPasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleInputChange = (inputProps, event) => {
        let LoginUserState = loginAccount
        console.log(LoginUserState)

        switch (inputProps) {
            case 'USERNAME':
                LoginUserState.USERNAME = event.target.value
                setLoginAccount({ ...LoginUserState })
                break;

            case 'PASSWORD':
                LoginUserState.PASSWORD = event.target.value
                setLoginAccount({ ...LoginUserState })
                break;

            case 'SET-REMEMBER':
                LoginUserState.REMEMBER = event.target.value
                setLoginAccount({ ...LoginUserState })
                break;

            default:
                break;
        }
    }

    return (
        <div className="container">
            <Grid container spacing={2}>
                <Grid item md={6}>
                    <div className="login-wallpaper" style={{ backgroundImage: `url(${LoginWallpaper})`, }}>
                        {/* <img src={LoginWallpaper} alt='loginpage--wallpaper' width={'100%'} height={'100%'} /> */}
                    </div>
                </Grid>
                <Grid item md={6} sx={{ display: 'flex' }}>
                    <div className="login-panel">
                        <div className="logo-container">

                        </div>

                        <TextField id="login-user--username" label="Username" value={loginAccount.USERNAME} variant="filled" sx={{ width: '100%', m: 1 }} onChange={(event) => handleInputChange('USERNAME', event)} />

                        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                            <InputLabel htmlFor="login-user--password">Password</InputLabel>
                            <FilledInput
                                id="login-user--password"
                                type={showPassword ? 'text' : 'password'}
                                value={loginAccount.PASSWORD}
                                onChange={(event) => handleInputChange('PASSWORD', event)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={setPasswordVisibility}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>

                        <Button onClick={handleLogin} variant="contained" sx={{ width: '100%', m: 1 }}>Login</Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}