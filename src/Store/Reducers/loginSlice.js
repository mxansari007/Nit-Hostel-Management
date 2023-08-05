import {createSlice} from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name:'isLoggedIn',
    initialState:{
        value:false,
        tokken:null,
    },
    reducers:{
        login:(state) =>{
            state.value = true
            localStorage.setItem('localLogin',true);
        },
        logout: (state) => {
            state.value = false
            localStorage.removeItem('localLogin');
        }
    }
})

export default loginSlice.reducer 

export const {login,logout} = loginSlice.actions; 