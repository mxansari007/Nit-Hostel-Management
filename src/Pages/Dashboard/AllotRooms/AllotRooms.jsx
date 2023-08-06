import './assets/AllotRooms.css';
import { useRef } from 'react';
import { TextField,Button } from '@mui/material';

const AllotRooms = ()=>{

const searchInput = useRef();
const handleRoomQuery = ()=>{
    // const searchBox = document.getElementById("room-search");
    console.log(searchInput.target);
}
    return <>

    {/* <input  type="text" placeholder="Enter Room no"/> */}
    <TextField ref={searchInput} id="outlined-basic" label="Enter Room no" variant="outlined" type="text" placeholder="Enter Room no"/>
    {/* <button onClick={handleRoomQuery}>Search</button> */}
    <Button variant='contained' onClick={handleRoomQuery}>Search</Button>

    
    </>
}


export default AllotRooms;