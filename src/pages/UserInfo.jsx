import React from 'react';
import {Navigate} from "react-router-dom";
import {isNotAuthed} from "../services/AuthService"
import {test} from '../services/AuthService.js';

const UserInfo = () => {
    if (isNotAuthed()) return <Navigate to="/"/>

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