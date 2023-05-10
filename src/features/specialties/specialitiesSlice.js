import {createSlice} from "@reduxjs/toolkit";

export const specialitiesSlice = createSlice({
    name: 'specialities',
    initialState: {
        specialitiesList: []
    },
    reducers: {
        setSpecialtiesList: (state, action) => {
            state.specialitiesList = action.payload.list
        }
    }
})

export const {setSpecialtiesList} = specialitiesSlice.actions
export default specialitiesSlice.reducer