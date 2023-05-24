import React, {useEffect, useState} from 'react';
import MyForm from "../../components/UI/formWithPic/MyForm";
import {useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import {VisibilityOff, Visibility} from "@mui/icons-material";
import {InputAdornment, FormControl, InputLabel, OutlinedInput, FormHelperText} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import UnknownError from "../../components/UI/UnknownError/UnknownError";
import MyAlert from "../../components/UI/MyAlert/MyAlert";
import {setUser} from '../../features/user/userSlice.js'
import {useDispatch} from "react-redux";
import {login as LoginRequest} from '../../services/AuthService.js';
import {useFormik} from "formik";
import * as yup from 'yup';
import classes from './Login.module.css'

const validationSchema = yup.object({
    email: yup
        .string('Введите адрес эл. почты')
        .email('Введите действительный адрес эл. почты')
        .required('Адрес эл. почты обязателен'),
    password: yup
        .string('Введите пароль')
        .min(8, 'Пароль должен содержать минимум 8 символов')
        .required('Пароль обязателен')
})

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const route = useNavigate()
    const [showUnknownError, setShowUnknownError] = useState(false)
    const [showNotFoundError, setShowNotFoundError] = useState(false)
    const dispatch = useDispatch()
    const login = async (email, password) => {
        try{
            const response = await LoginRequest(email, password)
            dispatch(setUser({email: email, role: response.data.role}))
            if (response.data.role === 'user') route("/info")
            else route("/admin")
        } catch(e){
            if (e.message === "Invalid user name or password"){
                setShowNotFoundError(true)
            } else{
                setShowUnknownError(true)
            }
        }
    }

    const formik = useFormik({
        initialValues:{
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        validate: (values) => {
            const errors = {}
            if (!/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i.test(values.email)) {
                errors.email = 'Введите действительный адрес эл. почты';
            }
            if (values.password.length >= 8 && /[^\w_*+!]/.test(values.password)){
                errors.password = 'Пароль может содержать только строчные и заглавные латинские буквы, цифры и спец. символы (_*+!)'
            }
            return errors
        },
        onSubmit: async (values) => {
            try {
                await login(values.email, values.password)
            } catch (e) {
                console.log(e)
            }
        }
    })

    useEffect(() => {
        const listener = async event => {
            if (event.code === "Enter" || event.code === "NumpadEnter"){
                event.preventDefault()
                await formik.handleSubmit()
            }
        }
        document.addEventListener("keydown", listener)
        return () => {
            document.removeEventListener("keydown", listener)
        }
    }, [formik])

    const redirectToReg = () => {
        route("/registration")
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className={classes.Container}>
            <h1 className={classes.UniName}>БГУИР</h1>
            <UnknownError showAlert={showUnknownError} setShowAlert={setShowUnknownError}/>
            <MyAlert showAlert={showNotFoundError} setShowAlert={setShowNotFoundError} title="Ошибка"
                     text = "Неверные адрес эл. почты или пароль"/>
            <MyForm list={[
                <h2 className={classes.FormName} key="h2">Вход</h2>,
                <FormControl sx={{ m: 1, width: "80%" }} variant="outlined" key="email-form">
                    <InputLabel htmlFor="outlined-email" style={formik.touched.email && formik.errors.email ? {color: "red"} : {}}>Адрес эл. почты</InputLabel>
                    <OutlinedInput
                        id="email"
                        label="Адрес эл. почты"
                        value={formik.values.email}
                        onChange={e => formik.handleChange(e)}
                        error={formik.touched.email && formik.errors.email}
                    />
                    <FormHelperText style={{color: "red"}}>{formik.touched.email && formik.errors.email}</FormHelperText>
                </FormControl>,
                <FormControl className={classes.FormControl} variant="outlined" key="password-form">
                    <InputLabel htmlFor="outlined-adornment-password" style={formik.touched.password && formik.errors.password ? {color: "red"} : {}}>Пароль</InputLabel>
                    <OutlinedInput
                        id="password"
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
                        value={formik.values.password}
                        onChange={e => formik.handleChange(e)}
                        error={formik.touched.password && formik.errors.password}
                    />
                    <FormHelperText style={{color: "red"}}>{formik.touched.password && formik.errors.password}</FormHelperText>
                </FormControl>,
                <Button variant="outlined" className={classes.SubmitButton} onClick={formik.handleSubmit} type="submit" key="login-button">Войти</Button>,
                <Button variant="text" onClick={redirectToReg} className={classes.RedirButton} key="redir-button">Зарегистрироваться</Button>]}
                authForm={true}
                style={{paddingBottom: "15px"}}
                handleSubmit={formik.handleSubmit}/>
        </div>
    );
}

export default Login;