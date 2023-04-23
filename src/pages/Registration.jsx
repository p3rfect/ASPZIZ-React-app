import React, {useCallback, useEffect} from 'react';
import MyForm from "../components/UI/formWithPic/MyForm";
import {useNavigate} from "react-router-dom";
import {register} from "../services/AuthService";
import {FormControl, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {useState} from "react";
import Button from "@mui/material/Button";
import MyAlert from "../components/UI/MyAlert/MyAlert";
import UnknownError from "../components/UI/UnknownError/UnknownError";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const Registration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatedPassword, setRepeatedPassword] = useState('')
    const route = useNavigate()
    const [showPasswordAlert, setShowPasswordAlert] = useState(false)
    const [showUserExistAlert, setShowUserExistAlert] = useState(false)
    const [showUnknownError, setShowUnknownError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const registerUser = async () => {
        if (repeatedPassword === password) {
            try {
                await register(email, password);
                route("/submitting")
            } catch (e) {
                if (e.message === "User is already exist"){
                    setShowUserExistAlert(true)
                }
                else{
                    setShowUnknownError(true)
                }
            }
        }
        else{
            setShowPasswordAlert(true)
        }
    }

    const registerUserCallback = useCallback(registerUser, [email, password, route, repeatedPassword])

    useEffect(() => {
        const listener = async event => {
            if (event.code === "Enter" || event.code === "NumpadEnter"){
                event.preventDefault()
                await registerUserCallback()
            }
        }
        document.addEventListener("keydown", listener)
        return () => {
            document.removeEventListener("keydown", listener)
        }
    }, [registerUserCallback])

    const redirectToLogin = () => {
        route("/")
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div style={{textAlign: "center", alignContent: "center", marginTop: "80px"}}>
            <h1 style={{fontSize: "100px", marginBottom: "0px"}}>БГУИР</h1>
            <MyAlert setShowAlert={setShowPasswordAlert} showAlert={showPasswordAlert} title={"Ошибка"}
                     text={"Введенные пароли не совпадают"}/>
            <MyAlert setShowAlert={setShowUserExistAlert} showAlert={showUserExistAlert} title={"Ошибка"}
                     text={"Данный пользователь уже существует"}/>
            <UnknownError setShowAlert={setShowUnknownError} showAlert={showUnknownError}/>
            <MyForm list={[
                <h2 style={{fontSize: "40px", margin: "0 0 20px 0"}} key="h2">Регистрация</h2>,
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
                        value={password}
                        onChange={e => {setPassword(e.target.value)}}
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
                    />
                </FormControl>,
                <FormControl sx={{ m: 1, width: "80%" }} variant="outlined" key="confirm-password-form">
                    <InputLabel htmlFor="outlined-adornment-password">Повторите пароль</InputLabel>
                    <OutlinedInput
                        id="outlined-password-input"
                        type="password"
                        label="Повторите пароль"
                        value={repeatedPassword}
                        onChange={e => {setRepeatedPassword(e.target.value)}}
                    />
                </FormControl>,
                <Button variant="outlined" style={{marginTop: "25px", width: "50%"}} onClick={registerUser} key="reg-button">Зарегистрироваться</Button>,
                <Button variant="text" onClick={redirectToLogin} style={{marginTop: "15px", marginBottom: "0"}} key="redir-button">Войти</Button>]}
                authForm={true}
                style={{paddingBottom: "15px"}}/>
        </div>
    );
};

export default Registration;