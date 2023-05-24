import $api from '../http/index'

export const getAllSpecialities = async (FinancingFormPeriod) => {
    try{
        const response = await $api.get('/allspecialties/get')
        const result = []
        response.data.forEach(({isPhysics, specialtyCode, specialtyFacultyAndName, financingFormPeriod}) => {
            if (financingFormPeriod.includes(FinancingFormPeriod) || FinancingFormPeriod === ',,') {
                const [faculty, name] = specialtyFacultyAndName.split(';')
                const index = result.find((obj) => obj.faculty === faculty)
                if (index === undefined) {
                    result.push({
                        faculty: faculty,
                        specialities: [{code: specialtyCode, isPhysics: isPhysics, name: name}]
                    })
                } else {
                    index.specialities.push({code: specialtyCode, isPhysics: isPhysics, name: name})
                }
            }
        })
        return result
    } catch (e) {
        throw new Error(e.response.data.errorText)
    }
}