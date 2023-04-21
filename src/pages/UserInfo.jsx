import React from 'react';
import {Navigate} from "react-router-dom";
import {isNotAuthed} from "../services/AuthService"
import TextField from '@mui/material/TextField';

const UserInfo = () => {
    if (isNotAuthed()) return <Navigate to="/"/>

    return (
        <div>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            <TextField id="filled-basic" label="Filled" variant="filled" />
            <TextField id="standard-basic" label="Standard" variant="standard" />
        </div>
    );
};

export default UserInfo;