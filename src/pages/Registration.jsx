import React, {useEffect} from 'react';
import MyForm from "../components/UI/formWithPic/MyForm";
import {useNavigate} from "react-router-dom";
import {register} from "../services/AuthService";
import {FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {useState} from "react";
import Button from "@mui/material/Button";
import MyAlert from "../components/UI/MyAlert/MyAlert";
import UnknownError from "../components/UI/UnknownError/UnknownError";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import * as yup from "yup";
import {useFormik} from "formik";

const validationSchema = yup.object({
    email: yup
        .string('Введите адрес эл. почты')
        .email('Введите действительный адрес эл. почты')
        .required('Адрес эл. почты обязателен'),
    password: yup
        .string('Введите пароль')
        .min(8, 'Пароль должен содержать минимум 8 символов')
        .required('Пароль обязателен'),
    repeatedPassword: yup
        .string('Повторите пароль')
})

const Registration = () => {
    const route = useNavigate()
    const [showPasswordAlert, setShowPasswordAlert] = useState(false)
    const [showUserExistAlert, setShowUserExistAlert] = useState(false)
    const [showUnknownError, setShowUnknownError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repeatedPassword: ''
        },
        validationSchema: validationSchema,
        validate: (values) => {
            const errors = {}
            if (!/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i.test(values.email)) {
                errors.email = 'Введите действительный адрес эл. почты';
            }
            if (values.password.length >= 8 && /[^\w_*+!]/.test(values.password)) {
                errors.password = 'Пароль может содержать только строчные и заглавные латинские буквы, цифры и спец. символы (_*+!)'
            }
            if (values.password !== values.repeatedPassword){
                errors.repeatedPassword = 'Пароли не совпадают'
            }
            return errors
        },
        onSubmit: async (values) => {
            try {
                await registerUser(values.email, values.password)
            } catch (e) {
                console.log(e)
            }
        }
    })

    const registerUser = async (email, password) => {
        try {
            await register(email, password);
            route("/submitting")
        } catch (e) {
            if (e.message === "User is already exist") {
                setShowUserExistAlert(true)
            } else {
                setShowUnknownError(true)
            }
        }
    }

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
                    <InputLabel htmlFor="outlined-email" style={formik.touched.email && formik.errors.email ? {color: "red"} : {}}>
                        Адрес эл. почты
                    </InputLabel>
                    <OutlinedInput
                        id="email"
                        label="Адрес эл. почты"
                        value={formik.values.email}
                        onChange={e => formik.handleChange(e)}
                        error={formik.touched.email && formik.errors.email}
                    />
                    <FormHelperText style={{color: "red"}}>
                        {formik.touched.email && formik.errors.email}
                    </FormHelperText>
                </FormControl>,
                <FormControl sx={{ m: 1, width: "80%" }} variant="outlined" key="password-form">
                    <InputLabel htmlFor="outlined-adornment-password"
                                style={formik.touched.password && formik.errors.password ? {color: "red"} : {}}>
                        Пароль
                    </InputLabel>
                    <OutlinedInput
                        id="password"
                        type={showPassword ? "text" : "password"}
                        label="Пароль"
                        value={formik.values.password}
                        onChange={e => formik.handleChange(e)}
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
                        error={formik.touched.password && formik.errors.password}
                    />
                    <FormHelperText style={{color: "red"}}>
                        {formik.touched.password && formik.errors.password}
                    </FormHelperText>
                </FormControl>,
                <FormControl sx={{ m: 1, width: "80%" }} variant="outlined" key="confirm-password-form">
                    <InputLabel htmlFor="outlined-adornment-password"
                                style={formik.touched.repeatedPassword && formik.errors.repeatedPassword ? {color: "red"} : {}}>
                        Повторите пароль
                    </InputLabel>
                    <OutlinedInput
                        id="repeatedPassword"
                        type="password"
                        label="Повторите пароль"
                        value={formik.values.repeatedPassword}
                        onChange={e => formik.handleChange(e)}
                        error={formik.touched.repeatedPassword && formik.errors.repeatedPassword}
                    />
                    <FormHelperText style={{color: "red"}}>{formik.touched.repeatedPassword && formik.errors.repeatedPassword}</FormHelperText>
                </FormControl>,
                <Button variant="outlined" style={{marginTop: "25px", width: "50%"}} type="submit" key="reg-button">Зарегистрироваться</Button>,
                <Button variant="text" onClick={redirectToLogin} style={{marginTop: "15px", marginBottom: "0"}} key="redir-button">Войти</Button>]}
                authForm={true}
                style={{paddingBottom: "15px"}}/>
        </div>
    );
};

export default Registration;