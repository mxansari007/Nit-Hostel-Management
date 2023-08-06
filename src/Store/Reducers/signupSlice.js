import { createSlice } from "@reduxjs/toolkit";


export const signupSlice = createSlice({
    name:'signupProgress',
    initialState:{
        count:0,
        signedUp:false,
    },

    reducers:{
        prev:(state)=>{
            if(state.count>0){
            state.count = state.count -50;
            }
        },
        next:(state)=>{
            if(state.count<100){
                state.count = state.count + 50;
            }
            console.log(state.count);
        },
        reset:(state)=>{
            state.count = 0;
        },
        signedUpDone:(state)=>{
            state.signedUp = true;
            console.log(state.signedUp);
        },

    }
})

export default signupSlice.reducer;
export const {prev,next,signedUpDone,reset} = signupSlice.actions;