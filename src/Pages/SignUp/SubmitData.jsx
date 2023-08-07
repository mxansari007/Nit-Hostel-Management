
import { useSelector,useDispatch } from "react-redux"
import { Button } from "@mui/material";
import { prev } from "../../Store/Reducers/signupSlice";
import axios from 'axios';
const SubmitData = ()=>{

    const allData = useSelector(state=>state.signUpData.data);
    const dispatch = useDispatch();
    const handleSubmit = ()=>{

        console.log(allData);
        const config = {
            headers: {
              "Content-Type": "application/json"
              },
              withCredentials: true
            }
          axios.post(import.meta.env.VITE_BASE_URL+ '/studentSignup',allData,config)
          .then(res=>{
              console.log(true);
              navigate('/student')
          }).catch(err=>{
              console.log(err);
          });
    }


    return <>
        <div className='Buttons'>
        <Button type="button" variant='outlined' onClick={()=>{dispatch(prev())}}>Previous</Button>
        <Button onClick={handleSubmit} variant='contained'>Submit</Button>
    </div>
    </>
}


export default SubmitData;