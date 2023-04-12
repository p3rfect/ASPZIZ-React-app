import React from 'react';
import classes from "./MyButton.module.css";
const MyButton = ({onClick, value, ...props}) => {
    return (
        <div>
            <button onClick={onClick} {...props} className={classes.MyBtn}>{value}</button>
        </div>
    );
};

export default MyButton;