import $api from '../http/index'

export const getAllSpecialities = () => {
    try{
        return $api.get('/allspecialties/get')
    } catch (e) {
        throw new Error(e.response.data.errorText)
    }
}