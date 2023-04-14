import React, {useState} from 'react';
import classes from './MyInput.module.css'
const MyInput = ({title, passValue, type, ...props}) => {
    const [val, setVal] = useState('');
    const [pass, setPass] = useState(type);

    const setValue = (val) => {
        passValue(val)
        setVal(val)
    }
    const [toggled, setToggled] = useState(false)

    const toggle = () => {
        if (toggled){
            setToggled(false)
            setPass("password")
        }
        else{
            setToggled(true)
            setPass("text")
        }
    }

    return (
        <div className={classes.InputContainer}>
            <h3>{title}</h3>
            <input type={pass} {...props} className={classes.MyInpt} value={val} onChange={e => setValue(e.target.value)}/>
            {type === "password"
                ?  (toggled
                    ? <a href="#" className={classes.PasswordControl + ' ' + classes.view} onClick={toggle}></a>
                    : <a href="#" className={classes.PasswordControl} onClick={toggle}></a>)
                : null
            }
        </div>
    );
};

export default MyInput;