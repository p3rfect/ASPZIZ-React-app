import * as React from 'react';
import Header from '../../components/UI/Header/Header'
import Button from "@mui/material/Button";
import classes from "../UserInfo/UserInfo.module.css";
import SendIcon from "@mui/icons-material/Send";
import Typography from '@mui/material/Typography';
import MyInput from "../../components/UI/input/MyInput";
import MyDatePicker from "../../components/UI/MyDatePicker/MyDatePicker";
import MyRadioGroup from "../../components/UI/MyRadioGroup/MyRadioGroup";
import MySelect from "../../components/UI/MySelect/MySelect";
import {useFormik} from "formik";
import {useSelector} from "react-redux";
import {getUserInfo, updateUserInfo} from "../../services/UserService";
import * as yup from "yup";
import {useEffect, useState} from "react";

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
// const language = [
//     'Английский язык',
//     'Немецикй язык',
//     'Инспанский язык',
//     'Французский язык'
// ];
// const streetType = [
//     'бульвар',
//     'военный городок',
//     'военная часть',
//     'въезд',
//     'квартал',
//     'микрорайон',
//     'набережная',
//     'парк',
//     'переулок',
//     'площадь',
//     'посёлок',
//     'проезд',
//     'проспект',
//     'станция',
//     'террритория',
//     'тракт',
//     'тупик',
//     'улица',
//     'урочище',
//     'шоссе'
// ];
// const country = [
//     'Республика Беларусь',
//     'Кыргызская Республика',
//     'Литовская Республика',
//     'Республика Казахстан',
//     'Республика Таджикистан',
//     'Российская Федерация',
// ];
// const cityType = [
//     'агрогородок',
//     'город',
//     'городской посёлок',
//     'деревня',
//     'курортный посёлок',
//     'посёлок',
//     'посёлок городского типа',
//     'рабочий посёлок',
//     'село',
//     'сельский населённый пункт',
//     'хутор',
// ];
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
    Lastnamelat: yup.string().required('Это обязательное поле').matches(/^[A-Za-z ]+$/, 'Поле должно содержать только латинские буквы верхнего и нижнего регистра'),
    Firstnamelat: yup.string().required('Это обязательное поле').matches(/^[A-Za-z ]+$/, 'Поле должно содержать только латинские буквы верхнего и нижнего регистра'),
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

const UserInfo = () => {
    const email = useSelector((state) => state.user.email)
    const formik = useFormik({
        initialValues: {
            Lastname: '',
            Lastnamelat: '',
            Firstname: '',
            Firstnamelat: '',
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
        onSubmit: (values) => {
            updateUserInfo(values, email)
        },
    })

    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const fetchInfo = async () => {
            await setIsLoading(true)
            formik.setValues(await getUserInfo(email))
            await setIsLoading(false)
        }

        fetchInfo()
    }, [])

    return (
        isLoading ? null :
                <div>
                    <Header/>
                    <div className={classes.FieldsContainer}>
                        <div className={classes.FirstLevelContainer} style={{gridArea: "a"}}>
                            <MyInput label="Имя" value={formik.values.Firstname} handleChange={formik.handleChange}
                                     id="Firstname" error={formik.errors.Firstname}/>
                            <MyInput label="Имя латиницей" value={formik.values.Firstnamelat}
                                     handleChange={formik.handleChange}
                                     id="Firstnamelat" error={formik.errors.Firstnamelat}/>
                            <MyInput label="Фамилия" value={formik.values.Lastname} handleChange={formik.handleChange}
                                     id="Lastname" error={formik.errors.Lastname}/>
                            <MyInput label="Фамилия латиницей" value={formik.values.Lastnamelat}
                                     handleChange={formik.handleChange}
                                     id="Lastnamelat" error={formik.errors.Lastnamelat}/>
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
    )
}

export default UserInfo