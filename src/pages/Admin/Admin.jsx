import React, {useEffect, useState} from 'react';
import {FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Header from "../../components/UI/Header/Header";
import MyAlert from "../../components/UI/MyAlert/MyAlert";
import UnknownError from "../../components/UI/UnknownError/UnknownError";
import classes from "./Admin.module.css";
import MyInput from "../../components/UI/input/MyInput";
import MyDatePicker from "../../components/UI/MyDatePicker/MyDatePicker";
import MyRadioGroup from "../../components/UI/MyRadioGroup/MyRadioGroup";
import MySelect from "../../components/UI/MySelect/MySelect";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {
    getUserSpecialities,

    postUserExams,
    updateUserInfo, updateUserSpecialities
} from "../../services/UserService";
import * as yup from "yup";
import {Enroll, getAdminUser} from "../../services/AdminService";
import Select from "@mui/material/Select";
import {useNavigate} from "react-router-dom";
import {setSpecialtiesList} from "../../features/specialties/specialitiesSlice";
import {getAllSpecialities} from "../../services/UniService";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const gender = [
    'Мужской',
    'Женский'
];
const family = [
    'Холост/ не замужем',
    'Женат/замужем'
];
const doc = [
    'Паспорт гражданина РБ',
    'Вид на жительство в РБ',
    'Удостоверение беженца',
    'Паспорт гражданина РФ',
    'Паспорт гражданина Республики Казахстан',
    'Паспорт гражданина Республики Таджикистан',
    'Паспорт гражданина Кыргызской Республики',
    'ID-карта гражданина РБ',
    'Иной (указать какой)'
];
const level = [
    'Общее среднее образование',
    'Профессионально-техническое',
    'Среднее специальное',
    'Незаконченнное высшее',
    'Высшее'
];
const mother = [
    'Мать',
    'Мачеха',
    'Попечительница',
];
const father = [
    'Отец',
    'Отчим',
    'Попечитель',
];

const validationSchema = yup.object({
    Lastname: yup.string().required('Это обязательное поле').matches(/^[А-Яа-яA-Za-z ]+$/, 'Поле должно содержать только буквы верхнего и нижнего регистра'),
    MotherLastname: yup.string().matches(/^[А-Яа-яA-Za-z ]+$/, 'Поле должно содержать только буквы верхнего и нижнего регистра'),
    FatherLastname: yup.string().matches(/^[А-Яа-яA-Za-z ]+$/, 'Поле должно содержать только буквы верхнего и нижнего регистра'),
    Surname: yup.string().matches(/^[А-Яа-яA-Za-z ]+$/, 'Поле должно содержать только буквы верхнего и нижнего регистра'),
    MotherSurname: yup.string().matches(/^[А-Яа-яA-Za-z ]+$/, 'Поле должно содержать только буквы верхнего и нижнего регистра'),
    FatherSurname: yup.string().matches(/^[А-Яа-яA-Za-z ]+$/, 'Поле должно содержать только буквы верхнего и нижнего регистра'),
    Firstname: yup.string().required('Это обязательное поле').matches(/^[А-Яа-яA-Za-z ]+$/, 'Поле должно содержать только буквы верхнего и нижнего регистра'),
    MotherFirstname: yup.string().matches(/^[А-Яа-яA-Za-z ]+$/, 'Поле должно содержать только буквы верхнего и нижнего регистра'),
    FatherFirstname: yup.string().matches(/^[А-Яа-яA-Za-z ]+$/, 'Поле должно содержать только буквы верхнего и нижнего регистра'),
    LastnamLat: yup.string().required('Это обязательное поле').matches(/^[A-Za-z ]+$/, 'Поле должно содержать только латинские буквы верхнего и нижнего регистра'),
    FirstnameLat: yup.string().required('Это обязательное поле').matches(/^[A-Za-z ]+$/, 'Поле должно содержать только латинские буквы верхнего и нижнего регистра'),
    Series: yup.string().length(2, 'Длина должна быть равна 2').matches(/^[A-Z]+$/, 'Поле должно содержать только латинские буквы верхнего регистра'),
    Number: yup.string().length(6, 'Длина должна быть равна 6').matches(/^[0-9]+$/, 'Поле должно состоять только из цифер'),
    DocumentNumber: yup.string().length(6, 'Длина должна быть равна 2').matches(/^[0-9]+$/, 'Поле должно состоять только из цифер'),
    InstitutionType: yup.string().matches(/^[А-Яа-яA-Za-z ]+$/, 'Поле может содержать только буквы и пробелы'),
    Document: yup.string().matches(/^[А-Яа-яA-Za-z ]+$/, 'Поле может содержать только буквы и пробелы'),
    Language: yup.string().matches(/^[А-Яа-яA-Za-z ]+$/, 'Поле может содержать только буквы и пробелы'),
    AverageScore: yup.string().matches(/^[0-9.]+$/, 'Должно быть числом от 0 до 10').test('range-check', 'Должно быть числом от 0 до 10', (value) => (value === '' || (Number(value) >= 0 && Number(value) <= 10))),
    PostalCode: yup.string().matches(/^[0-9.]+$/, 'Может содержать только цифры'),
    HouseNumber: yup.string().matches(/^[0-9.]+$/, 'Может содержать только цифры'),
    Country: yup.string().matches(/^[А-Яа-яA-Za-z ]+$/, 'Поле может содержать только буквы и пробелы'),
    Region: yup.string().matches(/^[А-Яа-яA-Za-z ]+$/, 'Поле может содержать только буквы и пробелы'),
    District: yup.string().matches(/^[А-Яа-яA-Za-z ]+$/, 'Поле может содержать только буквы и пробелы'),
    LocalityType: yup.string().matches(/^[А-Яа-яA-Za-z ]+$/, 'Поле может содержать только буквы и пробелы'),
    LocalityName: yup.string().matches(/^[А-Яа-яA-Za-z ]+$/, 'Поле может содержать только буквы и пробелы'),
    StreetType: yup.string().matches(/^[А-Яа-яA-Za-z ]+$/, 'Поле может содержать только буквы и пробелы'),
    Street: yup.string().matches(/^[А-Яа-яA-Za-z ]+$/, 'Поле может содержать только буквы и пробелы'),
    IdentyNumber: yup.string().matches(/^[0-9.]+$/, 'Может содержать только цифры'),
    PhoneNumber: yup.string().matches(/^[0-9+]+$/, 'Введите корректный номер')
})

const Admin = () => {
    const [emailSearch, setEmailSearch] = useState('')
    const [found, setFound] = useState(false)
    const role = useSelector((state) => state.user.role)

    const handleSearch = async () => {
        try {
            const response = await getAdminUser(emailSearch)

            const result = {}
            console.log(response)
            Object.entries(response.data.UserInfo).forEach(([key, value]) => {
                let newKey = key.charAt(0).toUpperCase() + key.slice(1)
                result[newKey] = value
            })
            await formik.setValues(result)
            await setIsLoading(false)
            await setExams([...response.data.Exams])

            const checkUserExams = async () => {
                try {
                    const result = response.data.Exams
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
            await checkUserExams()

            await setFound(true)
        } catch (e) {
            console.log(e)
            setShowUnknownAlert(true)
        }
    }

    const [isPhysicsUser, setIsPhysicsUser] = useState(true)
    let specialitiesList = useSelector((state) => state.specialities.specialitiesList)

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

    const [form, setForm] = useState('')
    const [time, setTime] = useState('')
    const [payment, setPayment] = useState('')
    const route = useNavigate()
    const [userSpecialities, setUserSpecialities] = useState([
        {faculty: '', name: '', id: 0}
    ])
    const [key, setKey] = useState(1)
    useEffect(() => {
        setUserSpecialities([...[{faculty: '', name: '', id: 0}]])
        const fetchAllSpecialities = async () =>
        {
            dispatch(setSpecialtiesList({list: await getAllSpecialities(payment + ',' + form + ',' + time)}))
        }
        const fetchUserSpecialities = async () => {
            const response = await getUserSpecialities(emailSearch)
            let key = 0;
            setUserSpecialities(response.data.SpecialtiesCodes.map((code) => {
                let res
                specialitiesList.foreach((fac, specList) => {
                    specList.forEach((spec) => {
                        if (spec.code === code) res = {faculty: fac, name: spec.name, id: key++}
                    })
                })
                return res
            }))
            setPayment(response.data.FinancingFormPeriod.split(',')[0])
            setForm(response.data.FinancingFormPeriod.split(',')[1])
            setTime(response.data.FinancingFormPeriod.split(',')[2])
        }
        fetchAllSpecialities()
        fetchUserSpecialities()
    }, [form, time, payment])

    const handleFormStateChange = (e) => {
        setForm(e)
        if (e === 'Дистанционная') {
            setTime('Полное')
            setPayment('Платная')
        }
    }

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

    const handleSubmitSpecs = async () => {
        try{
            await updateUserSpecialities(payment + ',' + form + ',' + time, userSpecialities.map(({name}) =>
                name.split('(')[1].split(')')[0]
            ), email)
            setShowSuccessAlert(true)
        } catch (e) {
            setShowUnknownAlert(true)
        }
    }

    const examsTypes = ['ЦТ', 'ЦЭ', 'Внутренний экзамен', 'Без экзамена', 'Из аттестата', 'ЕГЭ', 'Олимпиада']
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
            setShowUnknownAlert(true)
        }
    }

    const [showNotFullfilledAlert, setShowNotFullfilledAlert] = useState(false)
    const [showProfileAlert, setShowProfileAlert] = useState(false)
    const [showRepeatAlert, setShowRepeatAlert] = useState(false)
    const [showFillingError, setShowFillingError] = useState(false)

    const formik = useFormik({
        initialValues: {
            Lastname: '',
            LastnameLat: '',
            Firstname: '',
            FirstnameLat: '',
            Surname: '',
            Birthday: '',
            Gender: '',
            Family: '',
            DocumentType: '',
            UserDocumentType: '',
            IdentyNumber: '',
            Series: '',
            Number: '',
            DateOfIssue: '',
            Validity: '',
            IssuedBy: '',
            Education: '',
            InstitutionType: '',
            Document: '',
            Institution: '',
            DocumentNumber: '',
            GraduationDate: '',
            Language: '',
            AverageScore: '',
            PostalCode: '',
            Country: '',
            Region: '',
            District: '',
            LocalityType: '',
            LocalityName: '',
            StreetType: '',
            Street: '',
            HouseNumber: '',
            HousingNumber: '',
            FlatNumber: '',
            PhoneNumber: '',
            Benefits: '',
            FatherType: '',
            FatherLastname: '',
            FatherFirstname: '',
            FatherSurname: '',
            FatherAddress: '',
            MotherType: '',
            MotherLastname: '',
            MotherFirstname: '',
            MotherSurname: '',
            MotherAddress: ''
        },
        validationSchema: validationSchema,
        validateOnChange: true,
        onSubmit: async (values) => {
            try {
                await updateUserInfo(values, email)
                setShowSuccessAlert(true)
            } catch (e) {
                setShowUnknownAlert(true)
            }
        },
    })

    const [isLoading, setIsLoading] = useState(true)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [showUnknownAlert, setShowUnknownAlert] = useState(false)
    const [showUnknownError, setShowUnknownError] = useState(false)

    const handleEnrollment = async () => {
        Enroll()
    }

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
            {role === 'admin' ? <Button onClick={handleEnrollment}>Провести зачисление</Button> : null}
            {!found ? null :
                isLoading ? null :
                    <div>
                        <Button>Принять документы</Button>
                        <div>
                        <MyAlert title="Успех" text="Успешно сохранено" showAlert={showSuccessAlert} setShowAlert={setShowSuccessAlert} />
                        <UnknownError setShowAlert={setShowUnknownAlert} showAlert={showUnknownAlert} />
                        <div className={classes.FieldsContainer}>
                            <div className={classes.FirstLevelContainer} style={{gridArea: "a"}}>
                                <MyInput label="Имя" value={formik.values.Firstname} handleChange={formik.handleChange}
                                         id="Firstname" error={formik.errors.Firstname}/>
                                <MyInput label="Имя латиницей" value={formik.values.FirstnameLat}
                                         handleChange={formik.handleChange}
                                         id="FirstnameLat" error={formik.errors.FirstnameLat}/>
                                <MyInput label="Фамилия" value={formik.values.Lastname} handleChange={formik.handleChange}
                                         id="Lastname" error={formik.errors.Lastname}/>
                                <MyInput label="Фамилия латиницей" value={formik.values.LastnameLat}
                                         handleChange={formik.handleChange}
                                         id="LastnameLat" error={formik.errors.LastnameLat}/>
                                <MyInput label="Отчество" value={formik.values.Surname} handleChange={formik.handleChange}
                                         id="Surname" error={formik.errors.Surname}/>
                                <MyDatePicker label="Дата рождения" value={formik.values.Birthday}
                                              handleChange={formik.handleChange}
                                              id="Birthday" error={formik.errors.Birthday}/>
                                <MyRadioGroup options={gender} label="Пол" value={formik.values.Gender}
                                              handleChange={formik.handleChange}
                                              id="Gender" error={formik.errors.Gender}/>
                                <MyRadioGroup options={family} label="Семейное положение" value={formik.values.Family}
                                              handleChange={formik.handleChange} id="Family" error={formik.errors.Family}/>
                                <MyInput label="Моб. телефон" value={formik.values.PhoneNumber}
                                         handleChange={formik.handleChange}
                                         id="PhoneNumber" error={formik.errors.PhoneNumber}/>
                            </div>
                            <div className={classes.FirstLevelContainer} style={{gridArea: "b"}}>
                                <MySelect label="Тип документа" options={doc} value={formik.values.DocumentType}
                                          handleChange={formik.handleChange} id="DocumentType"
                                          error={formik.errors.DocumentType}/>
                                <MyInput label="Другой тип документа"
                                         disabled={formik.values.DocumentType !== 'Иной (указать какой)'}
                                         value={formik.values.UserDocumentType} handleChange={formik.handleChange}
                                         id="UserDocumentType"
                                         error={formik.errors.UserDocumentType}/>
                                <MyInput label="Идентификационный номер" value={formik.values.IdentyNumber}
                                         handleChange={formik.handleChange} id="IdentyNumber"
                                         error={formik.errors.IdentyNumber}/>
                                <MyInput label="Серия" value={formik.values.Series} handleChange={formik.handleChange}
                                         id="Series"
                                         error={formik.errors.Series}/>
                                <MyInput label="Номер" value={formik.values.Number} handleChange={formik.handleChange}
                                         id="Number"
                                         error={formik.errors.Number}/>
                                <MyDatePicker label="Дата выдачи" value={formik.values.DateOfIssue}
                                              handleChange={formik.handleChange} id="DateOfIssue"
                                              error={formik.errors.DateOfIssue}/>
                                <MyDatePicker label="Срок действия" value={formik.values.Validity}
                                              handleChange={formik.handleChange} id="Validity"
                                              error={formik.errors.Validity}/>
                                <MyInput label="Кем выдан" value={formik.values.IssuedBy}
                                         handleChange={formik.handleChange} id="IssuedBy" error={formik.errors.IssuedBy}/>
                            </div>
                            <div className={classes.FirstLevelContainer} style={{gridArea: "c"}}>
                                <MySelect label="Уровень образования" options={level} value={formik.values.Education}
                                          handleChange={formik.handleChange} id="Education"
                                          error={formik.errors.Education}/>
                                <MyInput label="Тип учреждения образования" value={formik.values.InstitutionType}
                                         handleChange={formik.handleChange} id="InstituionType"
                                         error={formik.errors.InstitutionType}/>
                                <MyInput label="Документ" value={formik.values.Document} handleChange={formik.handleChange}
                                         id="Document"
                                         error={formik.errors.Document}/>
                                <MyInput label="Номер учебного заведения или аббревиатура" value={formik.values.Institution}
                                         handleChange={formik.handleChange} id="Institution"
                                         error={formik.errors.Institution}/>
                                <MyInput label="Номер документа" value={formik.values.DocumentNumber}
                                         handleChange={formik.handleChange} id="DocumentNumber"
                                         error={formik.errors.DocumentNumber}/>
                                <MyDatePicker label="Дата окончания" value={formik.values.GraduationDate}
                                              handleChange={formik.handleChange} id="GraduationDate"
                                              error={formik.errors.GraduationDate}/>
                                <MyInput label="Иностранный язык" value={formik.values.Language}
                                         handleChange={formik.handleChange} id="Language" error={formik.errors.Language}/>
                                <MyInput label="Средний балл документа об образовании" value={formik.values.AverageScore}
                                         handleChange={formik.handleChange} id="AverageScore"
                                         error={formik.errors.AverageScore}/>
                                <MyInput label="Льготы при зачислении" value={formik.values.Benefits}
                                         handleChange={formik.handleChange} id="Benefits" error={formik.errors.Benefits}/>
                            </div>
                            <div className={classes.FirstLevelContainer} style={{gridArea: "d"}}>
                                <MyInput label="Индекс" value={formik.values.PostalCode} handleChange={formik.handleChange}
                                         id="PostalCode" error={formik.errors.PostalCode}/>
                                <MyInput label="Страна" value={formik.values.Country} handleChange={formik.handleChange}
                                         id="Country" error={formik.errors.Country}/>
                                <MyInput label="Область" value={formik.values.Region} handleChange={formik.handleChange}
                                         id="Region" error={formik.errors.Region}/>
                                <MyInput label="Район" value={formik.values.District} handleChange={formik.handleChange}
                                         id="District" error={formik.errors.District}/>
                                <MyInput label="Тип населенного пункта" value={formik.values.LocalityType}
                                         handleChange={formik.handleChange} id="LocalityType"
                                         error={formik.errors.LocalityType}/>
                                <MyInput label="Название населенного пункта" value={formik.values.LocalityName}
                                         handleChange={formik.handleChange} id="LocalityName"
                                         error={formik.errors.LocalityName}/>
                                <MyInput label="Тип улицы" value={formik.values.StreetType}
                                         handleChange={formik.handleChange} id="StreetType"
                                         error={formik.errors.StreetType}/>
                                <MyInput label="Название улицы" value={formik.values.Street}
                                         handleChange={formik.handleChange} id="Street" error={formik.errors.Street}/>
                                <MyInput label="Номер дома" value={formik.values.HouseNumber}
                                         handleChange={formik.handleChange} id="HouseNumber"
                                         error={formik.errors.HouseNumber}/>
                                <MyInput label="Номер корпуса" value={formik.values.HousingNumber}
                                         handleChange={formik.handleChange} id="HousingNumber"
                                         error={formik.errors.HousingNumber}/>
                                <MyInput label="Номер квартиры" value={formik.values.FlatNumber}
                                         handleChange={formik.handleChange} id="FlatNumber"
                                         error={formik.errors.FlatNumber}/>
                            </div>
                            <div className={classes.FirstLevelContainer} style={{gridArea: "g"}}>
                                <Typography variant="h4">Мать</Typography>
                                <MySelect label="Тип родства" options={mother} value={formik.values.MotherType}
                                          handleChange={formik.handleChange} id="MotherType"
                                          error={formik.errors.MotherType}/>
                                <MyInput label="Фамилия" value={formik.values.MotherLastname}
                                         handleChange={formik.handleChange} id="MotherLastname"
                                         error={formik.errors.MotherLastname}/>
                                <MyInput label="Имя" value={formik.values.MotherFirstname}
                                         handleChange={formik.handleChange} id="MotherFirstname"
                                         error={formik.errors.MotherFirstname}/>
                                <MyInput label="Отчество" value={formik.values.MotherSurname}
                                         handleChange={formik.handleChange} id="MotherSurname"
                                         error={formik.errors.MotherSurname}/>
                                <MyInput label="Адрес" value={formik.values.MotherAddress}
                                         handleChange={formik.handleChange} id="MotherAddress"
                                         error={formik.errors.MotherAddress}/>
                            </div>
                            <div className={classes.FirstLevelContainer} style={{gridArea: "h"}}>
                                <Typography variant="h4">Отец</Typography>
                                <MySelect label="Тип родства" options={father} value={formik.values.FatherType}
                                          handleChange={formik.handleChange} id="FatherType"
                                          error={formik.errors.FatherType}/>
                                <MyInput label="Фамилия" value={formik.values.FatherLastname}
                                         handleChange={formik.handleChange} id="FatherLastname"
                                         error={formik.errors.FatherLastname}/>
                                <MyInput label="Имя" value={formik.values.FatherFirstname}
                                         handleChange={formik.handleChange} id="FatherFirstname"
                                         error={formik.errors.FatherFirstname}/>
                                <MyInput label="Отчество" value={formik.values.FatherSurname}
                                         handleChange={formik.handleChange} id="FatherSurname"
                                         error={formik.errors.FatherSurname}/>
                                <MyInput label="Адрес" value={formik.values.FatherAddress}
                                         handleChange={formik.handleChange} id="FatherAddress"
                                         error={formik.errors.FatherAddress}/>
                            </div>
                            <Button onClick={formik.handleSubmit} className={classes.SaveButton}
                                    endIcon={<SendIcon/>}>Сохранить</Button>
                        </div>
                    </div>
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
                        <div>
                            <Header page="applic"/>
                            {/*    next element should be with marginTop: "100px" because of the positioning of the header element*/}
                            <UnknownError showAlert={showUnknownAlert} setShowAlert={setShowUnknownAlert}></UnknownError>
                            <MyAlert showAlert={showRedirectAlert} setShowAlert={setShowRedirectAlert} title={'Ошибка'}
                                     text={'Сначала внесите информацию об экзаменах!'} propHandleCloseAlert={handleCloseRedirectAlert}/>
                            <MyAlert showAlert={showSuccessAlert} setShowAlert={setShowSuccessAlert} title={'Успех'} text={'Успешно сохранено'}></MyAlert>
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
                                    <Button onClick={handleAddSpeciality} className={classes.AddButton} endIcon={<AddIcon/>}>Добавить специальность</Button>
                                    <Button className={classes.SaveButton} onClick={handleSubmitSpecs} endIcon={<SendIcon/>}>Сохранить</Button>
                                </div>
                                : null
                            }
                        </div></div>
            }
        </div>
    );
};

export default Admin;