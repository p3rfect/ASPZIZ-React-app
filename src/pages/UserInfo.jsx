import React from 'react';
import {Navigate} from "react-router-dom";

const UserInfo = () => {
    if (sessionStorage.getItem("tokenKey") === null){
        return <Navigate to="/"/>
    }

    return (
        <div>
            <h1 style={{fontSize: "100px"}}>Welcome!</h1>
        </div>
    );
};

export default UserInfo;