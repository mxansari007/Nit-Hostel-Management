import React, { Component } from 'react'
import { Link, Router } from 'react-router-dom'
import  TextField  from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import LoadingButton from '@mui/lab/LoadingButton';
import {createTheme,ThemeProvider} from '@mui/material';
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools';
import { CssBaseline } from '@mui/material';
import { cyan } from '@mui/material/colors';
import './Css/Studentlogin.css'
import axios from 'axios';
import Paper from '@mui/material/Paper';

const theme = createTheme({
  palette:{
    primary:{
      main: cyan[400]
    },
  },
});

const Studentlogin =() =>{
  const [loading, setLoading] = React.useState(false);


return(
<Paper elevation={2} id="loginBox">
<ThemeProvider theme={theme}>
<h2>Student Login</h2>
<TextField sx={{display:'block',my:'17px'}} id="outlined-basic" label="Roll No  " type="text" variant="outlined"/>
<TextField sx={{display:'block',my:'17px'}} id="outlined-basic" label="Password" type="password" variant="outlined"/>
<LoadingButton className="Button"
          sx={{px:'25px',my:'17px',fontFamily:'Montserrat'}}
          // onClick={handleClick}
          // onClick={handleSubmit}
          endIcon={<LoginIcon/>}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          <span>Login</span>
        </LoadingButton>
        <p className='sign-up'>Login as <Link to='/'>Admin</Link>/ <Link to='/signup'>Sign Up</Link></p>
</ThemeProvider>
</Paper>
)
};


export default Studentlogin