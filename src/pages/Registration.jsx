import React from 'react';
import MyForm from "../components/UI/formWithPic/MyForm";
import {useNavigate} from "react-router-dom";
import {register} from "../services/AuthService";
import {FormControl, InputLabel, OutlinedInput} from "@mui/material";
import {useState} from "react";
import Button from "@mui/material/Button";
import MyAlert from "../components/UI/MyAlert/MyAlert";
import UnknownError from "../components/UI/UnknownError/UnknownError";

const Registration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatedPassword, setRepeatedPassword] = useState('')
    const route = useNavigate()
    const [showPasswordAlert, setShowPasswordAlert] = useState(false)
    const [showUserExistAlert, setShowUserExistAlert] = useState(false)
    const [showUnknownError, setShowUnknownError] = useState(false)

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

    const redirectToLogin = () => {
        route("/")
    }

    return (
        <div style={{textAlign: "center", alignContent: "center"}}>
            <h1 style={{fontSize: "100px", marginBottom: "0px"}}>БГУИР</h1>
            <MyAlert setShowAlert={setShowPasswordAlert} showAlert={showPasswordAlert} title={"Ошибка"}
                     text={"Введенные пароли не совпадают"}/>
            <MyAlert setShowAlert={setShowUserExistAlert} showAlert={showUserExistAlert} title={"Ошибка"}
                     text={"Данный пользователь уже существует"}/>
            <UnknownError setShowAlert={setShowUnknownError} showAlert={showUnknownError}/>
            <MyForm list={[
                <h2 style={{fontSize: "40px", margin: "0 0 20px 0"}}>Регистрация</h2>,
                <FormControl sx={{ m: 1, width: "80%" }} variant="outlined">
                    <InputLabel htmlFor="outlined-email">Адрес эл. почты</InputLabel>
                    <OutlinedInput
                        id="outlined-login-input"
                        label="Адрес эл. почты"
                        value={email}
                        onChange={e => {setEmail(e.target.value)}}
                    />
                </FormControl>,
                <FormControl sx={{ m: 1, width: "80%" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
                    <OutlinedInput
                        id="outlined-password-input"
                        type="password"
                        label="Пароль"
                        value={password}
                        onChange={e => {setPassword(e.target.value)}}
                    />
                </FormControl>,
                <FormControl sx={{ m: 1, width: "80%" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Повторите пароль</InputLabel>
                    <OutlinedInput
                        id="outlined-password-input"
                        type="password"
                        label="Повторите пароль"
                        value={repeatedPassword}
                        onChange={e => {setRepeatedPassword(e.target.value)}}
                    />
                </FormControl>,
                <Button variant="outlined" style={{marginTop: "25px", width: "50%"}} onClick={registerUser}>Зарегистрироваться</Button>,
                <Button variant="text" onClick={redirectToLogin} style={{marginTop: "15px", marginBottom: "0"}}>Войти</Button>]}
                authForm={true}
                style={{paddingBottom: "15px"}}/>
        </div>
    );
};

export default Registration;