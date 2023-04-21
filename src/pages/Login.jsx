import React, {useState} from 'react';
import MyForm from "../components/UI/formWithPic/MyForm";
import {useNavigate} from "react-router-dom";
import {getTokenAsync} from "../services/AuthService"
import Button from '@mui/material/Button';
import {VisibilityOff, Visibility} from "@mui/icons-material";
import {InputAdornment, FormControl, InputLabel, OutlinedInput} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import UnknownError from "../components/UI/UnknownError/UnknownError";
import MyAlert from "../components/UI/MyAlert/MyAlert";
function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const route = useNavigate()
    const [showUnknownError, setShowUnknownError] = useState(false)
    const [showNotFoundError, setShowNotFoundError] = useState(false)
    const login = async () => {
        try{
            await getTokenAsync(email, password)
            route("/info")
        } catch(e){
            if (e.message === "Invalid user name or password"){
                setShowNotFoundError(true)
            } else{
                setShowUnknownError(true)
            }
        }
    }

    const redirectToReg = () => {
        route("/registration")
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div style={{textAlign: "center", alignContent: "center"}}>
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