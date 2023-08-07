import { createSlice } from "@reduxjs/toolkit";
export const signUpDataSlice = createSlice({
    name:'signUpData',
    initialState:{data:{
        }
    },


    reducers:{
        setProfile:(state,action)=>{
            state.data ={...state.data,...action.payload};
            delete state.data.confirm;
            console.log(state.data);
        },
        setAdditional:(state,action)=>{
            state.data = {...state.data,...action.payload};
            console.log(state.data);
        },
        setBank:(state,action)=>{
            state.data = {...state.data,...action.payload};
            console.log(state.data);
        },
        setImage:(state,action)=>{
            state.data = {...state.data,...action.payload};
            console.log(state.data);
        }
    }
});

export const {setProfile,setAdditional,setBank,setImage} = signUpDataSlice.actions;
export default signUpDataSlice.reducer;