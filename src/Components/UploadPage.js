import { async } from "q";
import {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import Input from '@mui/material/Input';
import './UploadPage.css';
import axios from 'axios';

const UploadPage = ()=>{
    let [tableHeads,setHeads] = useState([]);
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
        csvFileToJSON(files[0]);
    }else{
        alert("Please select a valid csv file.");
    }

     //Method to read csv file and convert it into JSON 
  function csvFileToJSON(file){
    try {
      var reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = function(e) {
          var data = [];
          var headers = [];
          var rows = e.target.result.split("\r\n");
          // console.log("rows   : "+ rows[0]);
          for (var i = 0; i < rows.length; i++) {
              var cells = rows[i].split(",");
              // console.log("column :   " + cells[0]);
              var rowData = {};
              for(var j=0;j<cells.length;j++){
                  if(i==0){
                      var headerName = cells[j].trim();
                      headers.push(headerName);
                      
                  }else{
                      var key = headers[j];
                      if(key){
                          rowData[key] = cells[j].trim();
                      }
                  }
              }

              //skip the first row (header) data
              if(i!=0){
                data.push(rowData);
              }
          }

            setHeads(headers);
            setData([...data]);
          //sending json to backend
          // console.log("yo json data hai "+ [...data][0].firstName);
          axios.post('http://localhost:8000/csv',jsonData)
            .then((res)=>{console.log(res.data);})
            .catch(err=>{console.log(err);});
          
          }
      }catch(e){
          console.error(e);
      }
     
  }
  }
   


    return <>


    <div className="InputBox">
    <Input color="primary" type="file" id="file_upload"/>
    <Button onClick={handleFile} variant="contained">Upload</Button>
    </div>


<div className="table">
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
              <TableCell align="right">{row.departement}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </>
}


export default UploadPage;
