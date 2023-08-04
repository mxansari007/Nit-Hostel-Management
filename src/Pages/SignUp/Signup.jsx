import React, { Component,useEffect,useState } from 'react'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools';
import { TextField,Button,Box } from '@mui/material';
import './assets/css/Signup.css';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import "react-step-progress-bar/styles.css";
import { ProgressBar,Step } from "react-step-progress-bar";
import {prev,next} from '../../Store/Reducers/signupSlice';
import { useSelector,useDispatch } from 'react-redux';
import Step2 from './Step2.jsx';
import Step3 from './Step3.jsx';
import './assets/css/Step2.css';
import {setProfile} from '../../Store/Reducers/signUpDataSlice';



const Signup = () => {


 //state variables
const [department, setdepartment] = useState('');
const [year, setYear] = useState('');
const count = useSelector(state => state.signupProgress.count);
const Dispatch = useDispatch();

//intializing form
const form = useForm({
    defaultValues:{
        rollNo:"",
        firstName:"",
        lastName:"",
        year:"",
        password:"",
        department:"",
        email:"",
    },
    mode:'all'
});




//destructuring useform
const {register,watch,getValues,handleSubmit,control,formState:{isValid,errors}} = form;

//event handling
const onSubmit = (data)=>{

  console.log(data);
if(isValid){
Dispatch(setProfile(data));
 Dispatch(next())
}

  //  axios.post(import.meta.env.VITE_BASE_URL + '/signup',data)
  //  .then((res)=>{console.log(res.data);})
  //  .catch(err=>{console.log(err);});
}

useEffect(()=>{console.log(count)},[count]);

//jsx code
return (
<div className="signup-container">
<div className='progress-container'>
<ProgressBar
        percent={count}
        filledBackground="linear-gradient(to right, #C1ECE4, #3AA6B9)"
      >
<Step transition="scale">
          {({ accomplished }) => {
            return accomplished?<div className='right-icon'><i className='fa-solid fa-circle-user'></i></div>:<div className='step'><h2>1</h2></div>;
          }}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => {

            return accomplished?<div className='right-icon'><i className='fa-solid fa-calendar-days'></i></div>:<div className='step'><h2>2</h2></div>;
          }

          }
        </Step>
        <Step transition="scale">
          {({ accomplished }) => {
            return accomplished?<div className='right-icon'><i className='fa-solid fa-money-bill'></i></div>:<div className='step'><h2>3</h2></div>;
          }}
        </Step>
      </ProgressBar>
      </div>


{count==0?<div>
<h2>Profile details</h2>

  <form onSubmit={handleSubmit(onSubmit)} noValidate>
   <div className='form'>
   
    <div style={{margin:'auto'}}>
    <TextField size="small" error={errors.firstName} name="firstName" {...register("firstName",{required:{value:true,message:'First Name is required'}})} id="outlined-basic" label="First Name" variant="outlined" type="text"/>
    <p className="error" >{errors.firstName?.message}</p>
    </div>

    <div style={{margin:'auto'}}>
    <TextField size="small" error={errors.lastName} name="lastName" {...register("lastName",{required:{value:true,message:'Last Name is required'}})} id="outlined-basic" label="Last Name" variant="outlined" type="text"/>
    <p className="error" >{errors.lastName?.message}</p>
    </div>

    <div style={{margin:'auto'}}>
    <TextField size="small" error={errors.rollNo} name="rollNo" {...register("rollNo",{required:{value:true,message:'Roll No is required'},maxLength:{value:8,message:'must be 8 digits'}, pattern: {value: /^[0-9]+$/,message: 'Please enter a number',},minLength:{value:8,message:'must be 8 digits'}})} id="outlined-basic" label="Roll Number" variant="outlined" type="text"/>
    <p className="error" >{errors.rollNo?.message}</p>
    </div>

    <div style={{margin:'auto'}}>
    <FormControl size="small" sx={{minWidth:'160px'}} onSubmit={handleSubmit(onSubmit)}>
    <InputLabel  id="demo-simple-select-label">department</InputLabel>
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
    </div>

    <div style={{margin:'auto'}}>
    <FormControl size="small" sx={{minWidth:'80px'}}>
    <InputLabel size="small" id="demo-simple-select-label">Year</InputLabel>
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
    </div>
    
    <div style={{margin:'auto'}}>
    <TextField size="small" error={errors.email} {...register("email",{required:'Email is required',pattern:{value:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,message:'Invalid Email'}})} id="outlined-basic" label="Email" variant="outlined" type="email"/>
    <p className="error">{errors.email?.message}</p>
    </div>

    <div style={{margin:'auto'}}>
    <TextField size="small" error={errors.confirm} {...register("password")} id="outlined-basic" label="Password" variant="outlined" type="password"/>
    </div>

    <div style={{margin:'auto'}}>
    <TextField size="small" error={errors.confirm} disabled={watch("password")===""} {...register("confirm",{validate:()=>{ return (getValues('confirm')===getValues('password'))}})} id="outlined-basic" label="Confirm Password" variant="outlined" type="password"/>
    </div>
    </div>
    <div className='Buttons'>
<Button type="button" variant='outlined' onClick={()=>{Dispatch(prev())}}>Previous</Button>
<Button type="submit" variant='contained'>Next</Button>
</div>
    </form>
</div>:null}

<Step2 />
<Step3 />

{/* <DevTool control={control}/> */}
    </div>
)

};
export default Signup