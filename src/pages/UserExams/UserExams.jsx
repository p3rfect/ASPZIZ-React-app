import React, {useEffect, useState} from 'react';
import Header from "../../components/UI/Header/Header";
import {FormControl, InputLabel, MenuItem, TextField, Typography, Button, FormHelperText} from "@mui/material";
import Select from "@mui/material/Select";
import classes from './UserExams.module.css'
import SendIcon from '@mui/icons-material/Send';
import MyAlert from "../../components/UI/MyAlert/MyAlert";
import {getUserExams, postUserExams} from "../../services/UserService";
import UnknownError from "../../components/UI/UnknownError/UnknownError";
import {useSelector} from "react-redux";

const UserExams = () => {
    const examsTypes = ['ЦТ', 'ЕГЭ', 'Олимпиада']
    const examsNames = ['Физика', 'Математика', 'Русский язык', 'Белорусский язык', 'Английский язык']
    const email = useSelector((state) => state.user.email)
    const [exams, setExams] = useState([
        {id: 1, name: '', type: '', points: '', schoolPoints: ''},
        {id: 2, name: '', type: '', points: '', schoolPoints: ''},
        {id: 3, name: '', type: '', points: '', schoolPoints: ''}
    ])
    const examsTypesElements = examsTypes.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)
    const examsNamesElements = examsNames.map(name => <MenuItem key={name} value={name}>{name}</MenuItem>)

    useEffect(() => {
        const getExams = async () => {
            try{
                setExams([...(await getUserExams(email))])
            } catch (e) {
                console.log(e)
                setShowUnknownError(true)
            }
        }
        getExams()
    }, [])

    useEffect(() => {
        const newExams = exams.map((exam) => {
            if (exam.type === 'Олимпиада') exam.points = '100'
            return exam
        })
        setExams([...newExams])
    }, [exams])

    const validateExams = () => {
        if (exams.filter(exam =>
            (exam.type === '' || exam.name === '' || exam.points === '' || exam.schoolPoints === '')).length > 0){
            setShowNotFullfilledAlert(true)
            return false
        }
        if (exams.filter(exam =>
            (/\D/.test(exam.points) || Number(exam.points) < 0 || Number(exam.points) > 100 ||
                /\D/.test(exam.schoolPoints) || Number(exam.schoolPoints) < 0 || Number(exam.schoolPoints) > 10)
        ).length > 0){
            setShowFillingError(true)
            return false
        }
        let isRepeated = false
        exams.forEach((exam1, index1) => {
            exams.forEach((exam2, index2) => {
                if (index1 !== index2 && exam1.name === exam2.name) isRepeated = true
            })
        })
        if (isRepeated){
            setShowRepeatAlert(true)
            return false;
        }
        let rusFound = false, secondFound = false, mathFound = false, belFound = false
        exams.forEach(exam => {
            if (exam.name === 'Русский язык') rusFound = true
            if (exam.name === 'Белорусский язык') belFound = true
            if (exam.name === 'Физика' || exam.name === 'Английский язык') secondFound = true
            if (exam.name === 'Математика') mathFound = true
        })
        if (!((rusFound || belFound) && mathFound && secondFound)){
            setShowProfileAlert(true)
            return false
        }
        return true
    }

    const handleSubmit = async () => {
        try {
            if (validateExams()) {
                await postUserExams(exams, email)
                setShowSuccessAlert(true)
            }
        } catch (e) {
            console.log(e)
            setShowUnknownError(true)
        }
    }

    const [showNotFullfilledAlert, setShowNotFullfilledAlert] = useState(false)
    const [showProfileAlert, setShowProfileAlert] = useState(false)
    const [showUnknownError, setShowUnknownError] = useState(false)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [showRepeatAlert, setShowRepeatAlert] = useState(false)
    const [showFillingError, setShowFillingError] = useState(false)

    return (
        <div className={classes.Container}>
            <MyAlert showAlert={showNotFullfilledAlert} setShowAlert={setShowNotFullfilledAlert} title={'Ошибка'}
                     text={'Пожалуйста, перед отправкой заполните форму целиком.'}/>
            <MyAlert showAlert={showProfileAlert} setShowAlert={setShowProfileAlert} title={'Ошибка'}
                     text={'Такого профиля не существует!'}/>
            <MyAlert showAlert={showSuccessAlert} setShowAlert={setShowSuccessAlert} title={'Успех'}
                     text={'Успешно сохранено'}/>
            <MyAlert showAlert={showRepeatAlert} setShowAlert={setShowRepeatAlert} title={'Ошибка'}
                     text={'Вы ввели два одинаковых экзамена, не делайте так, пожалуйста!'}/>
            <MyAlert showAlert={showFillingError} setShowAlert={setShowFillingError} title={'Ошибка'}
                     text={'Некорректные баллы'}/>
            <UnknownError showAlert={showUnknownError} setShowAlert={setShowUnknownError}></UnknownError>
            <Header page="exams"/>
            {/*    next element should be with marginTop: "60px" because of the positioning of the header element*/}
            <Typography variant="h2" className={classes.Title}>Ввод экзаменов</Typography>
            <div className={classes.ExamsContainer}>
                {exams.map((exam, index) =>
                    <div key={`exam${exam.id}`} className={classes.Exam}>
                        <FormControl className={classes.Field}>
                            <InputLabel id={`exam${exam.id}-type-label`}>Тип экзамена</InputLabel>
                            <Select
                                labelId={`exam${exam.id}-type-label`}
                                id={`exam${exam.id}-type-select`}
                                value={exams[index].type}
                                onChange={e => {exams[index].type = e.target.value; setExams([...exams])}}
                                label="Тип экзамена"
                            >
                                {examsTypesElements}
                            </Select>
                            <FormHelperText> </FormHelperText>
                        </FormControl>
                        <FormControl className={classes.Field}>
                            <InputLabel id={`exam${exam.id}-name-label`}>Предмет</InputLabel>
                            <Select
                                labelId={`exam${exam.id}-name-label`}
                                id={`exam${exam.id}-name-select`}
                                value={exams[index].name}
                                onChange={e => {exams[index].name = e.target.value; setExams([...exams])}}
                                label="Предмет"
                            >
                                {examsNamesElements}
                            </Select>
                            <FormHelperText> </FormHelperText>
                        </FormControl>
                        <TextField
                            className={classes.Field}
                            id={`exam${exam.id}-points`}
                            label="Балл"
                            value={exams[index].points}
                            onChange={e => {exams[index].points = e.target.value; setExams([...exams])}}
                            error={(/\D/.test(exams[index].points) || Number(exams[index].points) < 0 || Number(exams[index].points) > 100) && exams[index].type !== 'Олимпиада'}
                            helperText={(/\D/.test(exams[index].points) || Number(exams[index].points) < 0 || Number(exams[index].points) > 100) && exams[index].type !== 'Олимпиада' ?
                                "Балл должен быть числом от 0 до 100" : " "}
                            disabled={exams[index].type === 'Олимпиада'}
                        />
                        <TextField
                            className={classes.Field}
                            id={`exam${exam.id}-school-points`}
                            label="Балл в аттестате"
                            value={exams[index].schoolPoints}
                            onChange={e => {exams[index].schoolPoints = e.target.value; setExams([...exams])}}
                            error={/\D/.test(exams[index].schoolPoints) || Number(exams[index].schoolPoints) < 0 || Number(exams[index].schoolPoints) > 10}
                            helperText={/\D/.test(exams[index].schoolPoints) || Number(exams[index].schoolPoints) < 0 || Number(exams[index].schoolPoints) > 10 ?
                                "Балл должен быть числом от 0 до 10" : " "}
                        />
                    </div>
                )}
            </div>
            <Button className={classes.SubmitButton} variant="outlined" endIcon={<SendIcon/>} onClick={handleSubmit}>Сохранить</Button>
        </div>
    );
};

export default UserExams;