import { Modal, useModal, Text } from "@nextui-org/react";
import {Button,Paper} from '@mui/material';
import './assets/css/ViewInfoModal.css';
import {Divider} from '@mui/material';
import {useEffect, useState} from 'react';
import {Input} from '@mui/material';
import { LoadingButton } from "@mui/lab";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ViewInfoModal(props) {

//state constants
  const { setVisible, bindings } = useModal();
  const [profile,setProfile] = useState(false);
  const [additional,setAdditional] = useState(false);
  const [bank,setBank] = useState(false);
  const [save,setSave] = useState(props.row);
  const [isChange,setChange] = useState(false);
  let temp = props.row;
  const [loading, setLoading] = useState(false);


  console.log(save.Profile.semester);
 const handleProfile = (e) =>{
  
  if(e.target.name == 'firstName'){
    temp = {firstName:e.target.value,
                ...save
                }
              }
    else if(e.target.name == 'lastName'){
      temp = {  ...save,
                    lastName:e.target.value,
                  }
                }
  else if(e.target.name == 'rollNo'){
    temp = {      ...save,
                  rollNo:e.target.value,
        }
  }
  else if(e.target.name == 'department'){
     temp = {     ...save,
                  department:e.target.value,
                }
              }
  else if(e.target.name == 'email'){
    temp = {      ...save,
                  email:e.target.value,

                }
  }

}

const handleAd = (e) =>{
  if(e.target.name == 'semester'){
    temp = {
      ...save,
      Profile:{
        ...save.Profile,
        semester:e.target.value,

      },
      
    }
  }else if(e.target.name == 'gender'){
    temp = {
      ...save,
      Profile:{
          ...save.Profile,
          gender:e.target.value,
      }}
  }else if(e.target.name == 'dob'){
    temp = {
      ...save,
      Profile:{
        ...save.Profile,
        dateOfBirth:e.target.value,
      }}
  }else if(e.target.name == 'contact'){
    temp = {
      ...save,
      Profile:{
        ...save.Profile,
        contactNumber:e.target.value,
      }}
  }else if(e.target.name == 's-contact'){
    temp = {
      ...save,
      Profile:{
        ...save.Profile,
        secondaryNumber:e.target.value,
      }}
  }else if(e.target.name == 'fatherName'){
    temp = {
      ...save,
      Profile:{
        ...save.Profile,
        fatherName:e.target.value,
      }}
  }else if(e.target.name == 'fatherOccu'){
    temp = {
      ...save,
      Profile:{
        ...save.Profile,
        fatherOccupation:e.target.value,
      }}
  }else if(e.target.name == 'motherName'){
    temp = {
      ...save,
      Profile:{
        ...save.Profile,
        motherName: e.target.value,
      }}
  }else if(e.target.name == 'motherOccu'){
    temp = {
      ...save,
      Profile:{
        ...save.Profile,
        motherOccupation:e.target.value,
      }}
  }else if(e.target.name == 'bloodGroup'){
    temp = {
      ...save,
      Profile:{
        ...save.Profile,
        bloodGroup: e.target.value,
      }}
  }else if(e.target.name == 'idMark'){
    temp = {
      ...save,
      Profile:{
        ...save.Profile,
        identificationMark: e.target.value,
      }}
  }
}

const handleBank = (e)=>{
    if(e.target.name == 'achn'){
      temp = {
        ...save,
        Profile:{
          ...save.Profile,
          bankDetails:{
            ...save.Profile.bankDetails,
            AccountHolderName:e.target.value,
          }
        }}
    }else if(e.target.name == 'acn'){
      temp = { 
        ...save,
        Profile:{
          ...save.Profile,
          bankDetails:{
            ...save.Profile.bankDetails,
            AccountNumber:e.target.value,
          }
        }}
    }else if(e.target.name == 'bn'){
      temp = {
        ...save,
        Profile:{
          ...save.Profile,
          bankDetails:{
            ...save.Profile.bankDetails,
            BankName:e.target.value,

          }
        }}
    }else if(e.target.name == 'ifsc'){
      temp = {
        ...save,
        Profile:{
          ...save.Profile,
          bankDetails:{
            ...save.Profile.bankDetails,
            IFSC:e.target.value
          }
        }}
    }
}

const saveToBackEnd = ()=>{
  setLoading(true);

  setLoading(false);
  setVisible(false);

  
}


  return (
    <>
      {/* <Button auto flat onPress={() => setVisible(true)}>
        Open modal
      </Button> */}
      <Button sx={{ml:'5px'}} onClick={() => setVisible(true)} variant="contained" size="small">View Info</Button>
      <Modal
        scroll
        fullScreen
        closeButton
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
        <h2 style={{color:'teal'}}>Hostel Vivekanand</h2>
        </Modal.Header>
        <Modal.Body>

        <div className="viewinfo-container">
        <Paper sx={{p:'25px'}}>
        <div className="Box">
        <div className="photo">
          <img className="photo" src={save.Profile.image} />
        </div>
        </div>
        <div className="all-info">
        <Divider />
        <div className="sub-title">
            <h3 style={{color:'teal'}}>Profile Details</h3>
            <div className="buttons">
            <Button onClick={()=>{setProfile(!profile)}}>{profile?<Button onClick={()=>{setSave(temp);setProfile(!profile);setChange(true)}}>Save</Button>:'Edit'}</Button>
            {profile?<Button onClick={()=>{setProfile(!profile);}}>Undo</Button>:null}
            </div>
        </div>
        <Divider />
        <div className="Box">
            <p><span style={{fontWeight:'bold'}}>First Name :</span> {profile?<Input name="firstName" onChange={handleProfile} defaultValue={save.firstName} />:save.firstName}</p>
            <p><span style={{fontWeight:'bold'}}>Last Name :</span> {profile?<Input name="lastName" onChange={handleProfile} defaultValue={save.lastName}/>:save.lastName}</p>
            <p><span style={{fontWeight:'bold'}}>Roll No :</span> {profile?<Input name="rollNo" onChange={handleProfile} defaultValue={save.rollNo} />:save.rollNo}</p>
            <p><span style={{fontWeight:'bold'}}>Official Email :</span> {profile?<Input name="off-email" onChange={handleAd} defaultValue={save.Profile.offcialEmail} />:save.Profile.officialEmail}</p>
            <p><span style={{fontWeight:'bold'}}>Course :</span> {profile?<Input name="course" onChange={handleAd} defaultValue={save.Profile.course} />:save.Profile.course}</p>
            <p><span style={{fontWeight:'bold'}}>Branch :</span> {profile?<Input name="branch" onChange={handleAd} defaultValue={save.Profile.branch} />:save.Profile.branch}</p>
            <p><span style={{fontWeight:'bold'}}>Department :</span> {profile?<Input name="department" onChange={handleProfile} defaultValue={save.department} />:save.department}</p>
            </div>
            <Divider />
            <div className="sub-title">
            <h3 style={{color:'teal'}}>Additional Details</h3>
            <div className="buttons">
            <Button onClick={()=>{setAdditional(!additional)}}>{additional?<Button onClick={()=>{setSave(temp);setAdditional(!additional);setChange(true)}}>Save</Button>:'Edit'}</Button>
            {additional?<Button onClick={()=>{setAdditional(!additional)}}>Undo</Button>:null}
            </div>
            </div>
            <Divider />
            <div className="Box">
            <p><span style={{fontWeight:'bold'}}>Room No :</span> {save.Rooms.length!=0?save.Rooms[0].roomNo:null}</p>
            <p><span style={{fontWeight:'bold'}}>Semester :</span> {additional?<Input name="semester" onChange={handleAd} defaultValue={save.Profile.semester} />: save.Profile.semester}</p>
            <p><span style={{fontWeight:'bold'}}>Gender :</span> {additional?<Input name="gender" onChange={handleAd} defaultValue={save.Profile.gender} />:save.Profile.gender}</p>
            <p><span style={{fontWeight:'bold'}}>Date Of Birth :</span> {additional?<Input name="dob" onChange={handleAd} defaultValue={save.Profile.dateOfBirth} />:save.Profile.dateOfBirth}</p>
            <p><span style={{fontWeight:'bold'}}>Email :</span> {profile?<Input name="email" onChange={handleProfile} defaultValue={save.email} />:save.email}</p>
            <p><span style={{fontWeight:'bold'}}>Contact :</span> {additional?<Input name="contact" onChange={handleAd} defaultValue={save.Profile.contactNumber} />:save.Profile.contactNumber}</p>
            <p><span style={{fontWeight:'bold'}}>Secondary Contact :</span> {additional?<Input name="s-contact" onChange={handleAd} defaultValue={save.Profile.secondaryNumber} />:save.Profile.secondaryNumber}</p>
            <p><span style={{fontWeight:'bold'}}>Address :</span> {additional?<Input name="semester" onChange={handleAd} defaultValue={save.Profile.address} />: save.Profile.address}</p>
            <p><span style={{fontWeight:'bold'}}>State :</span> {additional?<Input name="semester" onChange={handleAd} defaultValue={save.Profile.state} />: save.Profile.state}</p>
            <p><span style={{fontWeight:'bold'}}>Father's Name :</span> {additional?<Input name="fatherName" onChange={handleAd} defaultValue={save.Profile.fatherName} />:save.Profile.fatherName}</p>
            <p><span style={{fontWeight:'bold'}}>Father's Contact :</span> {additional?<Input name="fatherContact" onChange={handleAd} defaultValue={save.Profile.fatherContact} />:save.Profile.fatherContact}</p>
            <p><span style={{fontWeight:'bold'}}>Father's Occupation :</span> {additional?<Input name="fatherOccu" onChange={handleAd} defaultValue={save.Profile.fatherOccupation} />:save.Profile.fatherOccupation}</p>
            <p><span style={{fontWeight:'bold'}}>Mother's Name :</span> {additional?<Input name="motherName" onChange={handleAd} defaultValue={save.Profile.motherName} />:save.Profile.motherName}</p>
            <p><span style={{fontWeight:'bold'}}>Mother's Occupation :</span> {additional?<Input name="motherOccu" onChange={handleAd} defaultValue={save.Profile.motherOccupation} />:save.Profile.motherOccupation}</p>
            <p><span style={{fontWeight:'bold'}}>Blood Group :</span> {additional?<Input name="bloodGroup" onChange={handleAd} defaultValue={save.Profile.bloodGroup} />:save.Profile.bloodGroup}</p>
            <p><span style={{fontWeight:'bold'}}>Identification Mark :</span> {additional?<Input name="idMark" onChange={handleAd} defaultValue={save.Profile.identificationMark} />:save.Profile.identificationMark}</p>
            </div>
            <Divider />
            <div className="sub-title">
            <h3 style={{color:'teal'}}>Bank Details</h3>
            <div className="buttons">
            <Button onClick={()=>{setBank(!bank)}}>{bank?<Button onClick={()=>{setSave(temp);setBank(!bank);setChange(true)}}>Save</Button>:'Edit'}</Button>
            {bank?<Button onClick={()=>{setBank(!bank)}}>Undo</Button>:null}
            </div>
            </div>
            <Divider />
            <div className="Box">
            <p><span style={{fontWeight:'bold'}}>Account Holder Name :</span> {bank?<Input name="achn" onChange={handleBank} defaultValue={save.Profile.bankDetails.AccountHolderName} />:save.Profile.bankDetails.AccountHolderName}</p>
            <p><span style={{fontWeight:'bold'}}>Account Number :</span> {bank?<Input name="acn" onChange={handleBank} defaultValue={save.Profile.bankDetails.AccountNumber} />:save.Profile.bankDetails.AccountNumber}</p>
            <p><span style={{fontWeight:'bold'}}>Bank Name :</span> {bank?<Input name="bn" onChange={handleBank} defaultValue={save.Profile.bankDetails.BankName} />:save.Profile.bankDetails.BankName}</p>
            <p><span style={{fontWeight:'bold'}}>IFSC Code :</span> {bank?<Input name="ifsc" onChange={handleBank} defaultValue={save.Profile.bankDetails.IFSC} />:save.Profile.bankDetails.IFSC}</p>
            </div>
            
      <div style={{marginTop:'20px'}}>
      <Accordion disabled={save.Profile.aadhaarFrontImage===null?false:true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Aadhaar Front Image</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <img src={save.Profile.aadhaarFrontImage} alt="Front Image" />
        </AccordionDetails>
      </Accordion>
      <Accordion disabled={save.Profile.aadhaarFrontImage===null?false:true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Aadhaar Back Image</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <img src={save.Profile.aadhaarBackImage} alt="Back Image" />
        </AccordionDetails>
      </Accordion>
    </div>
        </div>
        </Paper>
        </div>


        </Modal.Body>
        <Modal.Footer style={{boxShadow:'0px 0px 3px 2px teal', zIndex:'1'}}>
          <Button color="error" sx={{mr:'10px'}} variant="outlined" onClick={() => setVisible(false)}>
            Close
          </Button>
          <LoadingButton loading={loading} disabled={!isChange} variant="outlined" onClick={saveToBackEnd}>Save Changes</LoadingButton>
        </Modal.Footer>
      </Modal>
    </>
  );
}