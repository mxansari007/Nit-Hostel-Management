import { TextField,Button } from '@mui/material';
import './assets/AllotRooms.css';
import {useRef, useState,useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import ViewDetails from './ViewDetails.jsx';
import ActionAllot from './ActionAllot';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import {next,prev,setRows,setFloorQuery,setRoomQuery, setTotalRooms,setTotalOccupied,reset} from '../../../Store/Reducers/roomSlice';
import { useSelector,useDispatch } from 'react-redux';

const config = {
  headers: {
    "Content-Type": "application/json"
    },
    withCredentials: true
  }






const AllotRooms = ()=>{


const Dispatch = useDispatch();
const pageCount = useSelector(state => state.roomHandle.pageCount);
const rows = useSelector(state=>state.roomHandle.rows);
const roomQuery = useSelector(state => state.roomHandle.roomQuery);
const floorQuery = useSelector(state => state.roomHandle.floorQuery);
const totalRooms = useSelector(state=>state.roomHandle.totalRooms);
const totalOccupied = useSelector(state=>state.roomHandle.totalOccupied);
  
const columns = [
  { field: 'roomNo', headerName: 'Room No', width: 100 },
  { field: 'floorNo', headerName: 'Floor No', width: 90 },
  { 
    field: 'student1', 
    headerName: 'Student #1', 
    width: 150,
    valueGetter:(params) =>{
      if(params.row.students.length == 0){
        return '-';
      }else if(params.row.students.length > 0){
        return `${params.row.students[0].firstName} ${params.row.students[0].lastName}`;
      }
    }
   },
  { 
    field: 'student2', 
    headerName: 'Student #2', 
    width: 150,
    valueGetter:(params) =>{
      if(params.row.students.length <= 1){
        return '-';
      }else if(params.row.students.length > 1){
        return `${params.row.students[1].firstName} ${params.row.students[1].lastName}`;
      }
    }
  },
   {
    field: 'occupancy',
    headerName: 'Occupancy',
    type: 'number',
    width: 90,
  },
  {
    field: 'status',
    headerName: 'Status',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 140,
  },
  {
    field: "Allot",
    headerName: "Allot Rooms",
    sortable: false,
    renderCell: ({ row }) =>
    <ActionAllot row={row} pageCount={pageCount}/>
  },
  {
    field: "viewDetails",
    headerName: "View Details",
    width: 160,
    sortable: false,
    renderCell: ({ row }) =>
          <ViewDetails row={row} />
  }

];


useEffect(()=>{

    axios.get(import.meta.env.VITE_BASE_URL + '/allotRooms',config)
    .then(res=>{
      // setRows(res.data.data);
      Dispatch(setRows(res.data.data));
      // setTotalRooms(res.data.totalRooms);
      // setTotalOccupied(res.data.fullyOccupiedRooms);
      Dispatch(setTotalRooms(res.data.totalRooms));
      Dispatch(setTotalOccupied(res.data.fullyOccupiedRooms));
    })
    .catch(err=>console.log(err));
  },[])


  const handleChange = (event)=>{
      if(event.target.name === 'roomField'){
        Dispatch(setRoomQuery(event.target.value));
      }else if(event.target.name === 'floorField'){
        console.log(event.target.value);
        Dispatch(setFloorQuery(event.target.value));
      }
  }

  const handleSubmit = (event)=>{
      if(event.target.name === "roomSubmit"){
        axios.get(import.meta.env.VITE_BASE_URL + `/allotRooms?roomNo=${roomQuery}`)
        .then(res =>{Dispatch(setRows([res.data.data[0]]));console.log(res.data.data[0])});
      }else if(event.target.name === "floorSubmit"){
        console.log(floorQuery);
        console.log('hit');
        axios.get(import.meta.env.VITE_BASE_URL + `/allotRooms?floorNo=${floorQuery}`)
        .then(res =>{Dispatch(setRows(res.data.data));console.log(res.data.data)});
      }
  }
//?status=vacant,Fully-filled,Half-filled


//Pagination
const fetchData = async ()=>{
  axios.get(import.meta.env.VITE_BASE_URL + `/allotRooms?page=${pageCount}`,config).
  then(res=>{Dispatch(setRows(res.data.data))}).
  catch(err=>{console.log(err);});
}


useEffect(()=>{
  fetchData();
},[pageCount]);


const handleNextPage =async () =>{
    Dispatch(next());
}



const handlePerviousPage =async ()=>{
    Dispatch(prev());

}

const handleReset = () =>{
  axios.get(import.meta.env.VITE_BASE_URL + '/allotRooms',config)
  .then(res=>{
    Dispatch(setRows(res.data.data));
    Dispatch(setTotalRooms(res.data.totalRooms));
    Dispatch(setTotalOccupied(res.data.fullyOccupiedRooms));
  })
  .catch(err=>console.log(err));
  Dispatch(reset());
}


return (<>
<div className="room-container">

<div className='Heading'>
    <h1>Room Allotment System</h1>
</div>

<div className='upper-area'>
    <div className="badges">
        <div className='badge'>
            <p>{totalRooms}</p>
            <p className='badge-title'>Total Rooms</p>
        </div>
        <div className='badge'>
            <p>{totalOccupied}</p>
            <p className='badge-title'>Occupied</p>
        </div>
        <div className='badge'>
            <p>{totalRooms-totalOccupied}</p>
            <p className='badge-title'>Vacant</p>
        </div>
    </div>
    
    <div className='search-area'>
  
        <div className='room-search'>
            <p style={{display:'inline'}}>Room No: </p>
            <TextField name="roomField" onChange={handleChange} size="small" variant='outlined' label='Room Search' />
            <Button onClick={handleSubmit} name="roomSubmit" sx={{ml:'7px'}} variant='contained'>Search</Button>
        </div>
        <div className='floor-search'>
        <p style={{display:'inline'}}>Floor No: </p>
            <TextField onChange={handleChange} name="floorField" variant='outlined' size="small" label='Floor Search'/>
            <Button onClick={handleSubmit} name="floorSubmit" sx={{ml:'7px'}} variant='contained'>Search</Button>
        </div>

    </div>
</div>

<div className='table-area'>
  <div style={{ height: 650, width: '100%' }}>
        <DataGrid
          getRowId={(row) => row.roomNo}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection
        />
  </div>
  <div className='pageButtons'>
  <Button variant='contained' onClick={handlePerviousPage}>Prev</Button>
  <Button variant='contained' onClick={handleReset}>Reset</Button>
  <Button variant='contained' onClick={handleNextPage}>Next</Button>
  </div>
</div>



</div>
    </>)
}


export default AllotRooms;











