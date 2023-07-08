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
            localStorage.setItem('userId',state.value);
        },
        logout: (state) => {
            state.value = false
            localStorage.removeItem('userId');
        }
    }
})

export default loginSlice.reducer 

export const {login,logout} = loginSlice.actions; 