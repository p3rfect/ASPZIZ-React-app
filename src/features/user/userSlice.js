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
        }
    }
})

export const {setUser, register} = userSlice.actions
export default userSlice.reducer