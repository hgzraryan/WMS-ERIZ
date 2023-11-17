import {configureStore} from '@reduxjs/toolkit'
import usersCountReducer from './features/users/usersCountSlice'
export default configureStore({
    reducer:{
        usersCount:usersCountReducer
    }
})