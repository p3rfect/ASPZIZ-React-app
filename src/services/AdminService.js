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

export const acceptUser = async (email) => {
    try{
        const formData = new FormData()
        formData.append('email', email)
        await $api.post('/admin/user/accept', formData)
    } catch (e) {
        throw new Error(e)
    }
}