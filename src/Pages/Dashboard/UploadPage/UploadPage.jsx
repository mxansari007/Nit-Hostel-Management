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
import EditIcon from '@mui/icons-material/Edit';
import EditUploadData from "../../../Components/smallComponents/Modals/EditUploadData";
import UploadInstructions from "../../../Components/smallComponents/Modals/UploadInstructions";


const UploadPage = ()=>{
    
  let tableHeads = ['rollNo','firstName','lastName','year','password','depatment','email','Edit'];
    
    let [jsonData,setData] = useState([]);



    const handleFile = ()=>{
    
    var files = document.getElementById('file_upload').files;
    if(files.length==0){
      alert("Please choose any file...");
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

     //Method to read csv file and convert it into JSON
     

}

    return <>

    <div className="InputBox">
    <Input color="primary" type="file" id="file_upload"/>
    <Button onClick={handleFile} variant="contained">Upload</Button>
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
            {tableHeads.map(d=><TableCell sx={{fontWeight:'bold'}} align="right">{d}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {jsonData.map((row) => (
            <TableRow
              key={row.rollNo}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.rollNo}
              </TableCell>
              <TableCell align="right">{row.firstName}</TableCell>
              <TableCell align="right">{row.lastName}</TableCell>
              <TableCell align="right">{row.year}</TableCell>
              <TableCell align="right">{row.password}</TableCell>
              <TableCell align="right">{row.department}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right"><EditUploadData row={row}  /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </>

}


export default UploadPage;
