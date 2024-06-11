import {configureStore} from '@reduxjs/toolkit'
import usersCountReducer from './features/users/usersCountSlice'
import selectedMenuReducer from './features/dropdown/selectedMenuSlice'
export default configureStore({
    reducer:{
        usersCount:usersCountReducer,
        selectedMenu:selectedMenuReducer
    }
})