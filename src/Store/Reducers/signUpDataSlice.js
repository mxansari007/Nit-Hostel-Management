import { createSlice } from "@reduxjs/toolkit";

export const signUpDataSlice = createSlice({
    name:'signUpData',
    initialState:{data:{
        }
    },


    reducers:{
        setProfile:(state,action)=>{
            state.data ={...action.payload,...state.data};
            // delete state.data.confirm;
            console.log(state.data);
        },

        setAdditional:(state,action)=>{
            state.data = {...action.payload,...state.data};
                console.log(state.data);
        }
        
    }
});

export const {setProfile,setAdditional} = signUpDataSlice.actions;
export default signUpDataSlice.reducer;