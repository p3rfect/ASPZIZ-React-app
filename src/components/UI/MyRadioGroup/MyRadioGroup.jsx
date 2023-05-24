import React from 'react';
import {FormControl, FormLabel, Radio, RadioGroup} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import classes from "./MyRadioGroup.module.css"

const MyRadioGroup = ({id, options, label, value, handleChange}) => {
    return (
        <FormControl className={classes.MyRadioGroup} id={id}>
            <FormLabel id="radio-group-label" className={classes.Label}>{label}</FormLabel>
            <RadioGroup
                aria-labelledby="radio-group-label"
                value={value}
                onChange={e => handleChange(e)}
                className={classes.RadioGroup}
                id={id}
                name={id}
            >
                {options.map((option, index) => (
                    <FormControlLabel control={<Radio/>} label={option} value={option} key={`radio-group-element${index}`}/>
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default MyRadioGroup;