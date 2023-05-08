import $api from '../http/index.js'

export const postUserExams = async (exams) => {
    try {
        const formData = new FormData()
        exams.forEach(exam => {
            if (exam.name === 'Русский язык' || exam.name === 'Белорусский язык') {
                formData.append('IsRussian', (exam.name === 'Русский язык' ? 'true' : 'false'))
                formData.append('LanguageExam', exam.type)
                formData.append('LanguageScore', exam.points)
                formData.append('LanguageMark', exam.schoolPoints)
            }
            else if (exam.name === 'Математика') {
                formData.append('MathExam', exam.type)
                formData.append('MathScore', exam.points)
                formData.append('MathMark', exam.schoolPoints)
            }
            else if (exam.name === 'Физика' || exam.name === 'Английский язык'){
                formData.append('IsPhysics', (exam.name === 'Физика' ? 'true' : 'false'))
                formData.append('PhysicsExam', exam.type)
                formData.append('PhysicsScore', exam.points)
                formData.append('PhysicsMark', exam.schoolPoints)
            }
        })
        await $api.post('/user/exams/update', formData)
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
        throw new Error(e.response.data.errorText)
    }
}