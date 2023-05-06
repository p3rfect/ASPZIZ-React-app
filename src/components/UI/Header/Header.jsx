import React from 'react';
import classes from './Header.module.css'
import Button from '@mui/material/Button';
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../../../features/user/userSlice"

const Header = () => {
    const route = useNavigate()
    const page = useLocation().pathname
    const dispatch = useDispatch()

    const handleRedirect = (e) => {
        if (page !== "/" + e){
            route("/" + e)
        }
    }

    const handleLogout = () => {
        dispatch(logout())
        route("/")
    }

    return (
        <div className={classes.Header}>
            <h1 className={classes.Name}>БГУИР</h1>
            <Button style={{padding: "0 30px 0 30px"}} onClick={() => handleRedirect("info")}>Личная информация</Button>
            <Button style={{padding: "0 30px 0 30px"}} onClick={() => handleRedirect("exams")}>Экзамены</Button>
            <Button style={{padding: "0 30px 0 30px"}} onClick={() => handleRedirect("applic")}>Основное заявление</Button>
            <Button style={{marginLeft: "auto", padding: "0 30px 0 30px"}} onClick={handleLogout}>Выйти</Button>
        </div>
    );
};

export default Header;