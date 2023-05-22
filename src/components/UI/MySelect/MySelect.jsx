import React from 'react';
import classes from "./MySelect.module.css";
import {FormControl, FormHelperText, InputLabel, MenuItem} from "@mui/material";
import Select from "@mui/material/Select";

const MySelect = ({options, label, value, handleChange}) => {
    return (
        <FormControl className={classes.MySelect}>
            <InputLabel id={`select-label`} value={label}>{label}</InputLabel>
            <Select
                labelId={`select-label`}
                name={'select'}
                value={value}
                onChange={handleChange !== undefined ? (e => handleChange(e)) : null}
                label={label}
            >
                {options.map((option, index) => (
                    <MenuItem key={`select-option${index}`} value={option}>{option}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default MySelect;