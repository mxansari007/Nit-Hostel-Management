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
import './Studentlogin.css'


const theme = createTheme({
  palette:{
    primary:{
      main: cyan[400]
    },
  },
});


// const Studentlogin = () => {
//   const form = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//     mode: 'onTouched'
//   });
//   const { register, control, handleSubmit, formState, reset } = form;
//   const { errors, isDirty, isValid, isSubmitting } = formState;
//   const onSubmit = (data) => {
//     console.log('submitted', data);
//   }
//   return (
//     <main class="form-signin">
//       <form onSubmit={handleSubmit(onSubmit)} noValidate>

//         <h1 class="h3 mb-3 fw-normal">Student Login</h1>

//         <div class="form-floating">
//           <input type="email" class="form-control" id="floatingInput" placeholder="32211211" {...register("email", {
//             required: { value: true, message: 'Email is required' },
//             pattern: {
//               value:
//                 /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
//               message: "Invalid Email Address",
//             },
//           })} />
//           <label for="floatingInput">Email</label>
//           <p>{errors.email?.message}</p>
//         </div>
//         <div class="form-floating">
//           <input type="password" class="form-control" id="floatingPassword" placeholder="Password" {...register("password", { required: { value: true, message: 'Password is required' } })} />
//           <label for="floatingPassword">Password</label>
//           <p>{errors.password?.message}</p>
//         </div>


//         <button disabled={!isDirty || !isValid || !isSubmitting} class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>

//       </form>
//       <DevTool control={control} />
//       <p className='sign-up'>Login as <Link to='/'>Administrator</Link>/ <Link to='/signup'>Sign Up</Link></p>

//     </main>

//   )
// };

const Studentlogin =() =>{
  const [loading, setLoading] = React.useState(false);
  function handleClick() {
    setLoading(true);
  }

return(
<div className="loginBox">
<ThemeProvider theme={theme}>
<h2>Student Login</h2>
<TextField sx={{display:'block',my:'17px'}} id="outlined-basic" label="Roll No  " type="text" variant="outlined"/>
<TextField sx={{display:'block',my:'17px'}} id="outlined-basic" label="Password" type="password" variant="outlined"/>
<LoadingButton className="Button"
          sx={{px:'25px',my:'17px',fontFamily:'Montserrat'}}
          onClick={handleClick}
          endIcon={<LoginIcon/>}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          <span>Login</span>
        </LoadingButton>
        <p className='sign-up'>Login as <Link to='/'>Admin</Link>/ <Link to='/signup'>Sign Up</Link></p>
</ThemeProvider>
</div>
)
};


export default Studentlogin