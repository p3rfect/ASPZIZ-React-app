import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import classes from "./MyDatePicker.module.css";

const MyDatePicker = ({label}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label={label} className={classes.MyDatePicker}/>
        </LocalizationProvider>
    );
};

export default MyDatePicker;