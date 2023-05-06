import {combineReducers, configureStore} from "@reduxjs/toolkit"
import userReducer from "../features/user/userSlice.js"
import { persistReducer, persistStore } from 'redux-persist'
import specialitiesReducer from "../features/specialties/specialitiesSlice"
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'
import thunk from 'redux-thunk'

const persistConfig = {
    key: 'root',
    storage: storageSession,
}

const rootReducer = combineReducers({
    user: userReducer,
    specialities: specialitiesReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})

export const persistor = persistStore(store)