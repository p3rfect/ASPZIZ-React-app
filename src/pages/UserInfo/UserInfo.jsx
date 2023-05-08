import React from 'react';
import Header from '../../components/UI/Header/Header'
import Button from "@mui/material/Button";

const UserInfo = () => {
    const handleClick = async () => {
        console.log(await test('Nikita'))
    }

    return (
        <div>
            <Header page="info"/>
            {/*    next element should be with marginTop: "60px" because of the positioning of the header element*/}
            
            <Button onClick={handleClick} style={{marginTop: "100px"}}>Asdasdasda</Button>
        </div>
    );
};

export default UserInfo;