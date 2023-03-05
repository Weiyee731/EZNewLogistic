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
import Input from '@mui/material/Input';

import AccountCircle from '@mui/icons-material/AccountCircle';
import { Card } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { isStringNullOrEmpty, isArrayNotEmpty, useWindowDimensions, isEmailValid } from "../../tools/Helpers";
import LoginWallpaper from "../../assets/login-wallpaper.jpg"
import './Loginpage.css';
import Icon from "../../assets/EZ_logo.png"
import LoadingPanel from "../../components/LoadingPanel/LoadingPanel";

export const Loginpage = () => {
    const REGISTRATION = 'registration'
    const PASSWORD_RECOVERY = 'password-recovery'
    const { width } = useWindowDimensions()

    const { setAuth } = useAuth();
    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"; // capture the page where user came from, then it will navigate back to the page after login

    // mapStateToProps 
    const dispatch = useDispatch();

    const isFormSubmitting = useSelector(state => state.counterReducer.loading)
    const logonUser = useSelector(state => state.counterReducer.logonUser)
    const resetPassword = useSelector(state => state.counterReducer.resetPassword)
    const AreaCodes = useSelector(state => state.counterReducer.areaCodes)
    const registration_returnValue = useSelector(state => state.counterReducer.userUpdateReturnValue)

    /* PLACE YOUR HOOKS HERE */
    const [loginAccount, setLoginAccount] = useState({
        USERNAME: '',
        PASSWORD: '',
        REMEMBER: false,
    })

    const [signupAccount, setSignupAccount] = useState({
        USERAREAID: 1,
        USERNAME: '',
        PASSWORD: '',
        FULLNAME: '',
        CONTACTNO: '',
        REFERALCODE: '',
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

    // when user reset password successfully
    useEffect(() => {
        if (isArrayNotEmpty(resetPassword)) {
            try {
                if (resetPassword[0].ReturnMsg !== "") {
                    toast.success("更新密码电邮已发去您的邮箱")
                    setOpenPasswordRecoveryModal(false)
                }
                else {
                    if (JSON.parse(resetPassword[0].ReturnData)[0].UserID == 0) {
                        toast.warning("此账户未注册账号")
                    }
                }
            }
            catch (Exceptions) {
                console.log(Exceptions)
            }
            dispatch(GitAction.CallClearForgetPassword())
        }

    }, [resetPassword])
    // when user reset password successfully

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
                        REFERALCODE: '',
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

    const handleForgetPassword = () => {
        console.log("handleForgetPasswordhandleForgetPassword")
        if (isStringNullOrEmpty(recoveryEmail) || !isEmailValid(recoveryEmail))
            toast.error("需填写正确的邮箱")
        else {
            dispatch(GitAction.CallResetPassword({ UserEmail: recoveryEmail }))
        }
    }

    const handleRegistration = () => {
        const isValidate = (
            (!isStringNullOrEmpty(signupAccount.USERAREAID) && signupAccount.USERAREAID > 0) &&
            !isStringNullOrEmpty(signupAccount.USERNAME) &&
            (!isStringNullOrEmpty(signupAccount.PASSWORD) && signupAccount.PASSWORD.length >= 6) &&
            !isStringNullOrEmpty(signupAccount.FULLNAME) &&
            !isStringNullOrEmpty(signupAccount.CONTACTNO) &&
            !isStringNullOrEmpty(signupAccount.USEREMAIL)
        )

        if (isValidate) {
            signupAccount.USERNICKNAME = isStringNullOrEmpty(signupAccount.USERNICKNAME) ? "-" : signupAccount.USERNICKNAME
            signupAccount.USERWECHATID = isStringNullOrEmpty(signupAccount.USERWECHATID) ? "-" : signupAccount.USERWECHATID
            signupAccount.REFERALCODE = isStringNullOrEmpty(signupAccount.REFERALCODE) ? "-" : signupAccount.REFERALCODE

            dispatch(GitAction.CallRegisterUser(signupAccount))
            // dispatch(GitAction.CallRegisterUser_WithReferal(signupAccount))
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

            case 'REGISTRATION-REFERALCODE':
                ReistrationUserState.REFERALCODE = event.target.value
                setLoginAccount({ ...ReistrationUserState })

            case 'RECOVERY-EMAIL':
                setRecoveryEmail(event.target.value)
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
        <div className="container" >
            {
                localStorage.getItem("user") !== "" ?
                    <LoadingPanel />
                    :
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        style={{ minHeight: '80vh' }}
                    >
                        <Card style={{ borderColor: "1px solid #23395d" }}>
                            <div className="login-panel">
                                <div style={{ textAlign: "center" }}>
                                    <img src={Icon} alt="EZ logo" width="30%" />
                                    <Typography style={{ fontWeight: "bold", fontSize: "25px" }} variant="body" component="p" gutterBottom>
                                        壹智国际物流
                                    </Typography>
                                </div>

                                {
                                    isLoginInvalidInput &&
                                    <Typography sx={{ color: '#FF5733' }} variant="body" component="p" gutterBottom>
                                        你所使用的户口或密码错误哟，请重新尝试登入
                                    </Typography>
                                }
                                <FormControl sx={{ width: '100%', mb: 2 }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-username">登入账号</InputLabel>
                                    <Input
                                        id="login-user--username"
                                        value={loginAccount.USERNAME}
                                        onChange={(event) => handleInputChange('USERNAME', event)}
                                        onKeyDown={event => handleInputKeydown("LOGIN", event)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton >
                                                    <AccountCircle />
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>

                                <FormControl sx={{ width: '100%', mb: 2 }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-password">登入密码</InputLabel>
                                    <Input
                                        id="standard-adornment-password"
                                        type={showLoginPassword ? 'text' : 'password'}
                                        value={loginAccount.PASSWORD}
                                        onChange={(event) => handleInputChange('PASSWORD', event)}
                                        onKeyDown={(event) => handleInputKeydown("LOGIN", event)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={setLoginPasswordVisibility}
                                                >
                                                    {showLoginPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <div className="account-manager" style={{ textAlign: "right" }}>
                                    <Typography style={{ color: "#808080" }} onClick={() => handleModal(PASSWORD_RECOVERY, true)}>
                                        忘记密码
                                    </Typography>
                                </div>

                                <div style={{ paddingTop: "15px", paddingBottom: "10px" }}>
                                    {
                                        !isFormSubmitting ?
                                            <Button onClick={handleLogin} variant="contained" sx={{ width: '100%', mb: 2 }}>登入</Button>
                                            :
                                            <Button disabled variant="contained" size="small" endIcon={<CircularProgress size="small" />} sx={{ width: '100%', mb: 2 }}>
                                                请稍等 ...
                                            </Button>
                                    }
                                </div>

                                <div className="account-manager" style={{ textAlign: "center", paddingBottom: "10px" }}>
                                    <Typography style={{ color: "#808080" }} onClick={() => handleModal(REGISTRATION, true)}>
                                        未有代号？注册新会员
                                    </Typography>
                                </div>

                            </div>
                        </Card>
                    </Grid>
            }
            {/* Registration Form | Modal */}
            <Dialog scroll="paper" open={openRegistrationModal} onClose={() => handleModal(REGISTRATION, false)} aria-labelledby="registration-title" aria-describedby="registration-description" >
                <DialogTitle id="registration-title">
                    注册新会员信息
                    <IconButton
                        aria-label="close"
                        onClick={() => handleModal(REGISTRATION, false)}
                        sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500], }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <TextField id="registration--fullname"
                        value={signupAccount.FULLNAME}
                        onChange={(event) => { handleInputChange("REGISTRATION-FULLNAME", event) }}
                        label="名字"
                        fullWidth
                        variant="standard"
                        size="small"
                        sx={{ my: 1 }}
                        required
                        error={isStringNullOrEmpty(signupAccount.FULLNAME)}
                        helperText={isStringNullOrEmpty(signupAccount.FULLNAME) ? "须填写名字" : ''}
                    />
                    {/* <TextField id="registration--nickname" value={signupAccount.USERNICKNAME} onChange={(event) => { handleInputChange("REGISTRATION-NICKNAME", event) }} label="昵称" fullWidth variant="standard" size="small" sx={{ my: 1 }} /> */}

                    <TextField id="registration--username" value={signupAccount.USERNAME} onChange={(event) => {
                        handleInputChange("REGISTRATION-NICKNAME", event)
                        handleInputChange("REGISTRATION-USERNAME", event)

                    }} label="账号" fullWidth variant="standard" required size="small" sx={{ my: 1 }} />
                    <FormControl sx={{ width: '100%', my: 1 }} variant="outlined" required size="small" >
                        <InputLabel htmlFor="registration--password">密码</InputLabel>
                        <Input
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
                            helpertext={isStringNullOrEmpty(signupAccount.PASSWORD) || signupAccount.PASSWORD.length < 6 ? "须填写密码, 确保密码至少有6个字" : ''}
                        />
                        {signupAccount.PASSWORD !== "" && signupAccount.PASSWORD.length < 6 && <label style={{ color: "red" }}>须填写密码, 确保密码至少有6个字</label>}
                    </FormControl>

                    <FormControl sx={{ width: '100%', my: 1 }} variant="standard" size="small" >
                        <InputLabel id="area-code--select">地区</InputLabel>
                        <Select
                            labelId="area-code--select"
                            id="area-code--select--dropdown"
                            value={signupAccount.USERAREAID}
                            label="地区"
                            required
                            onChange={(event) => { handleInputChange("REGISTRATION-AREACODE", event) }}
                        >
                            {
                                isArrayNotEmpty(AreaCodes) ?
                                    AreaCodes.map((el, idx) =>
                                        <MenuItem key={idx + "__" + el.AreaCode} value={el.UserAreaID}>{el.AreaCode + " - " + el.AreaName}</MenuItem>
                                    )
                                    :
                                    <MenuItem disabled><i>暂无地区可选择</i></MenuItem>
                            }
                        </Select>
                    </FormControl>
                    <TextField
                        id="registration--contact"
                        value={signupAccount.CONTACTNO}
                        onChange={(event) => { handleInputChange("REGISTRATION-CONTACTNO", event) }}
                        label="电话"
                        fullWidth
                        variant="standard"
                        size="small"
                        sx={{ width: '100%', my: 1 }}
                        required
                        error={isStringNullOrEmpty(signupAccount.CONTACTNO)}
                        helperText={isStringNullOrEmpty(signupAccount.CONTACTNO) ? "须填写电话号码" : ''}
                    />
                    <TextField
                        id="registration--email"
                        value={signupAccount.USEREMAIL}
                        onChange={(event) => { handleInputChange("REGISTRATION-EMAIL", event) }}
                        label="邮箱"
                        fullWidth
                        variant="standard"
                        size="small"
                        sx={{ my: 1 }}
                        required
                        error={isStringNullOrEmpty(signupAccount.USEREMAIL)}
                        helperText={isStringNullOrEmpty(signupAccount.USEREMAIL) ? "须填写邮箱" : ''}
                    />
                    <TextField
                        id="registration--wechatid"
                        value={signupAccount.USERWECHATID}
                        onChange={(event) => { handleInputChange("REGISTRATION-WECHATID", event) }}
                        label="微信"
                        fullWidth
                        variant="standard"
                        size="small"
                        sx={{ my: 1 }}
                    />
                </DialogContent>
                <DialogActions>
                    {
                        !isFormSubmitting ?
                            <Button sx={{ mx: 2, my: 1 }} onClick={handleRegistration} variant="contained" fullWidth> 注册新会员 </Button>
                            :
                            <Button disabled variant="contained" size="small" endIcon={<CircularProgress size="small" />} sx={{ width: '100%', mx: 2, my: 1 }}>
                                请稍等 ...
                            </Button>
                    }
                </DialogActions>
            </Dialog>
            <Dialog open={openPasswordRecoveryModal} onClose={() => handleModal(PASSWORD_RECOVERY, false)} aria-labelledby="password-recovery-title" aria-describedby="password-recovery-description" >
                <DialogTitle id="password-recovery-title">
                    忘记密码
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
                        请输入您的邮箱
                    </DialogContentText>
                    <TextField id="recovery-email"
                        value={recoveryEmail}
                        onChange={(event) => { handleInputChange("RECOVERY-EMAIL", event) }}
                        label="邮箱"
                        fullWidth
                        variant="standard"
                        size="small"
                        sx={{ my: 1 }}
                        required
                        error={isStringNullOrEmpty(recoveryEmail)}
                        helperText={isStringNullOrEmpty(recoveryEmail) ? "须填写邮箱" : ''}
                    />
                </DialogContent>
                <DialogActions>
                    {
                        !isFormSubmitting ?
                            <Button sx={{ mx: 2, my: 1 }} disabled={recoveryEmail === "" ? true : false} onClick={handleForgetPassword} variant="contained" fullWidth> 确认发送 </Button>
                            :
                            <Button disabled variant="contained" size="small" endIcon={<CircularProgress size="small" />} sx={{ width: '100%', mx: 2, my: 1 }}>
                                请稍等 ...
                            </Button>
                    }
                </DialogActions>
            </Dialog>

        </div>
    )
}