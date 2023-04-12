import React, {useState} from 'react';
import classes from './MyInput.module.css'
const MyInput = ({title, passValue, props}) => {
    const [val, setVal] = useState('');

    const setValue = ({val}) => {
        passValue(val)
        setVal(val)
    }

    return (
        <div style={{marginTop: "50px"}}>
            <h3 style={{fontSize: '20px', padding: 0, margin: 0}}>{title}</h3>
            <input {...props} className={classes.MyInpt} value={val} onChange={e => setValue({val: e.target.value})}/>
        </div>
    );
};

export default MyInput;