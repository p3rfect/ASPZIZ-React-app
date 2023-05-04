import React from 'react';
import {Navigate} from "react-router-dom";
import {test} from '../services/AuthService.js';
import {useDispatch} from "react-redux";
import {getIsAuth} from "../features/user/userSlice";

const UserInfo = () => {
    const dispatch = useDispatch()
    if (!dispatch(getIsAuth())) return <Navigate to="/"/>

    const testb = () => {
        test("Nikita");
    }

    return (
        <div>
            <a onClick={testb}>asdasdasda</a>
        </div>
    );
};

export default UserInfo;