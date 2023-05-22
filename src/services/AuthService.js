import $api from '../http/index.js'

export const login = async (email, password) => {
    try {
        const formData = new FormData()
        formData.append("grant_type", "password")
        formData.append("email", email)
        formData.append("password", password)
        const response = await $api.post('/token/getnew', formData)
        localStorage.setItem('accessToken', response.data.access_token)
        return response
    } catch (e) {
        console.log(e)
        throw new Error(e.response.data.errorText)
    }
}

export const register = async (email, password) => {
    try {
        const formData = new FormData()
        formData.append("email", email)
        formData.append("password", password)
        return await $api.post('/register', formData)
    } catch (e) {
        throw new Error(e.response.data.errorText)
    }
}


export const checkAuth = async () => {
    try{
        const response = await $api.get('/token/isvalid')
        if (response.status === 200) return true;
    } catch (e) {
        return false;
    }
}