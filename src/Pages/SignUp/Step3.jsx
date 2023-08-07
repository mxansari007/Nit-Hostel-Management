import { TextField,Button} from '@mui/material';
import './assets/css/Signup.css';
import {prev,next} from '../../Store/Reducers/signupSlice';
import { useSelector,useDispatch } from 'react-redux';
import {useForm} from 'react-hook-form';
import {setAdditional } from '../../Store/Reducers/signUpDataSlice';
import { useState } from 'react';

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
          console.log(data);
          Dispatch(setAdditional(data));
          Dispatch(next());

        }
    }
    



    return <>
        
{count===(100*2/3)?<div>
    <h2>Bank Details</h2>
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
    <div className='bank-container'>
    <div style={{margin:'auto'}}>
      <TextField size="small" error={errors.AccountHolderName} {...register("AccountHolderName",{required:{value:true,message:'*Accound Holder name required'}})} variant='outlined' label="Account Holder Name"/>
    <p className='error'>{errors.AccountHolderName?.message}</p>
    </div>
    <div style={{margin:'auto'}}>
      <TextField size="small" error={errors.AccountNumber} {...register("AccountNumber",{required:{value:true,message:'*Account Number'}})} variant='outlined' label="Account Number"/>
      <p className='error'>{errors.AccountNumber?.message}</p>
    </div>
    <div style={{margin:'auto'}}>
      <TextField size="small" error={errors.BankName} {...register("BankName",{required:{value:true,message:'*Bank Name is required'}})} variant='outlined' label="Bank Name"/>
      <p className='error'>{errors.BankName?.message}</p>
    </div>
    <div style={{margin:'auto'}}>
      <TextField size="small" error={errors.IFSC} {...register("IFSC",{required:{value:true,message:'*IFSC is required'}})} variant='outlined' label="IFSC Code"/>
      <p className='error'>{errors.IFSC?.message}</p>
    </div>
    </div>
  
    <div className='Buttons'>
        <Button type="button" variant='outlined' onClick={()=>{Dispatch(prev())}}>Previous</Button>
        <Button type="submit" variant='contained'>Next</Button>
    </div>
    </form>
  </div>:null}

    </>
}


export default Step3;