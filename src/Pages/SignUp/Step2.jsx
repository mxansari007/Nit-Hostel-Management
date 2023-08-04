import {prev,next} from '../../Store/Reducers/signupSlice';
import { useSelector,useDispatch } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools';
import { TextField,Button,Box } from '@mui/material';
import './assets/css/Step2.css';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { setProfile } from '../../Store/Reducers/signUpDataSlice';
// import AdapterDateFns from '@mui/lab/AdapterDateFns'; 

const Step2 = ()=>{


    const form = useForm({
        defaultValues:{
            semester:"",
            gender:"",
            dateOfBirth:"",
            contactNumber:"",
            secondaryNumber:"",
            fatherName:"",
            fatherOccupation:"",
            motherName:"",
            motherOccupation:"",
            bloodGroup:"",
            identificationMark:"",
            address:"",
        },
        mode:"all",
    });

    const {register,handleSubmit,formState:{isValid,errors},control} = form;

    const count = useSelector(state => state.signupProgress.count);
    const Dispatch = useDispatch();
    const [semester, setSemester] = useState('');
    const [gender, setGender] = useState('');



const onSubmit = (data)=>{
  console.log(isValid);
  console.log(data);
  if(isValid){
    Dispatch(setProfile(data));
    Dispatch(next());
  }
}


    return (<>
        {count==50?<div>
  <h2>Additional Details</h2>
  <form onSubmit={handleSubmit(onSubmit)} noValidate>
  <div className='add-container'>
  <div style={{margin:'auto'}}>
    <FormControl size="small" sx={{minWidth:'120px'}}>
    <InputLabel size="small" id="demo-simple-select-label">semester</InputLabel>
    <Select
      name="semester"
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={semester}
      label="Semester"
      error={errors.semester}
      {...register("semester",{onChange:(e)=>{setSemester(e.target.value);},required:true})}
    >
      <MenuItem value={1}>1</MenuItem>
      <MenuItem value={2}>2</MenuItem>
      <MenuItem value={3}>3</MenuItem>
      <MenuItem value={4}>4</MenuItem>
      <MenuItem value={5}>5</MenuItem>
      <MenuItem value={6}>6</MenuItem>
      <MenuItem value={6}>7</MenuItem>
      <MenuItem value={6}>8</MenuItem>
    </Select>
    </FormControl>
    </div>

    <div style={{margin:'auto'}}>
    <FormControl size="small" sx={{minWidth:'160px'}} onSubmit={handleSubmit(onSubmit)}>
    <InputLabel  id="demo-simple-select-label">Gender</InputLabel>
    <Select
      name="gender"
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={gender}
      label="department"
      error={errors.gender}
      {...register("gender",{onChange:(e)=>{setGender(e.target.value);},required:true})}
    >
      <MenuItem value={'Male'}>Male</MenuItem>
      <MenuItem value={'Female'}>Female</MenuItem>
    </Select>
    </FormControl>
    </div>
    
    <div style={{margin:'auto'}}>
          <TextField error={errors.dateOfBirth} name="dateOfBirth" size="small" {...register("dateOfBirth",{required:true})} variant='outlined' label="Date of Birth" placeholder='dd/mm/yyyy'/>
    </div>
    <div style={{margin:'auto'}}>
      <TextField error={errors.contactNumber} name="contactNumber" size="small" {...register("contactNumber",{required:true})} variant='outlined' label="Contact"/>
    </div>
    <div style={{margin:'auto'}}>
      <TextField size="small" {...register("secondaryNumber")} variant='outlined' label="Secondary Contact"/>
    </div>
    <div style={{margin:'auto'}}>
      <TextField error={errors.address} size="small" {...register("address",{required:true})} variant='outlined' label="Address"/>
    </div>
    <div style={{margin:'auto'}}>
      <TextField error={errors.fatherName} size="small" {...register("fatherName",{required:true})}  variant='outlined' label="Father's Name"/>
    </div>
    <div style={{margin:'auto'}}>
      <TextField error={errors.fatherOccupation} size="small" {...register("fatherOccupation",{required:true})} variant='outlined' label="Father's Occupation"/>
    </div>
    <div style={{margin:'auto'}}>
      <TextField error={errors.motherName} size="small" {...register("motherName",{required:true})} variant='outlined' label="Mother's Name"/>
    </div>
    <div style={{margin:'auto'}}>
      <TextField error={errors.motherOccupation} size="small" {...register("motherOccupation",{required:true})} variant='outlined' label="Mother's Occupation"/>
    </div>
    <div style={{margin:'auto'}}>
      <TextField error={errors.bloodGroup} size="small" {...register("bloodGroup",{required:true})} variant='outlined' label="Blood Group"/>
    </div>
    <div style={{margin:'auto'}}>
      <TextField error={errors.identificationMark} size="small" {...register("identificationMark",{required:true})} variant='outlined' label="Identification Mark"/>
    </div>
    </div>
    <div className='Buttons'>
<Button type="button" variant='outlined' onClick={()=>{Dispatch(prev())}}>Previous</Button>
<Button type="submit" variant='contained'>Next</Button>
</div>
    </form>
</div>:null}
<DevTool control={control} />

    </>)
}


export default Step2;