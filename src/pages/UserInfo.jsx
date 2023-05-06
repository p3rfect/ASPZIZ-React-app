import React from 'react';
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Header from '../components/UI/Header/Header'

const UserInfo = () => {
    const auth = useSelector((state) => state.user.isAuth)
    if (!auth) return <Navigate to="/"/>

    return (
        <div>
            <Header page="info"/>
        </div>
    );
};

export default UserInfo;