import React from 'react';
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const UserInfo = () => {
    const route = useNavigate()
    useEffect( () => {
    if (sessionStorage.getItem("tokenKey") === null){
        route("/")
    }
    })

    return (
        <div>
            <h1 style={{fontSize: "100px"}}>Welcome!</h1>
        </div>
    );
};

export default UserInfo;