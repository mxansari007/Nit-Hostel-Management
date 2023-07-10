import { async } from "q";
import {useState,useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import Input from '@mui/material/Input';
import './assets/css/UploadPage.css';
import axios from 'axios';
// import EditIcon from '@mui/icons-material/Edit';
// import EditUploadData from "../../../Components/smallComponents/Modals/EditUploadData";
import UploadInstructions from "../../../Components/smallComponents/Modals/UploadInstructions";
import {Alert,AlertTitle,Checkbox} from '@mui/material';
import {Modal} from '@mui/material';
import { LoadingButton } from "@mui/lab";
import {useForm} from 'react-hook-form';
import { DevTool } from "@hookform/devtools";

// modal style



const UploadPage = ()=>{
    
  //state variables
  let tableHeads = ['Modify','rollNo','firstName','lastName','year','password','depatment','email'];
  let modifyHeads = ['rollNo','firstName','lastName','year','password','depatment','email'];
  let [message,setMessage] = useState(0);  
  let [jsonData,setData] = useState([]);
  let [newData,setNewData] = useState([]);
  let [open, setOpen] = useState(false);
  let [uploading, setUploading] = useState();
  let [modifyLoading, setModifyLoading] = useState(false);


//event handlers
    const handleFile = ()=>{
    setUploading(true);
    var files = document.getElementById('file_upload').files;
    if(files.length==0){
      setMessage(3);
      return;
    }
    var filename = files[0].name;
    var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
    if (extension == '.CSV') {
        //Here calling another method to read CSV file into json
        const bodyForData = new FormData();
        bodyForData.append("file",files[0]);
        
        axios
        .post(import.meta.env.VITE_BASE_URL + '/csv', bodyForData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-rapidapi-host": "file-upload8.p.rapidapi.com",
            "x-rapidapi-key": "af582c969cmshc0186c63f1e9d28p10fbf5jsn1a1c05604d94",
          },
        })
        .then((response) => {
      // handle the response
          setUploading(false);
          if(response.data.length==0){
            setMessage(1);
          }else{
            setMessage(2);
          }
          console.log(response.data);
          setData(response.data);
        })
        .catch((error) => {
          // handle errors
          console.log(error);
        });
      
    }else{
        alert("Please select a valid csv file.");
    }
     
}

const handleModify =()=>{
    if(newData.length == 0){
      setMessage(4);
    }else{
      setOpen(true);
    }
}

const handleClose = ()=>{
    setOpen(false);
}

const modify = () => {
  setModifyLoading(true);
}



//Jsx code 
    return <>
    {message==1?<Alert onClose={()=>{setMessage(0)}} severity="success">
  <AlertTitle>Success</AlertTitle>
  File Uploaded Succefully — <strong>Data is saved in Database!</strong>
</Alert>:null}

{message==2?<Alert onClose={()=>{setMessage(0)}} severity="warning">
  <AlertTitle>Warning</AlertTitle>
  There is some duplicate data — <strong>Please Modify data to store it in Database!</strong>
</Alert>:null}

{message==3?<Alert onClose={()=>{setMessage(0)}} severity="error">
  <AlertTitle>Error</AlertTitle>
  There is no file to upload— <strong>Please choose a CSV file!</strong>
</Alert>:null}

{message==4?<Alert onClose={()=>{setMessage(0)}} severity="error">
  <AlertTitle>Error</AlertTitle>
  No record selected— <strong>Please select a Record!</strong>
</Alert>:null}

    <div className="InputBox">
    <Input color="primary" type="file" id="file_upload"/>
    <LoadingButton loading={uploading} onClick={handleFile} variant="contained">Upload</LoadingButton>
    </div>

<div className="Instruction-btn">
<UploadInstructions />
</div>

<div className="table">
<h2 className="table-heading">Duplicate Data</h2>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeads.map(d=>{
            if(d == 'Modify') return <TableCell sx={{fontWeight:'bold'}} align="right"><Checkbox onChange={(e)=>{
              if(e.target.checked){
                setNewData(jsonData);
              }else{
                setNewData([]);
              }
            }}/>{d}</TableCell>;
            else return <TableCell sx={{fontWeight:'bold'}} align="right">{d}</TableCell>;})}
          </TableRow>
        </TableHead>
        <TableBody>
          {jsonData.map((row) => (
            <TableRow
              key={row.rollNo}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

{/* Modify logic */}

            <TableCell align="right"><Checkbox onChange={
              (event)=>{
                console.log(event.target.checked);
                if(event.target.checked){
                  setNewData((prev)=>[...prev,row]);
                }else{
                    setNewData(newData=newData.filter((d)=>d != row));
                }

                 }
                  }/>

{/* Modify logic */}
            
            </TableCell>
              <TableCell component="th" scope="row">
                {row.rollNo}
              </TableCell>
              <TableCell align="right">{row.firstName}</TableCell>
              <TableCell align="right">{row.lastName}</TableCell>
              <TableCell align="right">{row.year}</TableCell>
              <TableCell align="right">{row.password}</TableCell>
              <TableCell align="right">{row.department}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <div className="modifyButton">
    <Button variant="outlined" onClick={handleModify}>Modify Data</Button>
    </div>

{/* Modal Element */}

<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
<div className="Modal">
  <div className="modal-table">
  <form>
  <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            {modifyHeads.map(d=><TableCell sx={{fontWeight:'bold'}} align="right">{d}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
        
          {newData.map((row) => {
            
            return(
            <TableRow
              key={row.rollNo}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              <TableCell component="th" scope="row">
              <Input variant="" onChange={(e)=>{row.rollNo = e.target.value}} type='text' defaultValue={row.rollNo} />
              </TableCell>
              <TableCell align="right"><Input variant="" onChange={(e)=>{row.firstName = e.target.value}}  type='text' defaultValue={row.firstName} /></TableCell>
              <TableCell align="right"><Input variant="" onChange={(e)=>{row.lastName = e.target.value}}  type='text' defaultValue={row.lastName} /></TableCell>
              <TableCell align="right"><Input variant="" onChange={(e)=>{row.year = e.target.value}}  type='text' defaultValue={row.year} /></TableCell>
              <TableCell align="right"><Input variant="" onChange={(e)=>{row.password = e.target.value}}  type='text' defaultValue={row.password} /></TableCell>
              <TableCell align="right"><Input variant="" onChange={(e)=>{row.department = e.target.value}}  type='text' defaultValue={row.department} /></TableCell>
              <TableCell align="right"><Input variant="" onChange={(e)=>{row.email = e.target.value}}  type='text' defaultValue={row.email} /></TableCell>
            </TableRow>)
          })}
          
        </TableBody>
      </Table>
  </TableContainer>
  <div className="modifyButton">
  <LoadingButton loading={modifyLoading} variant="contained" onClick={()=>{modify()}}>Update</LoadingButton>
  <Button variant="outlined" sx={{ml:'10px'}} onClick={()=>{setModifyLoading(false);setOpen(false);}}>Close</Button>
  </div>
  </form>
  </div>
</div>
</Modal>

    </div>
    </>

}


export default UploadPage;
