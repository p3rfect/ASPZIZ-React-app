import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice.js"
import specialitiesReducer from "../features/specialties/specialitiesSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        specialities: specialitiesReducer
    }
})