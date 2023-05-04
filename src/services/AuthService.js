import $api from '../http/index.js'

export const login = async (email, password) => {
    try {
        const formData = new FormData()
        formData.append("grant_type", "password")
        formData.append("email", email)
        formData.append("password", password)
        return await $api.post('/token', formData)
    } catch (e) {
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

export const test = async (email) => {
    const formData = new FormData();
    formData.append("email", email);

    const response = await fetch("https://localhost:44387/test", {
        method: "GET",
        headers: {"Accept": "application/json"},
        mode: "cors"
    });
    const data = await response.json()

    console.log(data)

    // if (!response.ok) {
    //     throw new Error(data.errorText)
    // }
}