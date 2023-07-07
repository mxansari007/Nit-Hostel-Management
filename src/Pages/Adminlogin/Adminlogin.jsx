import React, {  useState } from 'react'
import { Link } from 'react-router-dom'
import  TextField  from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import LoadingButton from '@mui/lab/LoadingButton';         
import { DevTool } from '@hookform/devtools';
import {useNavigate} from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import './assets/css/AdminLogin.css';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import { useDispatch } from 'react-redux';
import {login} from '../../Store/Reducers/loginSlice';


const Adminlogin =() =>{
  
  const [loading, setLoading] = React.useState(false);
  const [values,setValues] = useState({username:null,password:null});
  let navigate = useNavigate();
  const dispatch = useDispatch();
  


  function handleChange(event){
    var name = event.target.name;

    if(name === "username"){
        setValues((prev)=>({username:event.target.value,password:prev.password}));
    }else{
      setValues((prev)=>({username:prev.username,password:event.target.value}));
    }
  }


   function handleSubmit() {
    setLoading(true);
    console.log(import.meta.env.VITE_BASE_URL);
    const config = {
      headers: {
        "Content-Type": "application/json"
        },
        withCredentials: true
      }
    axios.post(import.meta.env.VITE_BASE_URL + '/adminlogin',values,config)
   .then((res)=>{
    console.log(res.data);
    dispatch(login());
    navigate('/Dashboard')})
   .catch(err=>{alert("Invalid username & password");});
  }

return(<>

 <Paper id="loginBox" elevation={2}>
      
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
        <p className='sign-up'>Login as <Link className="link" to='student'>Student</Link>/ <Link className="link" to='/signup'>Sign Up</Link></p>
</Paper>
</>
)
};



export default Adminlogin

