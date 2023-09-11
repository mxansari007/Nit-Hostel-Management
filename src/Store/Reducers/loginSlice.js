import {createSlice} from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name:'isLoggedIn',
    initialState:{
        value:false,
        tokken:null,
        logoutLoading:false,
        page:'',
    },
    reducers:{
        login:(state) =>{
            state.value = true
            localStorage.setItem('localLogin',true);
        },
        logout: (state) => {
            localStorage.removeItem('localLogin');
            state.value = false
        },
        initialLogin:(state)=>{
            state.value = true;
        }
    }
})

export default loginSlice.reducer 

export const {login,logout,initialLogin} = loginSlice.actions; 