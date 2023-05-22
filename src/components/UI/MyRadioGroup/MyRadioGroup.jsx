import React from 'react';
import {FormControl, FormLabel, Radio, RadioGroup} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import classes from "./MyRadioGroup.module.css"

const MyRadioGroup = ({options, label, value, handleChange}) => {
    return (
        <FormControl className={classes.MyRadioGroup}>
            <FormLabel id="radio-group-label" className={classes.Label}>{label}</FormLabel>
            <RadioGroup
                aria-labelledby="radio-group-label"
                value={value}
                onChange={handleChange !== undefined ? (e => handleChange(e)) : null}
                className={classes.RadioGroup}
            >
                {options.map((option, index) => (
                    <FormControlLabel control={<Radio/>} label={option} value={option} key={`radio-group-element${index}`}/>
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default MyRadioGroup;