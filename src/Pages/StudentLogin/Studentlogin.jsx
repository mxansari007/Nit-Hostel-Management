import { Paper,TextField } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import "./assets/css/Studentlogin.css";
import LoginIcon from '@mui/icons-material/Login';
import { useState } from "react";
import axios from "axios";
const Studentlogin= ()=>{
    const [values,setValues]=useState({rollNo:null,password:null});
    let [Loading,setLoading]=useState(false);
    const handleChange =(event)=>{
        if(event.target.name==="rollNo")
        {
            setValues((prev)=>{
                return {rollNo:event.target.value,password:prev.password}
            });

            console.log(values);
        }

        if(event.target.name==="password")
        {
            setValues((prev)=>{
                return {rollNo:prev.rollNo,password:event.target.value}
            });

            console.log(values);
        }
    }
    const handleSubmit=(event)=>{
        setLoading(true);
        console.log('calling');
        const config = {
            headers: {
              "Content-Type": "application/json"
              },
              withCredentials: true
            }
            axios.post(import.meta.env.VITE_BASE_URL + '/studentlogin',values,config)
            .then((res)=>{
                console.log(res);
            })
            .catch(err => console.log(err));
            
            setLoading(false);
        
    }
return <>

<Paper id="studentContainer" elevation={2}>
        <h2 style={{textAlign:'center'}}>Student Login</h2>
        <TextField name="rollNo" sx={{mt:"30px"}} id="outlined-basic " onChange={handleChange} label="Roll No" variant="outlined" />
        <TextField name="password" sx={{mt:"30px"}} id="outlined-basic" onChange={handleChange} label="Password" variant="outlined" />
        <LoadingButton sx={{px:"77px",mt:"20px",mb:"20px"}}
          endIcon={<LoginIcon />}
          loading={Loading}
          onClick ={handleSubmit}
          loadingPosition="end"
          variant="contained"
        >
          <span>Login</span>
        </LoadingButton>

        <p>Login as <span className="link">Admin/</span> <span className="link">Sign Up</span> </p>
        </Paper>
    
</>;
}

export default Studentlogin;