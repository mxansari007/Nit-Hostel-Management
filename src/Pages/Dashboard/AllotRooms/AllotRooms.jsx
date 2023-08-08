import { TextField,Button } from '@mui/material';
import './assets/AllotRooms.css';
import {useRef, useState,useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import ViewDetails from './ViewDetails.jsx';
import ActionAllot from './ActionAllot';
import axios from 'axios';

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



// const rows = [
//   { roomNo: 215, students:['Maaz Ansari','Aqib Hussain'], floorNo: 1, occupancy:2,status:'full'},
//   { roomNo: 227, students:['Ritik Sharma','Vaibhav Bhalla'], floorNo: 1, occupancy:3,status:'unfilled'},
//   { roomNo: 606, students:['Rishi','Adii'], floorNo: 5, occupancy:2,status:'full'},
  
// ];




const AllotRooms = ()=>{
const [pageCount,setPageCount] = useState(0);
const [rows,setRows] = useState([{roomNo:"",floorNo:"",students:[],status:"",occupancy:""}]);
  useEffect(()=>{

    axios.get(import.meta.env.VITE_BASE_URL + '/allotRooms',config)
    .then(res=>{
      console.log(res.data);
      setRows(res.data.data);
    })
    .catch(err=>console.log(err));
  },[])

  const [roomQuery,setRoomQuery] = useState();
  const [floorQuery,setFloorQuery] = useState();

  const handleChange = (event)=>{
        setRoomQuery(event.target.value);
  }

  const handleSubmit = (event)=>{
      if(event.target.name == "roomSubmit"){
        axios.get(import.meta.env.VITE_BASE_URL + `/allotRooms?roomNo=${roomQuery}`)
        .then(res =>{console.log(res.data.data[0]);setRows([res.data.data[0]])});
      }else if(event.target.name == "floorSubmit"){

      }
  }
//?status=vacant,Fully-filled,Half-filled



  //Pagination
const handleNextPage = ()=>{
  setPageCount(pageCount+10);
    axios.get(import.meta.env.VITE_BASE_URL + `/allotRooms?page=${pageCount}`,config).
    then(res=>{setRows(res.data.data)}).
    catch(err=>console.log(err));
    console.log(rows);
}




return (<>
<div className="room-container">

<div className='Heading'>
    <h1>Room Allotment System</h1>
</div>

<div className='upper-area'>
    <div className="badges">
        <div className='badge'>
            <p>450</p>
            <p className='badge-title'>Total Rooms</p>
        </div>
        <div className='badge'>
            <p>200</p>
            <p className='badge-title'>Occupied</p>
        </div>
        <div className='badge'>
            <p>250</p>
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
            <TextField variant='outlined' size="small" label='Floor Search'/>
            <Button name="" sx={{ml:'7px'}} variant='contained'>Search</Button>
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

  <Button variant='contained' onClick={handleNextPage}>Next</Button>
</div>



</div>
    </>)
}


export default AllotRooms;