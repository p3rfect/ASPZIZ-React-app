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
        formData1.append('examsJsonStr', JSON.stringify(formData))
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
        if (response.data.LanguageExam === '') return exams
        exams[0] = {id: 1, name: (response.data.IsRussian ? 'Русский язык' : 'Белорусский язык'),
                    type: response.data.LanguageExam, points: response.data.LanguageScore,
                    schoolPoints: response.data.LanguageMark}
        exams[1] = {id: 2, name: 'Математика', type: response.data.MathExam, points: String(response.data.MathScore),
                    schoolPoints: String(response.data.MathMark)}
        exams[2] = {id: 3, name: (response.data.IsPhysics ? 'Физика' : 'Английский язык'),
                    type: response.data.PhysicsExam, points: String(response.data.PhysicsScore),
                    schoolPoints: String(response.data.PhysicsMark)}
        return exams
    } catch (e) {
        console.log(e)
        throw new Error(e.response.data.errorText)
    }
}