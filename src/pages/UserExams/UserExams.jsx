import React, {useEffect, useState} from 'react';
import Header from "../../components/UI/Header/Header";
import {FormControl, InputLabel, MenuItem, TextField, Typography, Button, FormHelperText} from "@mui/material";
import Select from "@mui/material/Select";
import classes from './UserExams.module.css'
import SendIcon from '@mui/icons-material/Send';

const UserExams = () => {
    const examsTypes = ['ЦТ', 'Олимпиада']
    const examsNames = ['Физика', 'Математика', 'Русский', 'Белорусский', 'Английский']
    const [exams, setExams] = useState([
        {id: 1, name: '', type: '', points: '', schoolPoints: ''},
        {id: 2, name: '', type: '', points: '', schoolPoints: ''},
        {id: 3, name: '', type: '', points: '', schoolPoints: ''},
    ])
    const examsTypesElements = examsTypes.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)
    const examsNamesElements = examsNames.map(name => <MenuItem key={name} value={name}>{name}</MenuItem>)

    useEffect(() => {
        const newExams = exams.map((exam) => {
            if (exam.type === 'Олимпиада') exam.points = '100'
            return exam
        })
        setExams([...newExams])
    }, [exams])

    return (
        <div className={classes.Container}>
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
                            error={/\D/.test(exams[index].schoolPoints) || Number(exams[index].schoolPoints) < 0 || Number(exams[index].schoolPoints) > 100}
                            helperText={/\D/.test(exams[index].schoolPoints) || Number(exams[index].schoolPoints) < 0 || Number(exams[index].schoolPoints) > 100 ?
                                "Балл должен быть числом от 0 до 100" : " "}
                        />
                    </div>
                )}
            </div>
            <Button className={classes.SubmitButton} variant="outlined" endIcon={<SendIcon/>}>Сохранить</Button>
        </div>
    );
};

export default UserExams;