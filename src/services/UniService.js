import $api from '../http/index'

export const getAllSpecialities = () => {
    try{
        return $api.get('/getspecialties')
    } catch (e) {
        throw new Error(e)
    }
}