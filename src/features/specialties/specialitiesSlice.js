import {createSlice} from "@reduxjs/toolkit";
import {getAllSpecialities} from "../../services/UniService";

export const specialitiesSlice = createSlice({
    name: 'specialities',
    initialState: {
        specialitiesList: []
    },
    reducers: {
        setSpecialtiesList: async (state) => {
            console.log(await getAllSpecialities())
            state.specialitiesList = [{name: "asdasdasd"}]
        }
    }
})

export const {setSpecialtiesList} = specialitiesSlice.actions
export default specialitiesSlice.reducer