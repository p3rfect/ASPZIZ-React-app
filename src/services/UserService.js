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
        formData1.append('userexams', JSON.stringify(formData))
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

export const getUserSpecialities = async (email) => {
    try{
        return await $api.get(`/user/specialties/get?email=${email}`)
    } catch (e) {
        throw new Error(e)
    }
}

export const updateUserSpecialities = async (financingFormPeriod, specialityCodes, email) => {
    try{
        // console.log(specialityCodes)
        const formData = new FormData()
        const obj = {FinancingFormPeriod: financingFormPeriod, SpecialtiesCodes: specialityCodes}
        formData.append("email", email)
        formData.append("userspecialties", JSON.stringify(obj))
        await $api.post('/user/specialties/update', formData)
    } catch (e) {
        console.log(e);
        throw new Error(e.response.data.errorText);
    }
}

export const updateUserInfo = async (userInfo, email) => {
    try{
        const formData = new FormData()
        userInfo.AverageScore = Number(userInfo.AverageScore)
        userInfo.IsMale = (userInfo.Gender === 'Мужской')
        userInfo.IsSingle = (userInfo.Family === 'Холост/ не замужем')
        formData.append("email", email)
        formData.append("userinfo", JSON.stringify(userInfo))
        await $api.post('/user/info/update', formData)
    } catch (e){
        console.log(e)
        throw new Error(e)
    }
}

export const getUserInfo = async (email) => {
    try{
        const response = await $api.get(`/user/info/get?email=${email}`)
        const userInfo = response.data
        userInfo.Gender = (userInfo.isMale ? 'Мужской' : 'Женский')
        userInfo.Family = (userInfo.isSingle ? 'Холост/ не замужем' : 'Женат/замужем')
        const result = {}
        Object.entries(userInfo).forEach(([key, value]) => {
            let newKey = key.charAt(0).toUpperCase() + key.slice(1)
            result[newKey] = value
        })
        console.log(result)
        return result
    } catch (e) {
        throw new Error(e)
    }
}