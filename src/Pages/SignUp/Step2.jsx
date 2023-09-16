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
import { setProfile,setAdditional } from '../../Store/Reducers/signUpDataSlice';
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
            officialEmail:"",

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
    Dispatch(setAdditional(data));
    Dispatch(next());
  }
}


    return (<>
        {count===(100/3)?<div>
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
      {...register("semester",{onChange:(e)=>{setSemester(e.target.value);},required:{value:true,message:'*Semester is Required'}})}
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
    <p className="error">{errors.semester?.message}</p>
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
      {...register("gender",{onChange:(e)=>{setGender(e.target.value);},required:{value:true,message:'*Gender is Required'}})}
    >
      <MenuItem value={'Male'}>Male</MenuItem>
      <MenuItem value={'Female'}>Female</MenuItem>
    </Select>
    </FormControl>
    <p className="error">{errors.gender?.message}</p>
    </div>
    
    <div style={{margin:'auto'}}>
          <TextField error={errors.dateOfBirth} name="dateOfBirth" size="small" {...register("dateOfBirth",{required:{value:true,message:'*date of birth is Required'}})} variant='outlined' label="Date of Birth" placeholder='dd/mm/yyyy'/>
          <p className="error">{errors.dateOfBirth?.message}</p>
    </div>
    <div style={{margin:'auto'}}>
          <TextField error={errors.officialEmail} name="officialEmail" size="small" {...register("officialEmail",{required:{value:true,message:'*official Email is required'}})} variant='outlined' label="Official Email" placeholder='rollNo@nitkkr.ac.in'/>
          <p className="error">{errors.officialEmail?.message}</p>
    </div>
    <div style={{margin:'auto'}}>
      <TextField error={errors.contactNumber} name="contactNumber" size="small" {...register("contactNumber",{required:{value:true,message:'*Primary contact is Required'}})} variant='outlined' label="Contact"/>
      <p className="error">{errors.contactNumber?.message}</p>
    </div>
    <div style={{margin:'auto'}}>
      <TextField placeholder='Optional' size="small" {...register("secondaryNumber")} variant='outlined' label="Secondary Contact"/>
      <p className="error">{errors.secondaryNumber?.message}</p>
    </div>
    <div style={{margin:'auto'}}>
      <TextField error={errors.address} size="small" {...register("address",{required:{value:true,message:'*Address is Required'}})} variant='outlined' label="Address"/>
      <p className="error">{errors.address?.message}</p>
    </div>
    <div style={{margin:'auto'}}>
      <TextField error={errors.fatherName} size="small" {...register("fatherName",{required:{value:true,message:'*Father Name is Required'}})}  variant='outlined' label="Father's Name"/>
      <p className="error">{errors.fatherName?.message}</p>
    </div>
    <div style={{margin:'auto'}}>
      <TextField error={errors.fatherOccupation} size="small" {...register("fatherOccupation",{required:{value:true,message:'Father Occupation is Required'}})} variant='outlined' label="Father's Occupation"/>
      <p className="error">{errors.fatherOccupation?.message}</p>
    </div>
    <div style={{margin:'auto'}}>
      <TextField error={errors.motherName} size="small" {...register("motherName",{required:{value:true,message:'*Mother Name is Required'}})} variant='outlined' label="Mother's Name"/>
      <p className="error">{errors.motherName?.message}</p>
    </div>
    <div style={{margin:'auto'}}>
      <TextField error={errors.motherOccupation} size="small" {...register("motherOccupation",{required:{value:true,message:'*Mother Occupation is Required'}})} variant='outlined' label="Mother's Occupation"/>
      <p className="error">{errors.motherOccupation?.message}</p>
    </div>
    <div style={{margin:'auto'}}>
      <TextField error={errors.bloodGroup} size="small" {...register("bloodGroup",{required:{value:true,message:'*Blood Group is Required'}})} variant='outlined' label="Blood Group"/>
      <p className="error">{errors.bloodGroup?.message}</p>
    </div>
    <div style={{margin:'auto'}}>
      <TextField error={errors.identificationMark} size="small" {...register("identificationMark",{required:{value:true,message:'*Identification Mark is Required'}})} variant='outlined' label="Identification Mark"/>
      <p className="error">{errors.identificationMark?.message}</p>
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