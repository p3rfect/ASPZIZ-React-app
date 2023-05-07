import React, {useEffect, useState} from 'react';
import Header from "../../components/UI/Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {setSpecialtiesList} from "../../features/specialties/specialitiesSlice";
import {FormControl, InputLabel, MenuItem, Typography} from "@mui/material";
import Select from '@mui/material/Select';
import classes from './UserSpecialities.module.css'

const UserSpecialities = () => {
    const auth = useSelector((state) => state.user.isAuth)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setSpecialtiesList())
    }, [dispatch])
    // const specialitiesList = useSelector((state) => state.specialities.specialitiesList)
    const [form, setForm] = useState('')
    const [time, setTime] = useState('')
    const [payment, setPayment] = useState('')
    const handleFormStateChange = (e) => {
        setForm(e)
        if (e === 'Дистанционная') {
            setTime('Полное')
            setPayment('Платная')
        }
    }

    if (!auth) return <Navigate to="/"/>


    return (
        <div>
            <Header page="applic"/>
            {/*    next element should be with marginTop: "100px" because of the positioning of the header element*/}
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
        </div>
    );
};

export default UserSpecialities;