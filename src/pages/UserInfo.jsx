import React from 'react';
import {Navigate} from "react-router-dom";
import {isNotAuthed} from "../services/AuthService"

const UserInfo = () => {
    if (isNotAuthed()) return <Navigate to="/"/>

    return (
        <div>
            <h1 style={{fontSize: "100px"}}>Welcome!</h1>
        </div>
    );
};

export default UserInfo;