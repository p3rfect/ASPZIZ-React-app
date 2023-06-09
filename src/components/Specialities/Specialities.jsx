import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {setSpecialtiesList} from "../../features/specialties/specialitiesSlice";
import {FormControl, InputLabel, MenuItem, Typography, Button} from "@mui/material";
import Select from '@mui/material/Select';
import classes from './Specialities.module.css'
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import MyAlert from "../../components/UI/MyAlert/MyAlert";
import UnknownError from "../../components/UI/UnknownError/UnknownError";
import {getAllSpecialities} from "../../services/UniService";
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import {getUserExams, getUserSpecialities, updateUserSpecialities} from "../../services/UserService";

const Specialities = ({emailSearch}) => {
    const [isPhysicsUser, setIsPhysicsUser] = useState(true)

    useEffect(() => {
        const checkUserExams = async () => {
            try {
                const result = await getUserExams((emailSearch !== undefined ? emailSearch : email))
                if (result[0].name === ''){
                    setShowRedirectAlert(true)
                }
                else if (result.filter(exam => exam.name === 'Физика').length > 0){
                    setIsPhysicsUser(true)
                }
            } catch (e) {
                console.log(e)
                setShowUnknownAlert(true)
            }
        }
        checkUserExams()
    }, [])

    const dispatch = useDispatch()

    const email = useSelector((state) => state.user.email)
    const [form, setForm] = useState('')
    const [time, setTime] = useState('')
    const [payment, setPayment] = useState('')
    const route = useNavigate()
    const [userSpecialities, setUserSpecialities] = useState([
        {faculty: '', name: '', id: 0}
    ])
    const [key, setKey] = useState(1)
    const handleAllFormChange = () => {
        if (form === '' || time === '' || payment === '') return
        const fetchAllSpecialities = async () =>
        {
            await setUserSpecialities([...[{faculty: '', name: '', id: 0}]])
            dispatch(setSpecialtiesList({list: await getAllSpecialities(payment + ',' + form + ',' + time)}))
        }
        fetchAllSpecialities()
    }


    let specialitiesList = useSelector((state) => state.specialities.specialitiesList)
    useEffect(() => {
        specialitiesList = specialitiesList.map(({faculty, specialities}) => (
            {faculty: faculty, specialities: specialities.filter(({isPhysics}) => isPhysics === isPhysicsUser)}
        ))
    }, [isPhysicsUser])
    const specialitiesNamesElements = specialitiesList.map(({faculty, specialities}, fIndex) =>
        ({faculty: faculty,
            specialities: specialities
                .map(({code, name}, sIndex) => (
                    <MenuItem key={`faculty-${fIndex}-speciality-${sIndex}`} value={`(${code}) ${name}`}>{`(${code}) ${name}`}</MenuItem>
                ))
        })
    )
    const facultyElements = specialitiesList.map(({faculty}, index) =>
        <MenuItem key={`faculty-item-${index}`} value={faculty}>{faculty}</MenuItem>
    )

    useEffect(() => {
        const fetchUserSpecialities = async () => {
            const fetchAllSpecialities = async () =>
            {
                await setUserSpecialities([...[{faculty: '', name: '', id: 0}]])
                await dispatch(setSpecialtiesList({list: await getAllSpecialities(payment + ',' + form + ',' + time)}))
            }
            await fetchAllSpecialities()
            const response = await getUserSpecialities((emailSearch !== undefined ? emailSearch : email))
            await setPayment(response.data.financingFormPeriod.split(',')[0])
            await setForm(response.data.financingFormPeriod.split(',')[1])
            await setTime(response.data.financingFormPeriod.split(',')[2])
            await console.log(2)
            let nKey = key
            await setUserSpecialities(response.data.specialtiesCodes.map((code) => {
                let res
                specialitiesList.forEach(({faculty, specialities}) => {
                    specialities.forEach((spec) => {
                        if (spec.code === code){
                            res = {faculty: faculty, name: '(' + code + ') ' + spec.name, id: nKey++}
                        }
                    })
                })
                return res
            }))
            setKey(nKey)
        }
        fetchUserSpecialities()
    }, [])

    const [showUnknownAlert, setShowUnknownAlert] = useState(false)
    const [showRedirectAlert, setShowRedirectAlert] = useState(false)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)

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

    const handleSubmit = async () => {
        try{
            let bad = false
            userSpecialities.forEach((spec1) => {
                userSpecialities.forEach((spec2) => {
                    if (spec1.faculty === spec2.faculty && spec1.name === spec2.name && spec1.id !== spec2.id) bad = true
                })
            })
            if (bad){
                setShowDoubledAlert(true)
                return
            }
            await updateUserSpecialities(payment + ',' + form + ',' + time, userSpecialities.map(({name}) =>
                name.split('(')[1].split(')')[0]
            ), (emailSearch !== undefined ? emailSearch : email))
            setShowSuccessAlert(true)
        } catch (e) {
            setShowUnknownAlert(true)
        }
    }

    const [showDoubledAlert, setShowDoubledAlert] = useState(false)
    const handleFormStateChange = (e) => {
        setForm(e)
        if (e === 'Дистанционная') {
            setTime('Полное')
            setPayment('Платная')
        }
        handleAllFormChange()
    }

    const handePaymentChange = (e) => {
        setPayment(e)
        handleAllFormChange()
    }

    const handleTimeChange = (e) => {
        setTime(e)
        handleAllFormChange()
    }

    return (
        <div>
            <UnknownError showAlert={showUnknownAlert} setShowAlert={setShowUnknownAlert}></UnknownError>
            <MyAlert showAlert={showRedirectAlert} setShowAlert={setShowRedirectAlert} title={'Ошибка'}
                     text={'Сначала внесите информацию об экзаменах!'} propHandleCloseAlert={handleCloseRedirectAlert}/>
            <MyAlert showAlert={showSuccessAlert} setShowAlert={setShowSuccessAlert} title={'Успех'} text={'Успешно сохранено'}></MyAlert>
            <MyAlert showAlert={showDoubledAlert} setShowAlert={setShowDoubledAlert} title={'Ошибка в заполнении'}
                     text={'Вы выбрали две одинаковые специальности, не делайте так, пожалуйста!'}></MyAlert>
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
                            onChange={e => handleTimeChange(e.target.value)}
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
                            onChange={e => handePaymentChange(e.target.value)}
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
                    <Button onClick={handleAddSpeciality} className={classes.AddButton} endIcon={<AddIcon/>}>Добавить специальность</Button>
                    <Button className={classes.SaveButton} onClick={handleSubmit} endIcon={<SendIcon/>}>Сохранить</Button>
                </div>
                : null
            }
        </div>
    );
};

export default Specialities;