import React, { Component,useState } from 'react'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools';
import { TextField,Button,Box } from '@mui/material';
import './Css/Signup.css';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import Paper from '@mui/material/Paper';

const Signup = () => {
 
const [department, setdepartment] = useState('');
const [year, setYear] = useState('');


const form = useForm({
    defaultValues:{
        rollNo:"",
        firstName:"",
        lastName:"",
        year:"",
        password:"",
        confirm:"",
        department:"",
        email:"",
    },
    mode:'all'
});

const {register,watch,getValues,handleSubmit,control,formState:{errors}} = form;


const onSubmit = (data)=>{
   axios.post('http://localhost:8000/signup',data)
   .then((res)=>{console.log(res.data);})
   .catch(err=>{console.log(err);});
}


return (
    <div className="container">
    <Paper elevation={8}>
    <h2 style={{marginTop:'20px'}}>Sign Up</h2>
    
        <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        
        <Grid container spacing={2} 
         direction="row"
         justifyContent="flex-start"
         alignItems="flex-start"
         
        >
        <Grid item md={6}>
        <TextField error={errors.firstName} name="firstName" {...register("firstName",{required:{value:true,message:'First Name is required'}})} id="outlined-basic" label="First Name" variant="outlined" type="text"/>
        <p className="error" >{errors.firstName?.message}</p>
        </Grid>
        <Grid item md={6}>
        <TextField error={errors.lastName} name="lastName" {...register("lastName",{required:{value:true,message:'Last Name is required'}})} id="outlined-basic" label="Last Name" variant="outlined" type="text"/>
        <p className="error" >{errors.lastName?.message}</p>
        </Grid>
        </Grid>
        <Grid container spacing={2}>
        <Grid item md={4}>
        <TextField error={errors.rollNo} name="rollNo" {...register("rollNo",{required:{value:true,message:'*required'},maxLength:{value:8,message:'must be 8 digits'}, pattern: {value: /^[0-9]+$/,message: 'Please enter a number',},minLength:{value:8,message:'must be 8 digits'}})} id="outlined-basic" label="Roll Number" variant="outlined" type="text"/>
        <p className="error" >{errors.rollNo?.message}</p>
        </Grid>
        <Grid item md={4}>

        <FormControl fullWidth onSubmit={handleSubmit(onSubmit)}>
        <InputLabel id="demo-simple-select-label">department</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={department}
          label="department"
          error={errors.department}
          {...register("department",{onChange:(e)=>{setdepartment(e.target.value);},required:true})}
        >
          <MenuItem value={'MCA'}>MCA</MenuItem>
          <MenuItem value={'B.tech'}>B.Tech</MenuItem>
          <MenuItem value={'M.tech'}>M.Tech</MenuItem>
          <MenuItem value={'P.hd'}>P.hd</MenuItem>
        </Select>
        </FormControl>

        </Grid>
        <Grid item md={4}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Year</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={year}
          label="Year"
          error={errors.year}
          {...register("year",{onChange:(e)=>{setYear(e.target.value);},required:true})}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
        </Select>
        </FormControl>
        </Grid>
        </Grid>
        
        <TextField error={errors.email} {...register("email",{required:'Email is required',pattern:{value:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,message:'Invalid Email'}})} id="outlined-basic" label="Email" variant="outlined" type="email"/>
        <p className="error">{errors.email?.message}</p>
        <Grid container spacing={2}>
        <Grid item md={6} >
        <TextField error={errors.confirm} {...register("password")} id="outlined-basic" label="Password" variant="outlined" type="password"/>
        </Grid>
        <Grid item md={6}>
        <TextField error={errors.confirm} disabled={watch("password")===""} {...register("confirm",{validate:()=>{ return (getValues('confirm')===getValues('password'))}})} id="outlined-basic" label="Confirm Password" variant="outlined" type="password"/>
        
        </Grid>
        </Grid>
        <Grid container spacing={2}>
        <Grid item md ={6} xs={12}>
        <Button id="Resetbt" variant="contained">Reset</Button>
        </Grid>
        <Grid item md ={6} xs={12}>
        <Button id="Submitbt" type="submit" variant="contained">Submit</Button>
        </Grid>
        </Grid>
        </form>
        </Paper>
        <DevTool control={control}/>
    </div>
)

};
export default Signup