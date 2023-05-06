import React from 'react';
import classes from './Header.module.css'
import Button from '@mui/material/Button';
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../../../features/user/userSlice"
import AppBar from "@mui/material/AppBar";
import {CssBaseline, Typography, useScrollTrigger} from "@mui/material";
import {Slide} from "@mui/material";
import PropTypes from 'prop-types';

const HideOnScroll = (props) => {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

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
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll>
                <AppBar style={{borderRadius: "10px", backgroundColor: "white", display: "flex", flexDirection: "row"}}>
                    <Typography variant="h6" className={classes.Name}>БГУИР</Typography>
                    <Button style={{padding: "0 30px 0 30px"}} onClick={() => handleRedirect("info")}>Личная информация</Button>
                    <Button style={{padding: "0 30px 0 30px"}} onClick={() => handleRedirect("exams")}>Экзамены</Button>
                    <Button style={{padding: "0 30px 0 30px"}} onClick={() => handleRedirect("applic")}>Основное заявление</Button>
                    <Button style={{marginLeft: "auto", padding: "0 30px 0 30px"}} onClick={handleLogout}>Выйти</Button>
                </AppBar>
            </HideOnScroll>
        </React.Fragment>
    );
};

export default Header;