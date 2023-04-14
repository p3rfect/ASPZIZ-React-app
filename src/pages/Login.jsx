import React from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import MyForm from "../components/UI/form/MyForm";
import {Link, useNavigate} from "react-router-dom";
import {getTokenAsync} from "../jwt.js"
function Login() {

    let email = '', password = '';
    const route = useNavigate()
    const login = async () => {
        try{
            await getTokenAsync(email, password)
            route("/info")
        } catch(e){
            console.log(e);
            route("/error")
        }
    }

    const setEmail = function(newValue){
        email = newValue
    }
    const setPassword = function(newValue){
        password = newValue
    }

    return (
        <div style={{textAlign: "center", alignContent: "center"}}>
            <h1 style={{fontSize: "100px", marginBottom: "0px"}}>БГУИР</h1>
            <h2 style={{margin: "0", fontSize: "30px"}}>Приемная кампания</h2>
            <MyForm list={[
                <h1>АВТОРИЗАЦИЯ</h1>,
                <MyInput type="text" title="Логин" passValue={setEmail} placeholder="Адрес эл.почты" key={1}/>,
                <MyInput type="password" title="Пароль" passValue={setPassword} placeholder="Пароль" key={2}/>,
                <MyButton onClick={login} value="Войти" style={{width: "40%"}} key={3}></MyButton>,
                <Link to="/registration" style={{cursor: "pointer", color: "darkmagenta", textDecoration: "none"}} key={4}>Нет аккаунта? Зарегистрироваться</Link>
            ]}>
            </MyForm>
        </div>
    );
}

export default Login;