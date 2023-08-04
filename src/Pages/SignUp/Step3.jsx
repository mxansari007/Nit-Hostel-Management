import { TextField,Button} from '@mui/material';
import './assets/css/Signup.css';
import {prev,next} from '../../Store/Reducers/signupSlice';
import { useSelector,useDispatch } from 'react-redux';
import {useForm} from 'react-hook-form';
import { setProfile } from '../../Store/Reducers/signUpDataSlice';


const Step3 = ()=>{

    const count = useSelector(state => state.signupProgress.count);
    const Dispatch = useDispatch();
    const form = useForm({
        defaultValues:{
            AccountHolderName:"",
            AccountNumber:"",
            BankName:"",
            IFSC:""
        },
        mode:"all",
    });
    
    const {register,handleSubmit,formState:{isValid,errors},control} = form;

    const onSubmit = (data)=>{
        if(isValid){
            Dispatch(setProfile(data));
        }
    }

    return <>
        
{count==100?<div>
    <h2>Bank Details</h2>
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
    <div className='bank-container'>
    <div style={{margin:'auto'}}>
      <TextField size="small" error={errors.AccountHolderName} {...register("AccountHolderName",{required:true})} variant='outlined' label="Account Holder Name"/>
    </div>
    <div style={{margin:'auto'}}>
      <TextField size="small" error={errors.AccountNumber} {...register("AccountNumber",{required:true})} variant='outlined' label="Account Number"/>
    </div>
    <div style={{margin:'auto'}}>
      <TextField size="small" error={errors.BankName} {...register("BankName",{required:true})} variant='outlined' label="Bank Name"/>
    </div>
    <div style={{margin:'auto'}}>
      <TextField size="small" error={errors.IFSC} {...register("IFSC",{required:true})} variant='outlined' label="IFSC Code"/>
    </div>
    </div>
  
    <div className='Buttons'>
        <Button type="button" variant='outlined' onClick={()=>{Dispatch(prev())}}>Previous</Button>
        <Button type="submit" variant='contained'>Submit</Button>
    </div>
    </form>
  </div>:null}

    </>
}


export default Step3;