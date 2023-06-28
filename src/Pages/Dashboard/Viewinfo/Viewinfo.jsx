import Button from "@mui/material/Button";
import "./assets/css/viewinfo.css";
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
import MyDocument from "../../../API/MyDocument/MyDocument.jsx";
import { TextField } from "@mui/material";
import {Grid} from '@mui/material';
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
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
      case 'Reset':
        return {
        rollNo: false,
        firstName: false,
        lastName: false,
        departement: false
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

//all states
  const { register, handleSubmit, control,reset,formState:{errors} } = form;
  const [state, dispatch] = useReducer(Reducer, initialSearchState);
  const [jsonData, setData] = useState([]);
  const tableHeads = ['Roll no','First Name','Last Name','Year','Password','Department','Email','View Info'];
  const [isFound,setFound] = useState(true);
  const labels = [{name:'Roll No',state:state.rollNo}, {name:'First Name',state:state.firstName}, {name:'Last Name',state:state.lastName}, {name:'Departement',state:state.departement}];


  const generatePdfDocument = async (documentData,fileName) => {
    const blob = await pdf((
        <MyDocument
            data={documentData}
        />
    )).toBlob();
    saveAs(blob, fileName);
  }
  


  //all Event Listners
  const handleChange = (event) => {
    dispatch({ type: event.target.name });
  };

  const onSubmit = (data) => {
    console.log(data);
    
    //place your axios here
    axios.post(import.meta.env.VITE_BASE_URL+'/viewStudentInfo',data)
    .then((res)=>{console.log(res.data);
        setData(res.data);
        if(res.data.length === 0){
          setFound(false);
          console.log('found set');
        }
        else{
          setFound(true);
        }
    })
    .catch(err=>{console.log(err);});
  };



  return (
    <div className="mainSection">
      <h2>Search Records</h2>
      <form className="Container" onSubmit={handleSubmit(onSubmit)}>
      <div className="inputFields">
        <div>
          {labels.map((label) => (
            <FormControlLabel
              control={<Checkbox key={label.name} name={label.name} onChange={handleChange} checked={label.state}/>}
              label={label.name}
            />
          ))}
        </div>
        <div>
        <Grid container spacing={2} 
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{marginBottom:'20px'}}
         >
        <Grid item md={6} xs={12} >
        {state.rollNo ? (<TextField error={errors.rollNo} size="small"  {...register("rollNo")} id="outlined-basic" label="Roll No" variant="outlined" type="number"  />) : null}
        </Grid>
        <Grid item md={6}  xs={12}>
        {state.firstName ? (<TextField size="small" error={errors.firstName } {...register("firstName",{pattern:{value:/^[A-Za-z]+$/i,message:'Enter Valid Name'}})} id="outlined-basic" label="First Name" variant="outlined" />) : null}
        <p>{errors.firstName?.message}</p>
        </Grid>
        <Grid item md={6}  xs={12}>
        {state.lastName ? (<TextField size="small" error={errors.lastName} {...register("lastName",{pattern:{value:/^[A-Za-z]+$/i,message:'Enter Valid Name'}})} id="outlined-basic" label="Last Name" variant="outlined" />) : null}
         <p>{errors.lastName?.message}</p>
        </Grid>
        <Grid item md={6}  xs={12}>
        {state.departement ? (<TextField size="small" {...register("department")} id="outlined-basic" label="Department" variant="outlined" />) : null}
        <p>{state.departement?'MCA, M.tech, P.hd, B.tech':null}</p>
        </Grid>
        </Grid>
        </div>
        <div className="buttons">
        <Button id="Submitbt" type="submit" variant="contained" sx={{marginRight:'10px'}}>
          Search
        </Button>
        <Button id="Submitbt" type="reset" onClick={() => {
          dispatch({ type: 'Reset' });
          setData([]);
          setFound(true);
          reset({
            rollNo:"",
            firstName: "",
            lastName: "",
            departement:""
          });
        }} variant="contained">
          Reset
        </Button>
        </div>
        </div>
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
              <TableCell align="right">    
                        <Button variant="outlined" onClick={()=>{generatePdfDocument(row,row.rollNo+'.pdf')}}>Download Pdf</Button>
                  </TableCell>
            </TableRow>)
          })}
          {isFound?null:<h1 style={{fontSize:'1.5rem',padding:'1em'}}>No Record Found</h1>}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
  );
}
