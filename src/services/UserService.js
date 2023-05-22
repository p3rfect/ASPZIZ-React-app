import $api from '../http/index.js'

export const postUserExams = async (exams, email) => {
    try {
        const formData = {}
        exams.forEach(exam => {
            if (exam.name === 'Русский язык' || exam.name === 'Белорусский язык') {
                formData.IsRussian = (exam.name === 'Русский язык')
                formData.LanguageExam = exam.type
                formData.LanguageScore = Number(exam.points)
                formData.LanguageMark = Number(exam.schoolPoints)
            }
            else if (exam.name === 'Математика') {
                formData.MathExam = exam.type
                formData.MathScore = Number(exam.points)
                formData.MathMark = Number(exam.schoolPoints)
            }
            else if (exam.name === 'Физика' || exam.name === 'Английский язык'){
                formData.IsPhysics = (exam.name === 'Физика')
                formData.PhysicsExam = exam.type
                formData.PhysicsScore = Number(exam.points)
                formData.PhysicsMark = Number(exam.schoolPoints)
            }
        })
        const formData1 = new FormData()
        formData1.append('exams', JSON.stringify(formData))
        formData1.append('email', email)
        await $api.post('/user/exams/update', formData1)
    } catch (e) {
        throw new Error(e.response.data.errorText)
    }
}

export const getUserExams = async (email) => {
    try{
        let exams = [
            {id: 1, name: '', type: '', points: '', schoolPoints: ''},
            {id: 2, name: '', type: '', points: '', schoolPoints: ''},
            {id: 3, name: '', type: '', points: '', schoolPoints: ''}
        ]
        const response = await $api.get(`/user/exams/get?email=${email}`)
        if (response.data.languageExam === '') return exams
        exams[0] = {id: 1, name: (response.data.isRussian ? 'Русский язык' : 'Белорусский язык'),
                    type: response.data.languageExam, points: response.data.languageScore,
                    schoolPoints: response.data.languageMark}
        exams[1] = {id: 2, name: 'Математика', type: response.data.mathExam, points: String(response.data.mathScore),
                    schoolPoints: String(response.data.mathMark)}
        exams[2] = {id: 3, name: (response.data.isPhysics ? 'Физика' : 'Английский язык'),
                    type: response.data.physicsExam, points: String(response.data.physicsScore),
                    schoolPoints: String(response.data.physicsMark)}
        return exams
    } catch (e) {
        throw new Error(e.response.data.errorText)
    }
}

export const updateUserSpecialities = async (financingFormPeriod, specialityCodes, email) => {
    try{
        // console.log(specialityCodes)
        const formData = new FormData()
        formData.append("email", email)
        formData.append("FinancingFormPeriod", financingFormPeriod)
        formData.append("SpecialtiesCodes", specialityCodes)
        await $api.post('/user/specialties/update', formData)
    } catch (e) {
        console.log(e);
        throw new Error(e.response.data.errorText);
    }
}