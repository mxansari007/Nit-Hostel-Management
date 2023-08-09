import { TextField,Button } from '@mui/material';
import './assets/AllotRooms.css';
import {useRef, useState,useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import ViewDetails from './ViewDetails.jsx';
import ActionAllot from './ActionAllot';
import axios from 'axios';
import ReactPaginate from 'react-paginate';


const columns = [
  { field: 'roomNo', headerName: 'Room No', width: 70 },
  { field: 'floorNo', headerName: 'Floor No', width: 70 },
  { 
    field: 'student1', 
    headerName: 'Student #1', 
    width: 130,
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
    width: 130,
    valueGetter:(params) =>{
      if(params.row.students.length <= 1){
        return '-';
      }else if(params.row.students.length > 1){
        return `${params.row.students[1].firstName} ${params.row.students[1].lastName}`;
      }
    }
  },
  { field: 'student3', 
    headerName: 'Student #3', 
    width: 130,
    valueGetter:(params) =>{
      if(params.row.students.length <= 2){
        return '-';
      }else if(params.row.students.length === 3){
        return `${params.row.students[2].firstName} ${params.row.students[2].lastName}`;
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
    width: 80,
  },
  {
    field: "Allot",
    headerName: "Allot Rooms",
    sortable: false,
    renderCell: ({ row }) =>
    <ActionAllot row={row} />
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

const config = {
  headers: {
    "Content-Type": "application/json"
    },
    withCredentials: true
  }






const AllotRooms = ()=>{

const [pageCount,setPageCount] = useState(10);
const [rows,setRows] = useState([{roomNo:"",floorNo:"",students:[],status:"",occupancy:""}]);
const [totalRooms,setTotalRooms] = useState(0);
const [totalOccupied,setTotalOccupied] = useState(0);
  

useEffect(()=>{

    axios.get(import.meta.env.VITE_BASE_URL + '/allotRooms',config)
    .then(res=>{
      setRows(res.data.data);
      setTotalRooms(res.data.totalRooms);
      setTotalOccupied(res.data.fullyOccupiedRooms);
    })
    .catch(err=>console.log(err));
  },[])

  const [roomQuery,setRoomQuery] = useState();
  const [floorQuery,setFloorQuery] = useState();

  const handleChange = (event)=>{
      if(event.target.name === 'roomField'){
        setRoomQuery(event.target.value);
      }else if(event.target.name === 'floorField'){
        console.log(event.target.value);
        setFloorQuery(event.target.value);
      }
  }

  const handleSubmit = (event)=>{
      if(event.target.name === "roomSubmit"){
        axios.get(import.meta.env.VITE_BASE_URL + `/allotRooms?roomNo=${roomQuery}`)
        .then(res =>{setRows([res.data.data[0]]);console.log(res.data.data[0])});
      }else if(event.target.name === "floorSubmit"){
        console.log(floorQuery);
        console.log('hit');
        axios.get(import.meta.env.VITE_BASE_URL + `/allotRooms?floorNo=${floorQuery}`)
        .then(res =>{setRows(res.data.data);console.log(res.data.data)});
      }
  }
//?status=vacant,Fully-filled,Half-filled



  //Pagination backend
const handleNextPage = ()=>{
  setPageCount(pageCount+10);
    axios.get(import.meta.env.VITE_BASE_URL + `/allotRooms?page=${pageCount}`,config).
    then(res=>{setRows(res.data.data); if(res.data.data.length===0){
        setPageCount(pageCount-10);
    }}).
    catch(err=>{console.log(err);setPageCount(pageCount-10)});

}

const handlePerviousPage = ()=>{
    setPageCount(pageCount-10);
    axios.get(import.meta.env.VITE_BASE_URL + `/allotRooms?page=${pageCount}`,config).
    then(res=>{setRows(res.data.data)}).
    catch(err=>{console.log(err);setPageCount(10);});
    console.log(pageCount);
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
  <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          getRowId={(row) => row.roomNo}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
  </div>
  <div className='pageButtons'>
  <Button variant='contained' onClick={handlePerviousPage}>Prev</Button>
  <Button variant='contained' onClick={handleNextPage}>Next</Button>
  </div>
</div>



</div>
    </>)
}


export default AllotRooms;











