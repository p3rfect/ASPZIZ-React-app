import React, {useEffect, useState} from 'react';
import Header from "../../components/UI/Header/Header";
import {useDispatch} from "react-redux";
import {setSpecialtiesList} from "../../features/specialties/specialitiesSlice";
import {FormControl, InputLabel, MenuItem, Typography, Button} from "@mui/material";
import Select from '@mui/material/Select';
import classes from './UserSpecialities.module.css'
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
// import {getUserExams} from "../../services/UserService";
import MyAlert from "../../components/UI/MyAlert/MyAlert";
import UnknownError from "../../components/UI/UnknownError/UnknownError";
import {getAllSpecialities} from "../../services/UniService";
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';

const UserSpecialities = () => {
    // const [isPhysicsUser, setIsPhysicsUser] = useState(true)
    useEffect(() => {
        const fetchAllSpecialities = async () =>
        {
            dispatch(setSpecialtiesList({list: await getAllSpecialities()}))
        }
        fetchAllSpecialities()
    }, [])

    let specialitiesList = useSelector((state) => state.specialities.specialitiesList)

    // useEffect(() => {
    //     const checkUserExams = async () => {
    //         try {
    //             const result = await getUserExams(email)
    //             if (result[0].name === ''){
    //                 setShowRedirectAlert(true)
    //             }
    //             else if (result.filter(exam => exam.name === 'Физика').length > 0){
    //                 setIsPhysicsUser(true)
    //             }
    //         } catch (e) {
    //             console.log(e)
    //             setShowUnknownAlert(true)
    //         }
    //     }
    //     checkUserExams()
    // }, [])

    useEffect(() => {
        specialitiesList = specialitiesList.map(({faculty, specialities}) => (
            {faculty: faculty, specialities: specialities.filter(({isPhysics}) => isPhysics === isPhysicsUser)}
        ))
    }, [isPhysicsUser])

    const dispatch = useDispatch()
    const facultyElements = specialitiesList.map(({faculty}, index) =>
        <MenuItem key={`faculty-item-${index}`} value={faculty}>{faculty}</MenuItem>
    )

    const specialitiesNamesElements = specialitiesList.map(({faculty, specialities}, fIndex) =>
        ({faculty: faculty,
            specialities: specialities
                .map(({code, name}, sIndex) => (
                    <MenuItem key={`faculty-${fIndex}-speciality-${sIndex}`} value={`(${code}) ${name}`}>{`(${code}) ${name}`}</MenuItem>
                ))
        })
    )

    // const email = useSelector((state) => state.user.email)
    const [form, setForm] = useState('')
    const [time, setTime] = useState('')
    const [payment, setPayment] = useState('')
    const route = useNavigate()
    const [userSpecialities, setUserSpecialities] = useState([
        {faculty: '', name: '', id: 0}
    ])
    const [key, setKey] = useState(1)

    const handleFormStateChange = (e) => {
        setForm(e)
        if (e === 'Дистанционная') {
            setTime('Полное')
            setPayment('Платная')
        }
    }

    const [showUnknownAlert, setShowUnknownAlert] = useState(false)
    const [showRedirectAlert, setShowRedirectAlert] = useState(false)

    const handleCloseRedirectAlert = () => {
        setShowRedirectAlert(false)
        route('/exams')
    }

    const handleAddSpeciality = () => {
        setUserSpecialities([...userSpecialities, {faculty: '', name: '', id: key}])
        setKey(key + 1)
    }

    const handleDeleteSpeciality = (index) => {
        userSpecialities.splice(index, 1)
        setUserSpecialities([...userSpecialities])
    }

    const handleSpecialitiesChange = () => {
        setUserSpecialities([...userSpecialities])
    }

    return (
        <div>
            <Header page="applic"/>
            {/*    next element should be with marginTop: "100px" because of the positioning of the header element*/}
            <UnknownError showAlert={showUnknownAlert} setShowAlert={setShowUnknownAlert}></UnknownError>
            <MyAlert showAlert={showRedirectAlert} setShowAlert={setShowRedirectAlert} title={'Ошибка'}
                    text={'Сначала внесите информацию об экзаменах!'} propHandleCloseAlert={handleCloseRedirectAlert}/>
            <div className={classes.Configuration}>
                <Typography variant="h3" className={classes.ConfigurationName}>Выбор типа заявления</Typography>
                <div className={classes.SelectorWrap}>
                    <FormControl className={classes.ConfigurationFormControl}>
                        <InputLabel id="form-select-label">Форма обучения</InputLabel>
                        <Select
                            labelId="form-select-label"
                            id="form-select"
                            value={form}
                            onChange={e => handleFormStateChange(e.target.value)}
                            label="Форма обучения"
                        >
                            <MenuItem value={'Очная'}>Очная</MenuItem>
                            <MenuItem value={'Заочная'}>Заончая</MenuItem>
                            <MenuItem value={'Дистанционная'}>Дистанционная</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl disabled={form === 'Дистанционная'} className={classes.ConfigurationFormControl}>
                        <InputLabel id="time-select-label">Время обучения</InputLabel>
                        <Select
                            labelId="time-select-label"
                            id="time-select"
                            value={time}
                            onChange={e => setTime(e.target.value)}
                            label="Время обучения"
                        >
                            <MenuItem value={'Полное'}>Полное</MenuItem>
                            <MenuItem value={'Сокращенное'}>Сокращенное</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl disabled={form === 'Дистанционная'} className={classes.ConfigurationFormControl}>
                        <InputLabel id="payment-select-label">Форма оплаты</InputLabel>
                        <Select
                            labelId="payment-select-label"
                            id="payment-select"
                            value={payment}
                            onChange={e => setPayment(e.target.value)}
                            label="Форма оплаты"
                        >
                            <MenuItem value={'Бюджетная'}>Бюджетная</MenuItem>
                            <MenuItem value={'Платная'}>Платная</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            {form !== '' && time !== '' && payment !== '' ?
                <div className={classes.SpecialitiesWrap}>
                    {userSpecialities.map((spec, index) => (
                        <div key={`speciality-${spec.id}`} className={classes.SpecialityItem}>
                            <FormControl className={classes.SpecialityFaculty}>
                                <InputLabel id={`speciality-faculty-${spec.id}-label`}>Факультет</InputLabel>
                                <Select
                                    labelId={`speciality-faculty-${spec.id}-label`}
                                    id={`speciality-faculty-select-${spec.id}`}
                                    value={spec.faculty}
                                    onChange={e => {
                                        spec.name = (spec.faculty !== e.target.value ? '' : spec.name);
                                        spec.faculty = e.target.value;
                                        handleSpecialitiesChange()}
                                    }
                                    label="Факультет"
                                >
                                    {facultyElements}
                                </Select>
                            </FormControl>
                            <FormControl disabled={spec.faculty === ''} className={classes.SpecialityName}>
                                <InputLabel id={`speciality-name-${spec.id}`}>Специальность</InputLabel>
                                <Select
                                    labelId={`speciality-name-${spec.id}`}
                                    id={`speciality-name-select-${spec.id}`}
                                    value={spec.name}
                                    onChange={e => {
                                        spec.name = e.target.value
                                        handleSpecialitiesChange()}
                                    }
                                    label="Специальность"
                                >
                                    {spec.faculty !== ''
                                        ? specialitiesNamesElements.find((e) => e.faculty === spec.faculty).specialities
                                        : null}
                                </Select>
                            </FormControl>
                            <Button onClick={() => handleDeleteSpeciality(index)} className={classes.SpecialityDeleteButton} startIcon={<DeleteIcon />}>Удалить специальность</Button>
                        </div>
                    ))}
                    <Button onClick={handleAddSpeciality} className={classes.ActionButton} endIcon={<AddIcon/>}>Добавить специальность</Button>
                    <Button className={classes.ActionButton} endIcon={<SendIcon/>}>Сохранить</Button>
                </div>
                : null
            }
        </div>
    );
};

export default UserSpecialities;