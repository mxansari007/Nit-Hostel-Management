import { configureStore } from "@reduxjs/toolkit";
import loginSlice from './Reducers/loginSlice';
import signupSlice from "./Reducers/signupSlice";
import signUpDataSlice from "./Reducers/signUpDataSlice";
import roomSlice from './Reducers/roomSlice';
export default configureStore({

    reducer:{
       isLoggedIn : loginSlice,
       signupProgress:signupSlice,
       signUpData: signUpDataSlice,
        roomHandle:roomSlice,
    }
})