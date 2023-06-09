import React, { Component , useState} from 'react'
import { Link, Router } from 'react-router-dom'
import  TextField  from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import LoadingButton from '@mui/lab/LoadingButton';         
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools';
import {useNavigate} from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import './Studentlogin.css'
import db from '../Database';
import Studentlogin from './Studentlogin';
import { Sync } from '@mui/icons-material';
import { useEffect } from 'react';

let isLoggedIn = false;



const Adminlogin =() =>{
  
  const [loading, setLoading] = React.useState(false);
  const [values,setValues] = useState({username:null,password:null});
  let navigate = useNavigate();
  
  function handleChange(event){
    var name = event.target.name;

    if(name === "username"){
        setValues((prev)=>({username:event.target.value,password:prev.password}));
    }else{
      setValues((prev)=>({username:prev.username,password:event.target.value}));
    }
  }


   function handleSubmit(event) {
    setLoading(true);

    if(db.username === values.username && db.password === values.password){
      
      isLoggedIn = true;
      navigate('/Dashboard');
    }
    else{

    }

  

  }

return(
<div className="loginBox">

<h2>Admin Login</h2>
<FormControl>
<TextField onChange={handleChange} name="username" sx={{display:'block',my:'17px'}} id="outlined-basic" label="Username" type="text" variant="outlined"/>
<TextField onChange={handleChange} sx={{display:'block',my:'17px'}} name="password" id="outlined-basic" label="Password" type="password" variant="outlined"/>
<LoadingButton className="Button"
          sx={{px:'25px',my:'17px',fontFamily:'Montserrat'}}
          onClick={handleSubmit}
          endIcon={<LoginIcon/>}
          loading={loading}
          loadingPosition="end"
          variant="contained"
          type="submit"
        >
          <span>Login</span>
        </LoadingButton>
        </FormControl>
        <p className='sign-up'>Login as <Link to='student'>Student</Link>/ <Link to='/signup'>Sign Up</Link></p>

</div>
)
};



export default Adminlogin

export {isLoggedIn};