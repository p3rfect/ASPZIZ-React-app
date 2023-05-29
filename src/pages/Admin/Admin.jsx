import React, {useState} from 'react';
import {FormControl, InputLabel, OutlinedInput} from "@mui/material";
import Button from "@mui/material/Button";
import {useSelector} from "react-redux";
import {acceptUser, confirmUserEmail, Enroll, getAdminUser} from "../../services/AdminService";
import Info from "../../components/Info/Info";
import Exams from "../../components/Exams/Exams";
import Specialities from "../../components/Specialities/Specialities";
import UnknownError from "../../components/UI/UnknownError/UnknownError";

const Admin = () => {
    const [emailSearch, setEmailSearch] = useState('')
    const [found, setFound] = useState(false)
    const role = useSelector((state) => state.user.role)
    const [examsFilled, setExamsFilled] = useState(false)

    const handleSearch = async () => {
        try {
            await getAdminUser(emailSearch)
            await setFound(true)
        } catch (e) {
            console.log(e)
            setShowUnknownAlert(true)
        }
    }



    const handleEnrollment = async () => {
        Enroll()
    }

    const handleAccept = async () => {
        try{
            await acceptUser(emailSearch)
        } catch (e) {
            setShowUnknownAlert(true)
        }
    }

    const handleConfirmEmail = async () => {
        await confirmUserEmail(emailSearch)
    }

    const [showUnknownAlert, setShowUnknownAlert] = useState(false)

    return (
        <div>
            <FormControl sx={{ m: 1, width: "80%" }} variant="outlined" key="email-form">
                <InputLabel htmlFor="outlined-email">Адрес эл. почты</InputLabel>
                <OutlinedInput
                    id="email"
                    label="Адрес эл. почты пользователя"
                    value={emailSearch}
                    onChange={e => setEmailSearch(e.target.value)}
                />
            </FormControl>
            <Button onClick={handleSearch}>Найти</Button>
            <UnknownError showAlert={showUnknownAlert} setShowAlert={setShowUnknownAlert}/>
            {role === 'admin' ? <Button onClick={handleEnrollment}>Провести зачисление</Button> : null}
            {!found ? null :
                    <div>
                        {role === 'trustee' ? <Button onClick={handleAccept}>Принять документы</Button> : null}
                        <Button onClick={handleConfirmEmail}>Подтвердить почту</Button>
                        <Info emailSearch={emailSearch}/>
                        <Exams filled={examsFilled} setFilled={setExamsFilled} emailSearch={emailSearch}/>
                        {examsFilled ? <Specialities emailSearch={emailSearch}/> : null}
                    </div>
            }
        </div>
    );
};

export default Admin;