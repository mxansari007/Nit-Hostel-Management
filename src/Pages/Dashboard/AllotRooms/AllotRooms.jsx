import { TextField,Button,Pagination } from '@mui/material';
import './assets/AllotRooms.css';
import {useRef, useState,useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import ViewDetails from './ViewDetails.jsx';
import ActionAllot from './ActionAllot';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import {setRows, setTotalRooms,setTotalOccupied,reset,setHalfFilled} from '../../../Store/Reducers/roomSlice';
import { useSelector,useDispatch } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';


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
const totalRooms = useSelector(state=>state.roomHandle.totalRooms);
const halfFilled = useSelector(state => state.roomHandle.halfFilled);
const totalOccupied = useSelector(state=>state.roomHandle.totalOccupied);
const [loading,setLoading] = useState(false);
const [page,setPage] = useState(1);
const totalPages = parseInt(totalRooms%10==0?totalRooms/10:totalRooms/10+1);
const [roomQuery,setRoomQuery] = useState("");
const [floorQuery, setFloorQuery] = useState("");


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
  axios.get(import.meta.env.VITE_BASE_URL+'/allotRooms',config)
  .then(res => {setRows(res.data.data)
                console.log(res.data);
                Dispatch(setTotalRooms(res.data.totalRooms));
                Dispatch(setTotalOccupied(res.data.fullyOccupiedRooms));
                Dispatch(setHalfFilled(res.data.partiallyOccupiedRooms))
  })      
  .catch(err=> console.log(err));
},[])



  const handleChange = (event)=>{
      if(event.target.name === 'roomField'){
        setRoomQuery(event.target.value);
      }else{
        setFloorQuery(event.target.value);
      }
  }

  const handleSubmit = (event)=>{
    setLoading(true);
      if(event.target.name === "roomSubmit"){
        axios.get(import.meta.env.VITE_BASE_URL + `/allotRooms?roomNo=${roomQuery}`,config)
        .then(res =>{Dispatch(setRows([res.data.data[0]]));console.log(res.data.data[0])});
      }else if(event.target.name === "floorSubmit"){
        console.log(floorQuery);
        console.log('hit');
        axios.get(import.meta.env.VITE_BASE_URL + `/allotRooms?floorNo=${floorQuery}`,config)
        .then(res =>{Dispatch(setRows(res.data.data));console.log(res.data.data)});
      }
      setLoading(false);
  }
//?status=vacant,Fully-filled,Half-filled


//Pagination


useEffect(()=>{
  setLoading(true);
  if(floorQuery!=null){
    axios.get(import.meta.env.VITE_BASE_URL + `/allotRooms?page=${(page-1)*10}&floorNo=${floorQuery}`,config).
    then(res=>{Dispatch(setRows(res.data.data))}).
    catch(err=>{console.log(err);});
    setLoading(false);
  }else{
    axios.get(import.meta.env.VITE_BASE_URL + `/allotRooms?page=${(page-1)*10}`,config).
    then(res=>{Dispatch(setRows(res.data.data))}).
    catch(err=>{console.log(err);});
    setLoading(false);
  }
},[page]);




const handlePage =(event, value) => {
  setPage(value);
};




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
            <p>{halfFilled}</p>
            <p className='badge-title'>Half-Filled</p>
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
        {loading?
        <div className='tbl-loading'>
        <LinearProgress />
        </div>:
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
        }
  </div>
  <div className="pagiNation">
        {page!=0?<Pagination count={totalPages} color="primary" shape="rounded" page={page} onChange={handlePage} />:null}
  </div>
  
</div>



</div>
    </>)
}


export default AllotRooms;











