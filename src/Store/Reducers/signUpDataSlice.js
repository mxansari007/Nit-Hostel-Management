import { createSlice } from "@reduxjs/toolkit";

export const signUpDataSlice = createSlice({
    name:'signUpData',
    initialState:{data:{
        }
    },


    reducers:{
        setProfile:(state,action)=>{
            state.data ={...state.data,...action.payload};
            // delete state.data.confirm;
            console.log(state.data);
        },
    }
});

export const {setProfile,setAdditional} = signUpDataSlice.actions;
export default signUpDataSlice.reducer;