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
    },
    reducers:{
        next:(state)=>{
            state.pageCount = state.pageCount + 10;
            console.log(state.pageCount);
            state.floorQuery = -1;
            state.roomQuery = 0;
        },
        prev:(state)=>{
            if(state.pageCount>0){
                state.pageCount =state.pageCount - 10;
                console.log(state.pageCount);

            }
            else{
                state.pageCount = 0;
            }

            state.floorQuery = -1;
            state.roomQuery = 0;
        },
        setRows:(state,action)=>{
            state.rows = action.payload;
        },
        setRoomQuery:(state,action)=>{
            state.roomQuery = action.payload;
            state.floorQuery = -1;
        },
        setFloorQuery:(state,action)=>{
            state.floorQuery = action.payload;
            state.roomQuery = 0;
        },
        setTotalRooms:(state,action)=>{
            state.totalRooms = action.payload;
        },
        setTotalOccupied:(state,action)=>{
            state.totalOccupied = action.payload;
        },
        reset:(state)=>{
            state.pageCount = 10;
        }
    }
})



export const {next,prev,setRows,setRoomQuery,setFloorQuery,setTotalRooms,setTotalOccupied,reset} = roomSlice.actions;
export default roomSlice.reducer;

