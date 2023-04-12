import React, {useState} from 'react';
import classes from './MyInput.module.css'
const MyInput = ({title, passValue, type, ...props}) => {
    const [val, setVal] = useState('');
    const [pass, setPass] = useState(type);

    const setValue = ({val}) => {
        passValue(val)
        setVal(val)
    }
    const [toggled, setToggled] = useState(false)

    const toggle = () => {
        if (toggled){
            setToggled(false)
            setPass("text")
        }
        else{
            setToggled(true)
            setPass("password")
        }
    }

    return (
        <div style={{marginTop: "30px", marginBottom: "0px"}}>
            <h3 style={{fontSize: '30px', paddingBottom: "10px", margin: 0}}>{title}</h3>
            <input type={pass} {...props} className={classes.MyInpt} value={val} onChange={setValue}/>
            {type === "password"
                ?  <a href="#" className={classes.PasswordControl} onClick={toggle}></a>
                : null
            }
        </div>
    );
};

export default MyInput;