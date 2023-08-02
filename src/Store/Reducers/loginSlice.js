import {createSlice} from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name:'isLoggedIn',
    initialState:{
        value:false,
        tokken:null,
    },
    reducers:{
        login:(state,action) =>{
            state.value = true
            localStorage.setItem('userTokken',action.payload);
        },
        logout: (state) => {
            state.value = false
            localStorage.removeItem('userTokken');
          
        }
    }
})

export default loginSlice.reducer 

export const {login,logout} = loginSlice.actions; 