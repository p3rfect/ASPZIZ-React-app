import $api from '../http/index'

export const getAdminUser = async (email) => {
    try{
        return $api.get(`/admin/user/get?email=${email}`)
    } catch (e) {
        throw new Error(e)
    }
}

export const Enroll = async () => {
    try {
        await $api.get('admin/enroll')
    } catch (e) {
        throw new Error(e)
    }
}