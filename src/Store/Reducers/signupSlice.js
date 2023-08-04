import { createSlice } from "@reduxjs/toolkit";


export const signupSlice = createSlice({
    name:'signupProgress',
    initialState:{
        count:0,
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
        }
    }
})

export default signupSlice.reducer;
export const {prev,next} = signupSlice.actions;