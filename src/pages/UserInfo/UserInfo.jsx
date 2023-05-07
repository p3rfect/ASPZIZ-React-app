import React from 'react';
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Header from '../../components/UI/Header/Header'

const UserInfo = () => {
    const auth = useSelector((state) => state.user.isAuth)
    if (!auth) return <Navigate to="/"/>

    return (
        <div>
            <Header page="info"/>
            {/*    next element should be with marginTop: "60px" because of the positioning of the header element*/}
        </div>
    );
};

export default UserInfo;