import $api from '../http/index'

export const getAllSpecialities = async (financingFormPeriod) => {
    try{
        const response = await $api.get('/allspecialties/get')
        const result = []
        response.data.forEach(({IsPhysics, SpecialtyCode, SpecialtyFacultyAndName, FinancingFormPeriod}) => {
            if (financingFormPeriod === FinancingFormPeriod) {
                const [faculty, name] = SpecialtyFacultyAndName.split(';')
                const index = result.find((obj) => obj.faculty === faculty)
                if (index === undefined) {
                    result.push({
                        faculty: faculty,
                        specialities: [{code: SpecialtyCode, isPhysics: IsPhysics, name: name}]
                    })
                } else {
                    index.specialities.push({code: SpecialtyCode, isPhysics: IsPhysics, name: name})
                }
            }
        })
        return result
    } catch (e) {
        throw new Error(e.response.data.errorText)
    }
}