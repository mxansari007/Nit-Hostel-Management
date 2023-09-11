import {createSlice} from '@reduxjs/toolkit';



export const roomSlice = createSlice({
    name:'roomHandle',
    initialState:{
        pageCount:0,
        rows:[{roomNo:"",floorNo:"",students:[],status:"",occupancy:""}],
        roomQuery:0,
        floorQuery:-1,
        totalRooms:0,
        totalOccupied:0,
        halfFilled:0,
    },
    reducers:{
        setRows:(state,action)=>{
            state.rows = action.payload;
        },
        setTotalRooms:(state,action)=>{
            state.totalRooms = action.payload;
        },
        setTotalOccupied:(state,action)=>{
            state.totalOccupied = action.payload;
        },
        setHalfFilled:(state,action) =>{
            state.halfFilled = action.payload;
        },
        reset:(state)=>{
            state.pageCount = 10;
        },
    }
})



export const {setRows,setRoomQuery,setFloorQuery,setTotalRooms,setTotalOccupied,reset,setHalfFilled} = roomSlice.actions;
export default roomSlice.reducer;

