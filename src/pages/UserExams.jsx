import React from 'react';
import Header from "../components/UI/Header/Header";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const UserExams = () => {
    const auth = useSelector((state) => state.user.isAuth)
    if (!auth) return <Navigate to="/"/>

    return (
        <div>
            <Header page="exams"/>
            {/*    next element should be with marginTop: "60px" because of the positioning of the header element*/}
        </div>
    );
};

export default UserExams;