import { configureStore } from "@reduxjs/toolkit";
import loginSlice from './Reducers/loginSlice';

export default configureStore({

    reducer:{
       isLoggedIn : loginSlice
    }
})