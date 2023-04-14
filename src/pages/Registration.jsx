import React from 'react';
import MyForm from "../components/UI/form/MyForm";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {Link, useNavigate} from "react-router-dom";
import {register} from "../services/AuthService";

const Registration = () => {
    let email = '', password = '';
    const route = useNavigate()

    const registerUser = async () => {
        try{
            await register(email, password);
            route("/submitting")
        } catch (e){
            throw new Error(e)
        }
    }

    const setEmail = function(newValue){
        email = newValue
    }
    const setPassword = function(newValue){
        password = newValue
    }

    return (
        <div style={{textAlign: "center", verticalAlign: "center", alignContent: "center"}}>
            <h1 style={{fontSize: "100px", marginBottom: "0px"}}>БГУИР</h1>
            <MyForm list={[
                <h1>РЕГИСТРАЦИЯ</h1>,
                <MyInput type="text" title="Логин" passValue={setEmail} placeholder="Адрес эл.почты" key={1}/>,
                <MyInput type="password" title="Пароль" passValue={setPassword} placeholder="Пароль" key={2}/>,
                <MyButton onClick={registerUser} value="Зарегистрироваться" key={3}></MyButton>,
                <Link to="/" style={{cursor: "pointer", color: "darkmagenta", textDecoration: "none"}} key={4}>Уже есть аккаунт? Войти</Link>
            ]} loginForm={true}>
            </MyForm>
        </div>
    );
};

export default Registration;