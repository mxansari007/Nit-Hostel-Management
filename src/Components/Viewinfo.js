import Button from "@mui/material/Button";
import "./Css/viewinfo.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useReducer,useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import axios from 'axios';
import {Jspdf} from "./Api/Jspdf";


//initial toggle state 
const initialSearchState = {
  rollNo: false,
  firstName: false,
  lastName: false,
  departement: false
};


//for Toggeling inputs
const Reducer = (state, action) => {
  switch (action.type) {
    case "Roll No":
      return {
        rollNo: !state.rollNo,
        firstName: state.firstName,
        lastName: state.lastName,
        departement: state.departement
      };
    case "First Name":
      return {
        rollNo: state.rollNo,
        firstName: !state.firstName,
        lastName: state.lastName,
        departement: state.departement
      };
    case "Last Name":
      return {
        rollNo: state.rollNo,
        firstName: state.firstName,
        lastName: !state.lastName,
        departement: state.departement
      };
    case "Departement":
      return {
        rollNo: state.rollNo,
        firstName: state.firstName,
        lastName: state.lastName,
        departement: !state.departement
      };
    default:
      return {
        rollNo: state.rollNo,
        firstName: state.firstName,
        lastName: state.lastName,
        departement: state.departement
      };
  }
};

export default function App() {
  //using useForm hooks for state management of forms
    const form = useForm({
    defaultValues: {
      rollNo: "",
      firstName: "",
      lastName: "",
      departement: ""
    }
  });

  const { register, handleSubmit, control } = form;
  const labels = ["Roll No", "First Name", "Last Name", "Departement"];
  const [state, dispatch] = useReducer(Reducer, initialSearchState);
  const [jsonData, setData] = useState([]);
  const tableHeads = ['Roll no','First Name','Last Name','Year','Password','Department','Email','View Info'];

  const handleChange = (event) => {
    dispatch({ type: event.target.name });
  };

  const onSubmit = (data) => {
    console.log(data);
    //place your axios here
    axios.post('http://localhost:8000/viewStudentInfo',data)
    .then((res)=>{console.log(res.data);
        setData(res.data);
    })
    .catch(err=>{console.log(err);});
  };



  return (
    <div className="App">
      <h1>Search Records</h1>
      <form className="Container" onSubmit={handleSubmit(onSubmit)}>
        <div>
          {labels.map((label) => (
            <FormControlLabel
              control={<Checkbox key={label} name={label} onChange={handleChange} />}
              label={label}
            />
          ))}
        </div>
        {state.rollNo ? (<input {...register("rollNo")} placeholder="Roll no" />) : null}
        {state.firstName ? (<input {...register("firstName")} placeholder="First Name" />) : null}
        {state.lastName ? (<input {...register("lastName")} placeholder="Last Name" />) : null}
        {state.departement ? (<input {...register("departement")} placeholder="Departement" />) : null}
        <Button id="Submitbt" type="submit" variant="contained">
          Search
        </Button>
      </form>
      <DevTool control={control} />
      
      
      {/* after search table */}
      <div className="table">
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeads.map(d=><TableCell sx={{fontWeight:'bold'}} align="right">{d}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {jsonData.map((row) => {

             

            return(
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
              <TableCell align="right"><button onClick={()=>{Jspdf(row)}}>PDF</button></TableCell>
            </TableRow>)
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
  );
}
