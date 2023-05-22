import * as React from 'react';
import Header from '../../components/UI/Header/Header'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from "@mui/material/Button";
import classes from "../UserInfo/UserInfo.module.css";
import SendIcon from "@mui/icons-material/Send";
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tooltip from '@mui/material/Tooltip';
import * as yup from 'yup'
import MyInput from "../../components/UI/input/MyInput";
import MyDatePicker from "../../components/UI/MyDatePicker/MyDatePicker";
import MyRadioGroup from "../../components/UI/MyRadioGroup/MyRadioGroup";
import MySelect from "../../components/UI/MySelect/MySelect";
import {useFormik} from "formik";

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
const language = [
    'Английский язык',
    'Немецикй язык',
    'Инспанский язык',
    'Французский язык'
];
const country = [
    'Республика Беларусь',
    'Кыргызская Республика',
    'Литовская Республика',
    'Республика Казахстан',
    'Республика Таджикистан',
    'Российская Федерация',
];
const streetType = [
    'бульвар',
    'военный городок',
    'военная часть',
    'въезд',
    'квартал',
    'микрорайон',
    'набережная',
    'парк',
    'переулок',
    'площадь',
    'посёлок',
    'проезд',
    'проспект',
    'станция',
    'террритория',
    'тракт',
    'тупик',
    'улица',
    'урочище',
    'шоссе'
];
const cityType = [
    'агрогородок',
    'город',
    'городской посёлок',
    'деревня',
    'курортный посёлок',
    'посёлок',
    'посёлок городского типа',
    'рабочий посёлок',
    'село',
    'сельский населённый пункт',
    'хутор',
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

const UserInfo = () => {
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
        validateOnChange: true,
        validate: (values) => {
            const errors = {}
            console.log(values)
            return errors
        },
        onSubmit: (values) => {
            console.log(values)
        },
    })

    return (
       <div>
           <Header/>
           <div className={classes.FieldsContainer}>
               <div className={classes.FirstLevelContainer} style={{gridArea: "a"}}>
                   <MyInput label="Имя" value={formik.values.Firstname} handleChange={formik.handleChange}
                            id="Firstname"/>
                   <MyInput label="Имя латиницей" value={formik.values.Firstnamelat} handleChange={formik.handleChange}
                            id="Firstnamelat"/>
                   <MyInput label="Фамилия" value={formik.values.Lastname} handleChange={formik.handleChange}
                            id="Lastname"/>
                   <MyInput label="Фамилия латиницей" value={formik.values.Lastnamelat} handleChange={formik.handleChange}
                            id="Lastnamelat"/>
                   <MyInput label="Отчество" value={formik.values.Surname} handleChange={formik.handleChange}
                            id="Surname"/>
                   <MyDatePicker label="Дата рождения" value={formik.values.Birthday} handleChange={formik.handleChange}
                                 id="Birthday"/>
                   <MyRadioGroup options={gender} label="Пол" value={formik.values.Gender} handleChange={formik.handleChange}
                                 id="Gender"/>
                   <MyRadioGroup options={family} label="Семейное положение" value={formik.values.Family}
                                 handleChange={formik.handleChange} id="Family"/>
                   <MyInput label="Дом. телефон" value={formik.values.PhoneNumber} handleChange={formik.handleChange}
                            id="PhoneNumber"/>
               </div>
               <div className={classes.FirstLevelContainer} style={{gridArea: "b"}}>
                   <MySelect label="Тип документа" options={doc} value={formik.values.DocumentType}
                             handleChange={formik.handleChange} id="DocumentType"/>
                   <MyInput label="Другой тип документа" disabled={formik.values.DocumentType !== 'Иной (указать какой)'}
                            value={formik.values.UserDocumentType} handleChange={formik.handleChange} id="UserDocumentType"/>
                   <MyInput label="Идентификационный номер" value={formik.values.IdentyNumber}
                            handleChange={formik.handleChange} id="IdentyNumber"/>
                   <MyInput label="Серия" value={formik.values.Series} handleChange={formik.handleChange} id="Series"/>
                   <MyInput label="Номер" value={formik.values.Number} handleChange={formik.handleChange} id="Number"/>
                   <MyDatePicker label="Дата выдачи" value={formik.values.DateOfIssue}
                                 handleChange={formik.handleChange} id="DateOfIssue"/>
                   <MyDatePicker label="Срок действия" value={formik.values.Validity}
                                 handleChange={formik.handleChange} id="Validity"/>
                   <MyInput label="Кем выдан" value={formik.values.IssuedBy}
                            handleChange={formik.handleChange} id="IssuedBy"/>
               </div>
               <div className={classes.FirstLevelContainer} style={{gridArea: "c"}}>
                   <MySelect label="Уровень образования" options={level} value={formik.values.Education}
                             handleChange={formik.handleChange} id="Education"/>
                   <MyInput label="Тип учреждения образования" value={formik.values.InstitutionType}
                             handleChange={formik.handleChange} id="InstituionType"/>
                   <MyInput label="Документ" value={formik.values.Document} handleChange={formik.handleChange} id="Document"/>
                   <MyInput label="Номер учебного заведения или аббревиатура" value={formik.values.Institution}
                             handleChange={formik.handleChange} id="Institution"/>
                   <MyInput label="Номер документа" value={formik.values.DocumentNumber}
                            handleChange={formik.handleChange} id="DocumentNumber"/>
                   <MyDatePicker label="Дата окончания" value={formik.values.GraduationDate}
                                 handleChange={formik.handleChange} id="GraduationDate"/>
                   <MyInput label="Иностранный язык" value={formik.values.Language}
                            handleChange={formik.handleChange} id="Language"/>
                   <MyInput label="Средний балл документа об образовании" value={formik.values.AverageScore}
                            handleChange={formik.handleChange} id="AverageScore"/>
                   <MyInput label="Льготы при зачислении" value={formik.values.Benefits}
                            handleChange={formik.handleChange} id="Benefits"/>
               </div>
               <div className={classes.FirstLevelContainer} style={{gridArea: "d"}}>
                   <MyInput label="Индекс" value={formik.values.PostalCode} handleChange={formik.handleChange}
                            id="PostalCode"/>
                   <MyInput label="Страна" value={formik.values.Country} handleChange={formik.handleChange}
                            id="Country"/>
                   <MyInput label="Область" value={formik.values.Region} handleChange={formik.handleChange}
                            id="Region"/>
                   <MyInput label="Район" value={formik.values.District} handleChange={formik.handleChange}
                            id="District"/>
                   <MyInput label="Тип населенного пункта" value={formik.values.LocalityType}
                            handleChange={formik.handleChange} id="LocalityType"/>
                   <MyInput label="Название населенного пункта" value={formik.values.LocalityName}
                            handleChange={formik.handleChange} id="LocalityName"/>
                   <MyInput label="Тип улицы" value={formik.values.StreetType}
                            handleChange={formik.handleChange} id="StreetType"/>
                   <MyInput label="Название улицы" value={formik.values.Street}
                            handleChange={formik.handleChange} id="Street"/>
                   <MyInput label="Номер дома" value={formik.values.HouseNumber}
                            handleChange={formik.handleChange} id="HouseNumber"/>
                   <MyInput label="Номер корпуса" value={formik.values.HousingNumber}
                            handleChange={formik.handleChange} id="HousingNumber"/>
                   <MyInput label="Номер квартиры" value={formik.values.FlatNumber}
                            handleChange={formik.handleChange} id="FlatNumber"/>
               </div>
               <div className={classes.FirstLevelContainer} style={{gridArea: "g"}}>
                   <Typography variant="h4">Мать</Typography>
                   <MySelect label="Тип родства" options={mother} value={formik.values.MotherType}
                             handleChange={formik.handleChange} id="MotherType"/>
                   <MyInput label="Фамилия" value={formik.values.MotherLastname}
                            handleChange={formik.handleChange} id="MotherLastname"/>
                   <MyInput label="Имя" value={formik.values.MotherFirstname}
                            handleChange={formik.handleChange} id="MotherFirstname"/>
                   <MyInput label="Отчество" value={formik.values.MotherSurname}
                            handleChange={formik.handleChange} id="MotherSurname"/>
                   <MyInput label="Адрес" value={formik.values.MotherAddress}
                            handleChange={formik.handleChange} id="MotherAddress"/>
               </div>
               <div className={classes.FirstLevelContainer} style={{gridArea: "h"}}>
                   <Typography variant="h4">Отец</Typography>
                   <MySelect label="Тип родства" options={father} value={formik.values.FatherType}
                             handleChange={formik.handleChange} id="FatherType"/>
                   <MyInput label="Фамилия" value={formik.values.FatherLastname}
                            handleChange={formik.handleChange} id="FatherLastname"/>
                   <MyInput label="Имя" value={formik.values.FatherFirstname}
                            handleChange={formik.handleChange} id="FatherFirstname"/>
                   <MyInput label="Отчество" value={formik.values.FatherSurname}
                            handleChange={formik.handleChange} id="FatherSurname"/>
                   <MyInput label="Адрес" value={formik.values.FatherAddress}
                            handleChange={formik.handleChange} id="FatherAddress"/>
               </div>
               <Button onClick={formik.handleSubmit} className={classes.SaveButton} endIcon={<SendIcon/>}>Сохранить</Button>
           </div>
       </div>
    )
}

export default UserInfo