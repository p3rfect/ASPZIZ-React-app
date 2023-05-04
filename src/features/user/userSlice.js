import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: '',
        role: '',
        isAuth: false
    },
    reducers: {
        setUser: (state, action) => {
            state.role = action.payload.role
            state.email = action.payload.email
            state.isAuth = true
        },
        getIsAuth: (state) => state.isAuth
    }
})

export const {setUser, getIsAuth} = userSlice.actions
export default userSlice.reducer