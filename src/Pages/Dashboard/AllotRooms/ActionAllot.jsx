import {Modal, useModal} from "@nextui-org/react";
import {Button} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './assets/ActionAllotRoom.css';
import {useState} from 'react';
import {TextField} from '@mui/material';
import axios from 'axios';
import {Snackbar, Alert} from '@mui/material';

const ActionAllot = (props)=>{
    const [openSnack,setSnack] = useState(false);
    const [message,setMessage] = useState();
    const [rollNo,setRollNo] = useState();
    const [roomNo,setRoom] = useState(props.row.roomNo);
    const {setVisible,bindings} = useModal();
    const [occupants,setOccupants] = useState(props.row.students);

    const students =[{rollNo:52211211,firstName:'Maaz',lastName:'Ansari',department:'MCA',year:2,contact:'9213992321'},
                    {rollNo:52212232,firstName:'Aqib',lastName:'Hussain',department:'MCA',year:2,contact:'9213992232'}];

    const [interVisible, setinterVisible] = useState(false);
    const handler = () => setinterVisible(true);
    const closeHandler = () => {
        setinterVisible(false);
        console.log("closed");
    };


    const handleChange = (event)=>{
        setRollNo(event.target.value);
    }


    const onSubmit = ()=>{
      const sendObj = {roomNo,rollNo};
      const config = {
        headers: {
          "Content-Type": "application/json"
          },
          withCredentials: true
        }
        axios.post(import.meta.env.VITE_BASE_URL + '/roomController',sendObj,config)
        .then(res=>{console.log(res);
              if(res.status === 200){
                setSnack(true);
                setMessage(1);
              }else{
                setSnack(true);
                setMessage(2);
              }
        })
        .catch(err=>{console.log(err);setSnack(true);setMessage(3);});
        

    }

    return <>
      <Button size="small" variant='contained' onClick={() => setVisible(true)}>
        Allot
      </Button>
      <Modal
        scroll
        fullScreen
        closeButton
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
     <Modal.Header>
        <h2 style={{color:'teal'}}>Room No: {props.row.roomNo} / <span className="floor-title">Floor No: {props.row.floorNo}</span></h2>
        </Modal.Header>
        <Modal.Body>

        <div className="occup">
            <p>Occupants: {props.row.students.length}</p>
            <p>Occupancy: {props.row.occupancy}</p>
        </div>
        <div className="table-container">
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Roll No</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Department</TableCell>
            <TableCell align="right">Year</TableCell>
            <TableCell align="right">Contact</TableCell>
            <TableCell align="right">Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {occupants.map((d)=>{
                return(
            <TableRow>
            <TableCell>{d.rollNo}</TableCell>
            <TableCell align="right">{`${d.firstName} ${d.lastName}`}</TableCell>
            <TableCell align="right">{d.department}</TableCell>
            <TableCell align="right">{d.year}</TableCell>
            <TableCell align="right">{d.Profile.contactNumber}</TableCell>
            <TableCell align="right"><a href="#"><i style={{fontSize:'1.2rem',color:'teal'}} className="fa-regular fa-circle-xmark"></i></a></TableCell>
          </TableRow>)
            })}
        </TableBody>
        </Table>
    </TableContainer>
    </div>
    <div className="Allot-btn">
    <Button variant="contained" onClick={handler}>Assign To New Student</Button>
    </div>
    <div>
      {/* <Button auto color="warning" shadow onPress={handler}>
        Open modal
      </Button> */}
      <Modal
        closeButton
        blur
        width="400px"
        aria-labelledby="modal-title"
        open={interVisible}
        onClose={closeHandler}
      >
        <Modal.Header>
        <h1>Assign New Room</h1>
        </Modal.Header>
        <Modal.Body>
        <TextField name="rollNoField" onChange={handleChange} size="small" variant="outlined" label="Roll No" />
        </Modal.Body>
        <Modal.Footer>
        <Button name="assignSubmit" onClick={onSubmit} variant="contained">Assign</Button>
        {message===1?<Snackbar open={openSnack} autoHideDuration={6000} onClose={()=>{setSnack(false)}}>
        <Alert onClose={()=>{setSnack(false)}} severity="success" sx={{ width: '100%' }}>
          Room Assigned Successfully
        </Alert>
      </Snackbar>:null}
      {message===2?<Snackbar open={openSnack} autoHideDuration={6000} onClose={()=>{setSnack(false)}}>
        <Alert onClose={()=>{setSnack(false)}} severity="error" sx={{ width: '100%' }}>
          Room is Occupied Can not Assign!
        </Alert>
      </Snackbar>:null}
      {message===3?<Snackbar open={openSnack} autoHideDuration={6000} onClose={()=>{setSnack(false)}}>
        <Alert onClose={()=>{setSnack(false)}} severity="error" sx={{ width: '100%' }}>
          Unable to find this Roll No!
        </Alert>
      </Snackbar>:null}
        </Modal.Footer>
      </Modal>

    </div>

    </Modal.Body>
     <Modal.Footer style={{boxShadow:'0px 0px 3px 2px teal', zIndex:'1'}}>
          <Button color="error" sx={{mr:'10px'}} variant="outlined" onClick={() => setVisible(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
}

export default ActionAllot;