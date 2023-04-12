import React from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import MyForm from "../components/UI/form/MyForm";
import {Link, useNavigate} from "react-router-dom";
import {getTokenAsync} from "../jwt.js"
function Login() {

    let email = '', password = '', tokenKey;
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
        <div style={{textAlign: "center", verticalAlign: "center", alignContent: "center"}}>
            <h1 style={{fontSize: "100px", marginTop: "170px", marginBottom: "0px", color: "black", outlineWidth: "100px solid #666"}}>БГУИР</h1>
            <h2 style={{margin: "0px", color: "black", fontSize: "30px"}}>Приемная кампания</h2>
            <MyForm list={[
                <MyInput type="text" title="Логин" passValue={setEmail} placeholder="Адрес эл.почты" key={1}/>,
                <MyInput type="password" title="Пароль" passValue={setPassword} placeholder="Пароль" key={2}/>,
                <MyButton onClick={login} value="Войти" style={{width: "40%"}} key={3}></MyButton>,
                <Link to="/registration" style={{cursor: "pointer", color: "darkmagenta", textDecoration: "none"}} key={4}>Нет аккаунта? Зарегистрироваться</Link>
            ]} style={{border: "4px solid", borderRadius: "10px",
                paddingBottom: "50px", width: "40%", marginLeft: "30%", marginTop: "50px"}}>
            </MyForm>
        </div>
    );
}

export default Login;