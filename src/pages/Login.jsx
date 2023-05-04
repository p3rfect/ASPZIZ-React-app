import React, {useCallback, useEffect, useState} from 'react';
import MyForm from "../components/UI/formWithPic/MyForm";
import {useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import {VisibilityOff, Visibility} from "@mui/icons-material";
import {InputAdornment, FormControl, InputLabel, OutlinedInput} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import UnknownError from "../components/UI/UnknownError/UnknownError";
import MyAlert from "../components/UI/MyAlert/MyAlert";
import {setUser} from '../features/user/userSlice.js'
import {useDispatch} from "react-redux";
import {login as LoginRequest} from '../services/AuthService.js';
function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const route = useNavigate()
    const [showUnknownError, setShowUnknownError] = useState(false)
    const [showNotFoundError, setShowNotFoundError] = useState(false)
    const dispatch = useDispatch()
    const login = async () => {
        try{
            const response = await LoginRequest(email, password)
            dispatch(setUser({email: email, role: response.data.role}))

            route("/info")
        } catch(e){
            if (e.message === "Invalid user name or password"){
                setShowNotFoundError(true)
            } else{
                setShowUnknownError(true)
            }
        }
    }

    const loginCallback = useCallback(login, [email, password, route])

    useEffect(() => {
        const listener = async event => {
            if (event.code === "Enter" || event.code === "NumpadEnter"){
                event.preventDefault()
                await loginCallback()
            }
        }
        document.addEventListener("keydown", listener)
        return () => {
            document.removeEventListener("keydown", listener)
        }
    }, [loginCallback])

    const redirectToReg = () => {
        route("/registration")
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div style={{textAlign: "center", alignContent: "center", marginTop: "80px"}}>
            <h1 style={{fontSize: "100px", marginBottom: "0px"}}>БГУИР</h1>
            <UnknownError showAlert={showUnknownError} setShowAlert={setShowUnknownError}/>
            <MyAlert showAlert={showNotFoundError} setShowAlert={setShowNotFoundError} title="Ошибка"
                     text = "Неверные адрес эл. почты или пароль"/>
            <MyForm list={[
                <h2 style={{fontSize: "40px", margin: "0 0 20px 0"}} key="h2">Вход</h2>,
                <FormControl sx={{ m: 1, width: "80%" }} variant="outlined" key="email-form">
                    <InputLabel htmlFor="outlined-email">Адрес эл. почты</InputLabel>
                    <OutlinedInput
                        id="outlined-login-input"
                        label="Адрес эл. почты"
                        value={email}
                        onChange={e => {setEmail(e.target.value)}}
                    />
                </FormControl>,
                <FormControl sx={{ m: 1, width: "80%" }} variant="outlined" key="password-form">
                    <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
                    <OutlinedInput
                        id="outlined-password-input"
                        type={showPassword ? "text" : "password"}
                        label="Пароль"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        value={password}
                        onChange={e => {setPassword(e.target.value)}}
                    />
                </FormControl>,
                <Button variant="outlined" style={{marginTop: "25px", width: "30%"}} onClick={login} key="login-button">Войти</Button>,
                <Button variant="text" onClick={redirectToReg} style={{marginTop: "15px", marginBottom: "0"}} key="redir-button">Зарегистрироваться</Button>]}
                authForm={true}
                style={{paddingBottom: "15px"}}/>
        </div>
    );
}

export default Login;