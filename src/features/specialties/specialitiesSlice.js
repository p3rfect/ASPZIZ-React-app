import {createSlice} from "@reduxjs/toolkit";

export const specialitiesSlice = createSlice({
    name: 'specialities',
    initialState: {
        specialitiesList: []
    },
    reducers: {
        setSpecialtiesList: (state) => {
            state.specialitiesList = [{name: "asdasdasd"}]
        }
    }
})

export const {setSpecialtiesList} = specialitiesSlice.actions
export default specialitiesSlice.reducer