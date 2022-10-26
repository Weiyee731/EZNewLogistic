import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, Provider } from 'react-redux'
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { GitAction } from "../../store/action/gitAction";
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import CircularProgress from '@mui/material/CircularProgress';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { isStringNullOrEmpty, isArrayNotEmpty, getWindowDimensions } from "../../Repository/Helper"
import LoginWallpaper from "../../assets/login-wallpaper.jpg"
import './Loginpage.css';
import Icon from "../../assets/yw_icon.png"

export const Loginpage = () => {
    const REGISTRATION = 'registration'
    const PASSWORD_RECOVERY = 'password-recovery'

    const { setAuth } = useAuth();
    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"; // capture the page where user came from, then it will navigate back to the page after login

    // mapStateToProps 
    const dispatch = useDispatch();

    const isFormSubmitting = useSelector(state => state.counterReducer.loading)
    const logonUser = useSelector(state => state.counterReducer.logonUser)
    const AreaCodes = useSelector(state => state.counterReducer.areaCodes)
    const registration_returnValue = useSelector(state => state.counterReducer.userUpdateReturnValue)

    /* PLACE YOUR HOOKS HERE */
    const [loginAccount, setLoginAccount] = useState({
        USERNAME: '',
        PASSWORD: '',
        REMEMBER: false,
    })

    const [signupAccount, setSignupAccount] = useState({
        USERAREAID: 0,
        USERNAME: '',
        PASSWORD: '',
        FULLNAME: '',
        CONTACTNO: '',
        USEREMAIL: '',
        USERNICKNAME: '',
        USERWECHATID: '',
        AGREEMENTCHECKED: '',
    })

    const [showLoginPassword, setShowLoginPassword] = useState(false)
    const [showRegistrationPassword, setShowRegistrationPassword] = useState(false)
    const [isLoginInvalidInput, setIsLoginInvalidInput] = useState(null)
    const [openRegistrationModal, setOpenRegistrationModal] = useState(false)
    const [openPasswordRecoveryModal, setOpenPasswordRecoveryModal] = useState(false)
    const [recoveryEmail, setRecoveryEmail] = useState('')
    /* PLACE YOUR HOOKS HERE */

    // init()
    useEffect(() => {
        dispatch(GitAction.CallFetchUserAreaCode())
    }, [])

    useEffect(() => {
        let logonUser = localStorage.getItem("user")
        try {
            logonUser = JSON.parse(logonUser)

            if (!isStringNullOrEmpty(logonUser.UserID) && !isStringNullOrEmpty(logonUser.Username)) {
                setAuth(logonUser)
                navigate('/profile', { replace: true })
            }
        }
        catch (Exceptions) {
            localStorage.setItem("user", '')
        }
    }, [])

    // when user login successfully
    useEffect(() => {
        if (isArrayNotEmpty(logonUser)) {
            try {
                if (isStringNullOrEmpty(logonUser[0].ReturnVal)) {
                    setIsLoginInvalidInput(false)
                    setLoginAccount({
                        USERNAME: '',
                        PASSWORD: '',
                        REMEMBER: false,
                    })

                    setAuth(logonUser[0])
                    localStorage.setItem("user", JSON.stringify(logonUser[0]))
                    navigate('/profile', { replace: true });
                    dispatch(GitAction.CallClearLogonUserCache())
                }
                else {
                    if (logonUser[0].ReturnVal === 0 || logonUser[0].ReturnVal === "0") {
                        setIsLoginInvalidInput(true)
                        dispatch(GitAction.CallClearLogonUserCache())
                    }
                }
            }
            catch (Exceptions) {
                console.log(Exceptions)
            }
        }

    }, [logonUser])
    // when user login successfully

    // user registration 
    useEffect(() => {
        if (isArrayNotEmpty(registration_returnValue)) {
            try {
                if (!isStringNullOrEmpty(registration_returnValue[0].ReturnVal) && registration_returnValue[0].ReturnVal === 1) {
                    setSignupAccount({
                        USERAREAID: 0,
                        USERNAME: '',
                        PASSWORD: '',
                        FULLNAME: '',
                        CONTACTNO: '',
                        USEREMAIL: '',
                        USERNICKNAME: '',
                        USERWECHATID: '',
                        AGREEMENTCHECKED: '',
                    })
                    setOpenRegistrationModal(false)
                    toast.success('Your account is registered! Please login with your registered account.', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: false,
                        theme: "colored",
                    });
                    dispatch(GitAction.CallResetUserUpdateReturnValue())
                }
                else {
                    if (registration_returnValue[0].ReturnVal === 0 || registration_returnValue[0].ReturnVal === "0") {
                        setIsLoginInvalidInput(true)
                        dispatch(GitAction.CallResetUserUpdateReturnValue())
                    }
                }
            }
            catch (Exceptions) {
                console.log(Exceptions)
            }
        }
    }, [registration_returnValue])
    // user registration 

    const handleLogin = () => {
        const isValidate = (!isStringNullOrEmpty(loginAccount.USERNAME) && !isStringNullOrEmpty(loginAccount.PASSWORD))

        if (isValidate) {
            setIsLoginInvalidInput(false)
            setShowLoginPassword(false)

            dispatch(GitAction.CallUserLogin(loginAccount))
        }
        else {
            setIsLoginInvalidInput(true)
        }

    }

    const handleRegistration = () => {
        const isValidate = (
            (!isStringNullOrEmpty(signupAccount.USERAREAID) && signupAccount.USERAREAID > 0) &&
            !isStringNullOrEmpty(signupAccount.USERNAME) &&
            (!isStringNullOrEmpty(signupAccount.PASSWORD) && signupAccount.PASSWORD.length >= 8) &&
            !isStringNullOrEmpty(signupAccount.FULLNAME) &&
            !isStringNullOrEmpty(signupAccount.CONTACTNO) &&
            !isStringNullOrEmpty(signupAccount.USEREMAIL)
        )

        if (isValidate) {
            signupAccount.USERNICKNAME = isStringNullOrEmpty(signupAccount.USERNICKNAME) ? "-" : signupAccount.USERNICKNAME
            signupAccount.USERWECHATID = isStringNullOrEmpty(signupAccount.USERWECHATID) ? "-" : signupAccount.USERWECHATID

            dispatch(GitAction.CallRegisterUser(signupAccount))
        }
        else {
            toast.error('Your inputs are invalid. Please check with require (*) fields', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: false,
                theme: "colored",
            });
        }

    }

    const setLoginPasswordVisibility = () => {
        setShowLoginPassword(!showLoginPassword)
    }

    const setRegistrationPasswordVisibility = () => {
        setShowRegistrationPassword(!showRegistrationPassword)
    }

    const handleInputKeydown = (name, e) => {
        switch (name) {
            case "LOGIN":
                if (e.key === 'Enter' || e.keyCode === 13) {
                    handleLogin()
                }
                break;

            default:
                break;
        }

    }

    const handleInputChange = (inputProps, event) => {
        let LoginUserState = loginAccount
        let ReistrationUserState = signupAccount

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

            // Registration Form
            case 'REGISTRATION-FULLNAME':
                ReistrationUserState.FULLNAME = isStringNullOrEmpty(event.target.value) ? "" : event.target.value.toUpperCase()
                setSignupAccount({ ...ReistrationUserState })
                break;
            case 'REGISTRATION-NICKNAME':
                ReistrationUserState.USERNICKNAME = event.target.value
                setSignupAccount({ ...ReistrationUserState })
                break;
            case 'REGISTRATION-USERNAME':
                ReistrationUserState.USERNAME = isStringNullOrEmpty(event.target.value) ? "" : event.target.value.toUpperCase()
                setSignupAccount({ ...ReistrationUserState })
                break;
            case 'REGISTRATION-PASSWORD':
                ReistrationUserState.PASSWORD = event.target.value
                setSignupAccount({ ...ReistrationUserState })
                break;
            case 'REGISTRATION-AREACODE':
                ReistrationUserState.USERAREAID = event.target.value
                setSignupAccount({ ...ReistrationUserState })
                break;
            case 'REGISTRATION-CONTACTNO':
                ReistrationUserState.CONTACTNO = event.target.value
                setSignupAccount({ ...ReistrationUserState })
                break;
            case 'REGISTRATION-EMAIL':
                ReistrationUserState.USEREMAIL = event.target.value
                setSignupAccount({ ...ReistrationUserState })
                break;
            case 'REGISTRATION-WECHATID':
                ReistrationUserState.USERWECHATID = event.target.value
                setSignupAccount({ ...ReistrationUserState })
                break;

            default:
                break;
        }
    }

    const handleModal = (modalName, openModal) => {

        switch (modalName) {
            case REGISTRATION:
                setOpenRegistrationModal(openModal)
                break;

            case PASSWORD_RECOVERY:
                setOpenPasswordRecoveryModal(openModal)
                break;

            default:
                break;

        }
    }

    return (
        <div className="container">
            <Grid container spacing={2}>
                {
                    getWindowDimensions().screenWidth >= 768 &&
                    <Grid item md={6} xs={12}>
                        <div className="login-wallpaper" style={{ backgroundImage: `url(${LoginWallpaper})`, }}>
                            {/* <img src={LoginWallpaper} alt='loginpage--wallpaper' width={'100%'} height={'100%'} /> */}
                        </div>
                    </Grid>
                }

                <Grid item md={6} xs={12} sx={{ display: 'flex', p: 1, }}>
                    <div className="login-panel">
                        <div className="logo-container">
                            <img src={Icon} alt="logo" width="100%" height="100%" />
                        </div>

                        {
                            isLoginInvalidInput &&
                            <Typography sx={{ color: '#FF5733' }} variant="body" component="p" gutterBottom>
                                你所使用的户口或密码错误哟，请重新尝试登入
                            </Typography>
                        }
                        <Typography variant="h4" component="h4" sx={{ textAlign: 'center', mb: 2 }}>雅威国际物流</Typography>
                        <TextField
                            id="login-user--username"
                            label="用户户口"
                            value={loginAccount.USERNAME}
                            variant="filled"
                            sx={{ width: '100%', mb: 2 }}
                            onChange={(event) => handleInputChange('USERNAME', event)}
                            onKeyDown={event => handleInputKeydown("LOGIN", event)}
                        />

                        <FormControl sx={{ width: '100%', mb: 2 }} variant="outlined">
                            <InputLabel htmlFor="login-user--password">用户密码</InputLabel>
                            <FilledInput
                                id="login-user--password"
                                type={showLoginPassword ? 'text' : 'password'}
                                value={loginAccount.PASSWORD}
                                onChange={(event) => handleInputChange('PASSWORD', event)}
                                onKeyDown={(event) => handleInputKeydown("LOGIN", event)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={setLoginPasswordVisibility}
                                            edge="end"
                                        >
                                            {showLoginPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>

                        {
                            !isFormSubmitting ?
                                <Button onClick={handleLogin} variant="contained" sx={{ width: '100%', mb: 2 }}>登入</Button>
                                :
                                <Button disabled variant="contained" size="small" endIcon={<CircularProgress size="small" />} sx={{ width: '100%', mb: 2 }}>
                                    请稍等 ...
                                </Button>
                        }

                        <div className="account-manager">
                            <p>
                                <Link href="#" underline="always" style={{ color: "#0074D9" }} onClick={() => handleModal(REGISTRATION, true)}>
                                    新来的? 点这里注册个账号吧!
                                </Link>
                            </p>
                            <p>
                                <Link href="#" underline="hover" style={{ color: "#323232" }} onClick={() => handleModal(PASSWORD_RECOVERY, true)}>
                                    亲，忘记了密码了吗?
                                </Link>
                            </p>
                        </div>
                    </div>
                </Grid>
            </Grid>



            {/* Registration Form | Modal */}
            <Dialog scroll="paper" open={openRegistrationModal} onClose={() => handleModal(REGISTRATION, false)} aria-labelledby="registration-title" aria-describedby="registration-description" >
                <DialogTitle id="registration-title">
                    注册个人账号
                    <IconButton
                        aria-label="close"
                        onClick={() => handleModal(REGISTRATION, false)}
                        sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500], }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        我们需要您的个人讯息，以便我们方便联络您
                    </DialogContentText>
                    <TextField id="registration--fullname"
                        value={signupAccount.FULLNAME}
                        onChange={(event) => { handleInputChange("REGISTRATION-FULLNAME", event) }}
                        label="您的全名"
                        fullWidth
                        variant="filled"
                        size="small"
                        sx={{ my: 1 }}
                        required
                        error={isStringNullOrEmpty(signupAccount.FULLNAME)}
                        helperText={isStringNullOrEmpty(signupAccount.FULLNAME) ? "您必须填写你的名字" : ''}
                    />
                    <TextField id="registration--nickname" value={signupAccount.USERNICKNAME} onChange={(event) => { handleInputChange("REGISTRATION-NICKNAME", event) }} label="昵称" fullWidth variant="filled" size="small" sx={{ my: 1 }} />

                    <TextField id="registration--username" value={signupAccount.USERNAME} onChange={(event) => { handleInputChange("REGISTRATION-USERNAME", event) }} label="账户户口" fullWidth variant="filled" required size="small" sx={{ my: 1 }} />
                    <FormControl sx={{ width: '100%', my: 1 }} variant="outlined" required size="small" >
                        <InputLabel htmlFor="registration--password">账户密码</InputLabel>
                        <FilledInput
                            id="registration--password"
                            type={showRegistrationPassword ? 'text' : 'password'}
                            value={signupAccount.PASSWORD}
                            onChange={(event) => handleInputChange('REGISTRATION-PASSWORD', event)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton aria-label="toggle password visibility" onClick={setRegistrationPasswordVisibility} edge="end">
                                        {showRegistrationPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            required
                            error={isStringNullOrEmpty(signupAccount.PASSWORD)}
                            helpertext={isStringNullOrEmpty(signupAccount.PASSWORD) ? "您必须填写你的密码, 请确保密码是由8个字母与以上所组成" : ''}
                        />
                    </FormControl>

                    <FormControl sx={{ width: '100%', my: 1 }} variant="filled" size="small" >
                        <InputLabel id="area-code--select">住址地区</InputLabel>
                        <Select
                            labelId="area-code--select"
                            id="area-code--select--dropdown"
                            value={signupAccount.USERAREAID}
                            label="住址地区"
                            onChange={(event) => { handleInputChange("REGISTRATION-AREACODE", event) }}
                        >
                            {
                                isArrayNotEmpty(AreaCodes) ?
                                    AreaCodes.map((el, idx) =>
                                        <MenuItem key={idx + "__" + el.AreaCode} value={el.UserAreaID}>{el.AreaCode + " - " + el.AreaName}</MenuItem>
                                    )
                                    :
                                    <MenuItem disabled><i>There is no Area Code to Select</i></MenuItem>
                            }
                        </Select>
                    </FormControl>
                    <TextField
                        id="registration--contact"
                        value={signupAccount.CONTACTNO}
                        onChange={(event) => { handleInputChange("REGISTRATION-CONTACTNO", event) }}
                        label="电话号码"
                        fullWidth
                        variant="filled"
                        size="small"
                        sx={{ width: '100%', my: 1 }}
                        required
                        error={isStringNullOrEmpty(signupAccount.CONTACTNO)}
                        helperText={isStringNullOrEmpty(signupAccount.CONTACTNO) ? "您必须填写你的电话号码" : ''}
                    />
                    <TextField
                        id="registration--email"
                        value={signupAccount.USEREMAIL}
                        onChange={(event) => { handleInputChange("REGISTRATION-EMAIL", event) }}
                        label="电子邮件"
                        fullWidth
                        variant="filled"
                        size="small"
                        sx={{ my: 1 }}
                        required
                        error={isStringNullOrEmpty(signupAccount.USEREMAIL)}
                        helperText={isStringNullOrEmpty(signupAccount.USEREMAIL) ? "您必须填写你的电子邮件" : ''}
                    />
                    <TextField
                        id="registration--wechatid"
                        value={signupAccount.USERWECHATID}
                        onChange={(event) => { handleInputChange("REGISTRATION-WECHATID", event) }}
                        label="微信"
                        fullWidth
                        variant="filled"
                        size="small"
                        sx={{ my: 1 }}
                    />
                </DialogContent>
                <DialogActions>
                    {
                        !isFormSubmitting ?
                            <Button sx={{ mx: 2, my: 1 }} onClick={handleRegistration} variant="contained" fullWidth> 注册账号 </Button>
                            :
                            <Button disabled variant="contained" size="small" endIcon={<CircularProgress size="small" />} sx={{ width: '100%', mx: 2, my: 1 }}>
                                请稍等 ...
                            </Button>
                    }
                </DialogActions>
            </Dialog>
            {/* Registration Form | Modal */}

            {/* Registration Form | Modal */}
            <Dialog scroll="paper" open={openPasswordRecoveryModal} onClose={() => handleModal(PASSWORD_RECOVERY, false)} aria-labelledby="password-recovery-title" aria-describedby="password-recovery-description" >
                <DialogTitle id="password-recovery-title">
                    索回您的账户
                    <IconButton
                        aria-label="close"
                        onClick={() => handleModal(PASSWORD_RECOVERY, false)}
                        sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500], }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        请输入您的电子邮件来索取您的账户
                    </DialogContentText>
                    <TextField id="recovery-email"
                        value={recoveryEmail}
                        onChange={(event) => { handleInputChange("RECOVERY-EMAIL", event) }}
                        label="电子邮件"
                        fullWidth
                        variant="filled"
                        size="small"
                        sx={{ my: 1 }}
                        required
                        error={isStringNullOrEmpty(recoveryEmail)}
                        helperText={isStringNullOrEmpty(recoveryEmail) ? "您必须填写你的电子邮件" : ''}
                    />
                </DialogContent>
                <DialogActions>
                    {
                        !isFormSubmitting ?
                            <Button sx={{ mx: 2, my: 1 }} onClick={handleRegistration} variant="contained" fullWidth> 索取您的账户 </Button>
                            :
                            <Button disabled variant="contained" size="small" endIcon={<CircularProgress size="small" />} sx={{ width: '100%', mx: 2, my: 1 }}>
                                请稍等 ...
                            </Button>
                    }
                </DialogActions>
            </Dialog>
            {/* Registration Form | Modal */}

        </div>
    )
}