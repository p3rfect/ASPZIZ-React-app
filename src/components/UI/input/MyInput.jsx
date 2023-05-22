import React, {useState} from 'react';
import classes from './MyInput.module.css'
import TextField from "@mui/material/TextField";
import {Popover} from "@mui/material";
import {Typography} from "@mui/material";

const MyInput = ({id, label, disabled, handleChange, helperText, error}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div className={classes.Container}>
            <TextField
                label={label}
                disabled={disabled}
                onBlur={e => handleChange(e)}
                helperText={error ? error : ''}
                error={error !== undefined && error !== ''}
                className={classes.MyInput}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                id={id}
            />
            {helperText ?
                <Popover
                    id="mouse-over-popover"
                    sx={{
                        pointerEvents: 'none',
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                >
                    <Typography sx={{ p: 1 }}>{helperText}</Typography>
                </Popover>
                : null}
        </div>
    );
};

export default React.memo(MyInput);