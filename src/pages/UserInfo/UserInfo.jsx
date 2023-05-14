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

const handleClick = async () => {
    console.log(await test('Nikita'))
}
const pol = [
    { pl: 'Мужской'},
    { pl: 'Женский'},
];
const family = [
    { fm: 'Холост/ не замужем'},
    { fm: ' Женат/замужем'},
];
const doc = [
    { title: 'Паспорт гражданина РБ'},
    { title: 'Вид на жительство в РБ'},
    { title: 'Удостоверение беженца'},
    { title: 'Паспорт гражданина РФ'},
    { title: 'Паспорт гражданина Республики Казахстан'},
    { title: 'Паспорт гражданина Республики Таджикистан'},
    { title: 'Паспорт гражданина Кыргызской Республики'},
    { title: 'ID-карта гражданина РБ'},
];
const level = [
    { ad: 'Общее среднее образование'},
    { ad: 'Профессионально-техническое'},
    { ad: 'Среднее специальное'},
    { ad: 'Незаконченнное высшее'},
    { ad: 'Высшее'},
];
const srobr = [
    { so: '2-36 01 07 Гидропневмосистемы мобильных и технологических машин (по направлениям)'},
    { so: '2-36 01 32 Технологическая подготовка и наладка станков и манипуляторов с программным управлением (по направлениям)'},
    { so: '2-36 01 53 Tехническая эксплуатация оборудования'},
    { so: '2-36 01 56 Mexaтроника'},
    { so: '2-36 03 31 Монтаж и эксплуатация электрооборудования (по направлениям)'},
    { so: '2-36 04 31 Электронно-оптическое аппаратостроение'},
    { so: '2-36 04 32 Электроника механических транспортных средств'},
    { so: '2-36 11 01 Подъемно-транспортные, строительные, дорожные машины и оборудование'},
    { so: '2-37 01 02 Автомобилестроение (по направлениям)'},
    { so: '2-37 01 05 Городской электрический транспорт'},
    { so: '2-37 01 06 Техническая эксплуатация автомобилей (по направлениям)'},
    { so: '-37 01 51 Автосервис'},
    { so: '2-37 02 31 Автоматика и телемеханика на железнодорожном транспорте'},
    { so: '2-37 02 32 Технологическая связь на железнодорожном транспорте'},
    { so: '2-37 02 35 Техническая эксплуатация и ремонт подвижного состава железнодорожного транспорта (по направлениям)'},
    { so: '2-37 04 02 Техническая эксплуатация авиационного оборудования (по направлениям)'},
    { so: '2-38 01 31 Производство и техническая эксплуатация приборов и аппаратов'},
    { so: '2-39 02 31 Техническая эксплуатация радиоэлектронных средств'},
    { so: '2-39 02 32 Проектирование и производство радиоэлектронных средств'},
    { so: '2-39 03 02 Программируемые мобильные системы'},
    { so: '2-40 01 01 Программное обеспечение информационных технологий'},
    { so: '2-40 01 31 Тестирование программного обеспечения'},
    { so: '2-53 01 31 Техническое обслуживание технологического оборудования и средств робототехники в автоматизированном производстве (по направлениям)'},
    { so: '2-94 01 51 Монтаж и эксплуатация охранно-пожарной сигнализации'},
    { so: '2-53 01 04 Автоматизация и управление теплоэнергетическими процессами 2-53 01 05 Автоматизированные электроприводы'},
    { so: '2-53 01 01 Автоматизация технологических процессов и производств'},
    { so: '2-45 01 33 Сети телекоммуникаций'},
    { so: '2-45 01 33 02 Программное обеспечение сетей телекоммуникаций'},
    { so: '2-45 01 32 Системы радиосвязи, радиовещания и телевидения'},
    { so: '2-45 01 31 Многоканальные системы телекоммуникаций'},
    { so: '2-43 01 04 Тепловые электрические станции'},
    { so: '2-40 02 01 Вычислительные машины, системы и сети'},
    { so: '2-40 02 02 Электронные вычислительные средства'},
    { so: '2-40 02 51 Техническое обслуживание и ремонт вычислительной техники 2-41 01 02 Микро- и наноэлектронные технологии и системы'},
    { so: '2-41 01 31 Микроэлектроника'},
    { so: '2-43 01 01 Электрические станции'},
    { so: '2-43 01 03 Электроснабжение (по отраслям)'},
];
const language = [
    { l: 'Английский язык'},
    { l: 'Немецикй язык'},
    { l: 'Инспанский язык'},
    { l: 'Французский язык'},
];
const strana = [
    { str: 'Республика Беларусь'},
    { str: 'Кыргызская Республика'},
    { str: 'Литовская Республика'},
    { str: 'Республика Казахстан'},
    { str: 'Республика Таджикистан'},
    { str: 'Российская Федерация'},
];
const typeyl = [
    { yl: 'бульвар'},
    { yl: 'военный городок'},
    { yl: 'военная часть'},
    { yl: 'въезд'},
    { yl: 'квартал'},
    { yl: 'микрорайон'},
    { yl: 'набережная'},
    { yl: 'парк'},
    { yl: 'переулок'},
    { yl: 'площадь'},
    { yl: 'посёлок'},
    { yl: 'проезд'},
    { yl: 'проспект'},
    { yl: 'станция'},
    { yl: 'террритория'},
    { yl: 'тракт'},
    { yl: 'тупик'},
    { yl: 'улица'},
    { yl: 'урочище'},
    { yl: 'шоссе'},
];
const nasp = [
    { np: 'агрогородок'},
    { np: 'город'},
    { np: 'городской посёлок'},
    { np: 'деревня'},
    { np: 'курортный посёлок'},
    { np: 'посёлок'},
    { np: 'посёлок городского типа'},
    { np: 'рабочий посёлок'},
    { np: 'село'},
    { np: 'сельский населённый пункт'},
    { np: 'хутор'},
];
const mama = [
    { ma: 'Мать'},
    { ma: 'Мачеха'},
    { ma: 'Попечительница'},
];
const dad = [
    { pa: 'Отец'},
    { pa: 'Отчим'},
    { pa: 'Попечитель'},
];
export default function SimpleAccordion() {
    return (
        <React.Fragment>
            <Header page="info"/>
            <Typography variant="h2" className={classes.Title}>Ввод личной информации</Typography>
            <div>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header" >
                        <Typography>1.ФИО</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            < Grid item xs={12} sm={6}>
                                <h1> Фамилия:</h1>
                                <Tooltip title="Ваша фамилия (на русском или белорусском языке), как она указана в Вашем паспорте (документе, удостоверяющем личность).">
                                <TextField
                                    required
                                    id="firstNamek"
                                    name="firstNamek"
                                    label="Введите Вашу фамилию кирилицей"
                                    fullWidth
                                    variant="standard"
                                />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <h1> Фамилия:</h1>
                                <Tooltip title="Ваша фамилия латиницей, как она указана в Вашем паспорте (документе, удостоверяющем личность).">
                                <TextField
                                    required
                                    id="firstNamel"
                                    name="firstNamel"
                                    label="Введите Вашу фамилию латиницей"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <h1> Имя:</h1>
                                <Tooltip title="Ваше имя (на русском или белорусском языке), как оно указано в Вашем паспорте (документе, удостоверяющем личность).">
                                <TextField
                                    required
                                    id="lastNamek"
                                    name="lastNamek"
                                    label="Введите Ваше имя кирилицей"
                                    fullWidth
                                    variant="standard"
                                />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <h1> Имя:</h1>
                                <Tooltip title="Ваше имя латиницей, как оно указано в Вашем паспорте (документе, удостоверяющем личность).">
                                <TextField
                                    required
                                    id="lastNamel"
                                    name="lastNamel"
                                    label="Введите Ваше имя клатиницей"
                                    fullWidth
                                    autoComplete="family-name"
                                    variant="standard"
                                />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <h1> Отчество:</h1>
                                <Tooltip title="Ваше отчество (на русском или белорусском языке), как оно указано в Вашем паспорте (документе, удостоверяющем личность).">
                                <TextField
                                    required
                                    id="Otchl"
                                    name="Otchl"
                                    label="Введите Ваше отчество кирилицей"
                                    fullWidth
                                    variant="standard"
                                />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <h1> Отчество:</h1>
                                <Tooltip title="Ваше отчество латиницей, как оно указано в Вашем паспорте (документе, удостоверяющем личность).">
                                <TextField
                                    required
                                    id="Otchk"
                                    name="Otchk"
                                    label="Введите Ваше Отчество клатиницей"
                                    fullWidth
                                    autoComplete="family-name"
                                    variant="standard"
                                />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <h1> Дата рождения:</h1>
                                <Tooltip title="Например, 05.04.2005.">
                                <TextField
                                    required
                                    id="HB"
                                    name="HB"
                                    label="дд.мм.гггг"
                                    fullWidth
                                    variant="standard"
                                />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <h1> Место рождения:</h1>
                                <Tooltip title="Место рождения, как оно указано в Вашем паспорте (документе, удостоверяющем личность).">
                                <TextField
                                    required
                                    id="city"
                                    name="city"
                                    label="Введите Ваше место рождения"
                                    fullWidth
                                    autoComplete="shipping address-level2"
                                    variant="standard"
                                />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <h1> Пол:</h1>
                                <Tooltip title="Выберите из предложеных вариантов.">
                                <Stack spacing={2} sx={{ width: 300 }}>
                                    <Autocomplete
                                        id="pol"
                                        freeSolo
                                        options={pol.map((option) => option.pl)}
                                        renderInput={(params) => <TextField {...params} label="Пол" />}
                                    />
                                </Stack>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <h1> Семейное положение:</h1>
                                <Tooltip title="Выберите из предложеных вариантов.">
                                <Stack spacing={2} sx={{ width: 300 }}>
                                    <Autocomplete
                                        id="family"
                                        freeSolo
                                        options={family.map((option) => option.fm)}
                                        renderInput={(params) => <TextField {...params} label="Семейное положение" />}
                                    />
                                </Stack>
                                </Tooltip>
                            </Grid>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>2.Документ, удостоверяющий личность</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <Grid item xs={12} sm={6}>
                                <h1> Тип документа:</h1>
                                <Tooltip title="Выберите из предложеных вариантов.">
                                <Stack spacing={2} sx={{ width: 300 }}>
                                    <Autocomplete
                                        id="tipydoc"
                                        freeSolo
                                        options={doc.map((option) => option.title)}
                                        renderInput={(params) => <TextField {...params} label="Тип документа" />}
                                    />
                                </Stack>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <h1> Идентификационнный номер:</h1>
                                <Tooltip title="Указан на последней странице Вашего документа, поле 'Identification No'. Например, 1234567Т890ТТ0.">
                                <TextField
                                    required
                                    id="namber"
                                    name="namber"
                                    label="Identification NO"
                                    fullWidth
                                    variant="standard"
                                />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <h1> Серия:</h1>
                                <Tooltip title="Указана на последней странице Вашего документа, первые две буквы поля 'Passport No'. Например,AA.">
                                <TextField
                                    required
                                    id="Seria"
                                    name="Seria"
                                    label="Первые две буквы Pasport NO"
                                    fullWidth
                                    variant="standard"
                                />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <h1> Номер:</h1>
                                <Tooltip title="Указан на последней странице Вашего документа, цифры в поле 'Passport No'. Например,1234567.">
                                <TextField
                                    required
                                    id="NSeria"
                                    name="NSeria"
                                    label=" Цифры Pasport NO"
                                    fullWidth
                                    variant="standard"
                                />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <h1> Кем выдан</h1>
                                <Tooltip title="Указана на предпоследнем развороте документа(стр.31 паспорта), поле 'Орган, выдавший паспорт'. Например, Борисовский РОВД Минской области.">
                                <TextField
                                    required
                                    id="vudpasport"
                                    name="vudpasport"
                                    label=" стр.31 паспорта"
                                    fullWidth
                                    variant="standard"
                                />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <h1> Дата выдачи:</h1>
                                <Tooltip title=" Например, 03.01.2017.">
                                <TextField
                                    required
                                    id="namber"
                                    name="namber"
                                    label="дд.мм.гггг"
                                    fullWidth
                                    variant="standard"
                                />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <h1> Срок действия:</h1>
                                <Tooltip title=" Например, 03.01.2030.">
                                <TextField
                                    required
                                    id="namber"
                                    name="namber"
                                    label="дд.мм.гггг"
                                    fullWidth
                                    variant="standard"
                                />
                                </Tooltip>
                            </Grid>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography>3.Образование</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <Grid item xs={12} sm={4}>
                                <h1> Уровень:</h1>
                                <Tooltip title="Выберите из предложеных вариантов.">
                                <Stack spacing={2} sx={{ width: 300 }}>
                                    <Autocomplete
                                        id="level"
                                        freeSolo
                                        options={level.map((option) => option.ad)}
                                        renderInput={(params) => <TextField {...params} label="Семейное положение" />}
                                    />
                                </Stack>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <h1> Учреждение:</h1>
                                <TextField
                                    required
                                    id="place"
                                    name="place"
                                    label="Введите учреждение Вашего образования"
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <h1>Документ:</h1>
                                <TextField
                                    required
                                    id="doc"
                                    name="doc"
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <h1> Номер учебного заведения или абривиатура:</h1>
                                <Tooltip title="Например, ГУО 'Средняя школа №59, г.Минск'.">
                                <TextField
                                    required
                                    id="places"
                                    name="places"
                                    fullWidth
                                    variant="standard"
                                />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <h1> Специальность в дипломе о среднем специальном образовании:</h1>
                                <Tooltip title="Выберите из предложеных вариантов.">
                                <Stack spacing={2} sx={{ width: 300 }}>
                                    <Autocomplete
                                        id="srobr"
                                        freeSolo
                                        options={srobr.map((option) => option.so)}
                                        renderInput={(params) => <TextField {...params} label="Специальность в дипломе о среднем специальном образовании:" />}
                                    />
                                </Stack>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <h1> Средний бал документа об образовании:</h1>
                                <TextField
                                    required
                                    id="srbal"
                                    name="srbal"
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <h1> Номер документа:</h1>
                                <Tooltip title="Указан в поле'№' документа на последней странице. Например, 1234567.">
                                <TextField
                                    required
                                    id="nd"
                                    name="nd"
                                    fullWidth
                                    variant="standard"
                                />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <h1> Дата окончания:</h1>
                                <Tooltip title="Например, 31.01.2010.">
                                    <TextField
                                        required
                                        id="datafinish"
                                        name="datafinish"
                                        fullWidth
                                        variant="standard"
                                    />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <h1> Иностранный язык:</h1>
                                <Tooltip title="Выберите из предложеных вариантов.">
                                <Stack spacing={2} sx={{ width: 300 }}>
                                    <Autocomplete
                                        id="language"
                                        freeSolo
                                        options={language.map((option) => option.l)}
                                        renderInput={(params) => <TextField {...params} label="Иностранный язык" />}
                                    />
                                </Stack>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControlLabel
                                    control={<Checkbox color="secondary" name="finish" value="yes"/>}
                                    label="Окончил(а) подготовительные курсы БГУИР?"
                                />
                            </Grid>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel4a-content"
                            id="panel4a-header"
                        >
                            <Typography>4.Адрес</Typography>
                        </AccordionSummary>
                        < AccordionDetails>
                            <Typography>
                                <Grid item xs={12} sm={3}>
                                    <h1> Индекс:</h1>
                                    <Tooltip title="Например, 210000.">
                                    <TextField
                                        required
                                        id="index"
                                        name="index"
                                        fullWidth
                                        variant="standard"
                                    />
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <h1> Страна:</h1>
                                    <Tooltip title="Выберите из предложеных вариантов.">
                                    <Stack spacing={2} sx={{ width: 300 }}>
                                        <Autocomplete
                                            id="strana"
                                            freeSolo
                                            options={strana.map((option) => option.str)}
                                            renderInput={(params) => <TextField {...params} label="Страна" />}
                                        />
                                    </Stack>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <h1> Область:</h1>
                                    <Tooltip title="Например, Минская.">
                                    <TextField
                                        required
                                        id="obl"
                                        name="obl"
                                        fullWidth
                                        variant="standard"
                                    />
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <h1> Район:</h1>
                                    <Tooltip title="Если необходимо, укажите район.">
                                    <TextField
                                        required
                                        id="rauon"
                                        name="rauon"
                                        fullWidth
                                        variant="standard"
                                    />
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <h1> Тип населённого пункта:</h1>
                                    <Tooltip title="Выберите из предложеных вариантов.">
                                    <Stack spacing={2} sx={{ width: 300 }}>
                                        <Autocomplete
                                            id="nasp"
                                            freeSolo
                                            options={nasp.map((option) => option.np)}
                                            renderInput={(params) => <TextField {...params} label="Тип населённого пункта" />}
                                        />
                                    </Stack>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <h1> Название населённого пункта:</h1>
                                    <Tooltip title="Например, Минск.">
                                    <TextField
                                        required
                                        id="namenp"
                                        name="namenp"
                                        fullWidth
                                        variant="standard"
                                    />
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <h1> Тип улицы:</h1>
                                    <Tooltip title="Выберите из предложеных вариантов.">
                                    <Stack spacing={2} sx={{ width: 300 }}>
                                        <Autocomplete
                                            id="typeyl"
                                            freeSolo
                                            options={typeyl.map((option) => option.yl)}
                                            renderInput={(params) => <TextField {...params} label="Тип улицы:" />}
                                        />
                                    </Stack>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <h1> Название улицы:</h1>
                                    <Tooltip title="Например, Ленинская.">
                                    <TextField
                                        required
                                        id="yl"
                                        name="yl"
                                        fullWidth
                                        variant="standard"
                                    />
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <h1> Номер дома:</h1>
                                    <Tooltip title="Например, 19.">
                                    <TextField
                                        required
                                        id="nomerdoma"
                                        name="nomerdoma"
                                        fullWidth
                                        variant="standard"
                                    />
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <h1> Номер корпуса:</h1>
                                    <Tooltip title="Например, А или 2.">
                                    <TextField
                                        required
                                        id="korpys"
                                        name="korpys"
                                        fullWidth
                                        variant="standard"
                                    />
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <h1> Номер квартиры:</h1>
                                    <Tooltip title="Например, 12.">
                                    <TextField
                                        required
                                        id="kv"
                                        name="kv"
                                        fullWidth
                                        variant="standard"
                                    />
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControlLabel
                                        control={<Checkbox color="secondary" name="obshaga" value="yes"/>}
                                        label="Нуждаюсь в общежитии на время учёбы"
                                    />
                                </Grid>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel5a-content"
                        id="panel5a-header"
                    >
                        <Typography>5.Телефон и email</Typography>
                    </AccordionSummary>
                    < AccordionDetails>
                        <Typography>
                            <Grid item xs={12} sm={3}>
                                <h1> Дом.телефон:</h1>
                                <Tooltip title="Например, 123-54-67.">
                                <TextField
                                    required
                                    id="domtel"
                                    name="domtel"
                                    fullWidth
                                    variant="standard"
                                />
                                </Tooltip>
                            </Grid><Grid item xs={12} sm={3}>
                            <h1> Код города:</h1>
                            <Tooltip title="Например, 017.">
                            <TextField
                                required
                                id="kodgoroda"
                                name="kodgoroda"
                                fullWidth
                                variant="standard"
                            />
                            </Tooltip>
                        </Grid>
                            <Grid item xs={12} sm={3}>
                            <h1> Моб.телефон:</h1>
                                <Tooltip title="Например, +375(29) 123 45 67.">
                            <TextField
                                required
                                id="mob"
                                name="mob"
                                fullWidth
                                variant="standard"
                            />
                                </Tooltip>
                        </Grid>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel6a-content"
                        id="pane6a-header"
                    >
                        <Typography>6.Льготы при зачислении</Typography>
                    </AccordionSummary>
                    < AccordionDetails>
                        <Typography>
                            <Grid item xs={12}>
                                <Tooltip title="ГЛАВА 4. Правила приёма. Например, победитель республиканской олимпиады по физике.">
                                <TextField
                                    required
                                    id="ligot"
                                    name="ligot"
                                    fullWidth
                                />
                                </Tooltip>
                            </Grid>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel7a-content"
                        id="panel7a-header"
                    >
                        <Typography>7.Трудовая деятельность</Typography>
                    </AccordionSummary>
                    < AccordionDetails>
                        <Typography>
                            <Grid item xs={12}>
                                <h1> Место работы и должность:</h1>
                                <Tooltip title="Например, ЗАО 'Компания', инженер-технолог.">
                                <TextField
                                    required
                                    id="rabdolgnost"
                                    name="rabdolgnost"
                                    fullWidth
                                />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <h1> Стаж(общий):</h1>
                                <TextField
                                    rrequired
                                    id="stag"
                                    name="stag"
                                    label="гг.мм"
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid><Grid item xs={12} sm={6}>
                            <h1> В том числе по профилю избранной специальности:</h1>
                            <TextField
                                required
                                id="documentstgprof"
                                name="documentstgprof"
                                label="гг.мм"
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel8a-content"
                        id="panel8a-header"
                    >
                        <Typography>8.Родители</Typography>
                    </AccordionSummary>
                    < AccordionDetails>
                        <Typography>
                            <Grid item xs={12} sm={6}>
                                <h1>Отец</h1>
                                <Grid item xs={12} >
                                    <h1> Тип родства:</h1>
                                    <Tooltip title="Выберите из предложенных вариантов.">
                                    <Stack spacing={2} sx={{ width: 300 }}>
                                        <Autocomplete
                                            id="dad"
                                            freeSolo
                                            options={dad.map((option) => option.pa)}
                                            renderInput={(params) => <TextField {...params} label="Тип родства" />}
                                        />
                                    </Stack>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12}>
                                    <h1> Фамилия:</h1>
                                    <Tooltip title="Например, Иванов.">
                                    <TextField
                                        required
                                        id="firstNamep"
                                        name="firstNamep"
                                        fullWidth
                                        variant="standard"
                                    />
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12}>
                                    <h1> Имя:</h1>
                                    <Tooltip title="Например, Иван.">
                                    <TextField
                                        required
                                        id="lastNamep"
                                        name="lastNamep"
                                        fullWidth
                                        variant="standard"
                                    />
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <h1> Отчество:</h1>
                                    <Tooltip title="Например, Петрович.">
                                    <TextField
                                        required
                                        id="Otchp"
                                        name="Otchp"
                                        fullWidth
                                        variant="standard"
                                    />
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} >
                                    <h1> Адрес:</h1>
                                    <Grid item xs={12} >
                                        <FormControlLabel
                                            control={<Checkbox color="secondary" name="adrp" value="yes"/>}
                                            label="такой же, как и абитуриета"
                                        />
                                    </Grid>
                                    <Tooltip title="Например, 210000, Республика Беларусь, г.Минск, ул.3-я Строителей, д.25, кв.12.">
                                    <TextField
                                        required
                                        id="adrp"
                                        name="adrp"
                                        fullWidth
                                    />
                                    </Tooltip>
                                </Grid>

                            </Grid>
                            <h1>Мать</h1>
                            <Grid item xs={12} sm={6}>
                            <h1> Тип родства:</h1>
                            <Stack spacing={2} sx={{ width: 300 }}>
                                <Tooltip title="Выберите из предложенных вариантов.">
                                <Autocomplete
                                    id="mama"
                                    freeSolo
                                    options={mama.map((option) => option.ma)}
                                    renderInput={(params) => <TextField {...params} label="Тип родства" />}
                                />
                                </Tooltip>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                                <h1> Фамилия:</h1>
                            <Tooltip title="Например, Иванова.">
                                <TextField
                                    required
                                    id="firstNamem"
                                    name="firstNamem"
                                    fullWidth
                                    variant="standard"
                                />
                            </Tooltip>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <h1> Имя:</h1>
                                <Tooltip title="Например, Мария.">
                                <TextField
                                    required
                                    id="lastNamem"
                                    name="lastNamem"
                                    fullWidth
                                    variant="standard"
                                />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <h1> Отчество:</h1>
                                <Tooltip title="Например, Олеговна.">
                                <TextField
                                    required
                                    id="Otchm"
                                    name="Otchm"
                                    fullWidth
                                    variant="standard"
                                />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <h1> Адрес:</h1>
                                <Grid item xs={12} sm={6}>
                                    <FormControlLabel
                                        control={<Checkbox color="secondary" name="adrm" value="yes"/>}
                                        label="такой же, как и абитуриета"
                                    />
                                </Grid>
                                <Tooltip title="Например, 210000, Республика Беларусь, г.Минск, ул.3-я Строителей, д.25, кв.12.">
                                <TextField
                                    required
                                    id="adrm"
                                    name="adrm"
                                    fullWidth
                                />
                                </Tooltip>
                            </Grid>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Button className={classes.UserInfo} variant="outlined" endIcon={<SendIcon/>}>Сохранить</Button>
                <Button onClick={handleClick} style={{marginTop: "100px"}}>Asdasdasda</Button>
            </div>
        </React.Fragment>
    );
}
