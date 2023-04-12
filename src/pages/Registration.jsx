import React from 'react';
import MyForm from "../components/UI/form/MyForm";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {Link, useNavigate} from "react-router-dom";
import {getTokenAsync} from "../jwt";

const Registration = () => {
    let email = '', password = '';
    const route = useNavigate()

    const register = async () => {
        try {
            const formData = new FormData();
            formData.append("grant_type", "password");
            formData.append("email", email);
            formData.append("password", password);

            const response = await fetch("https://localhost:44387/register", {
                method: "POST",
                headers: {"Accept": "application/json"},
                body: formData,
                mode: "cors"
            });
            const data = await response.json()

            if (response.ok) {
                await getTokenAsync(email, password)
                route("/info")
            } else {
                throw new Error("Error: " + response.status + data.errorText)
            }
        } catch (e){
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
            <h1 style={{fontSize: "100px", marginTop: "170px", marginBottom: "0px", color: "black", outlineWidth: "100px solid #666"}}>РЕГИСТРАЦИЯ</h1>
            <MyForm list={[
                <MyInput type="text" title="Логин" passValue={setEmail} placeholder="Адрес эл.почты" key={1}/>,
                <MyInput type="password" title="Пароль" passValue={setPassword} placeholder="Пароль" key={2}/>,
                <MyButton onClick={register} value="Зарегистрироваться" style={{width: "40%"}} key={3}></MyButton>,
                <Link to="/" style={{cursor: "pointer", color: "darkmagenta", textDecoration: "none"}} key={4}>Уже есть аккаунт? Войти</Link>
            ]} style={{border: "4px solid", borderRadius: "10px",
                paddingBottom: "50px", width: "40%", marginLeft: "30%", marginTop: "50px"}}>
            </MyForm>
        </div>
    );
};

export default Registration;