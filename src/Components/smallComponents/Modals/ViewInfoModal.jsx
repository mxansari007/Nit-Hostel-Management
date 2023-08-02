import { Modal, useModal, Text } from "@nextui-org/react";
import {Button,Paper} from '@mui/material';
import './assets/css/ViewInfoModal.css';
import {Divider} from '@mui/material';
import {useEffect, useState} from 'react';
import {Input} from '@mui/material';
import { LoadingButton } from "@mui/lab";


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
      Profile:{
        semester:e.target.value,
      },
      ...save
    }
  }else if(e.target.name == 'gender'){
    temp = {firstName:props.row.firstName,
      lastName:props.row.lastName,
      rollNo:props.row.rollNo,
      department:e.target.value,
      email:props.row.email,
      Profile:{
        semester:props.row.Profile.semester,
        gender:e.target.value,
        dateOfBirth:props.row.Profile.dateOfBirth,
        contactNumber:props.row.Profile.contactNumber,
        secondaryNumber:props.row.Profile.secondaryNumber,
        fatherName:props.row.Profile.fatherName,
        fatherOccupation:props.row.Profile.fatherOccupation,
        motherName: props.row.Profile.motherName,
        motherOccupation: props.row.Profile.motherOccupation,
        bloodGroup: props.row.Profile.bloodGroup,
        identificationMark: props.row.Profile.identificationMark,
        bankDetails:props.row.Profile.bankDetails
      }}
  }else if(e.target.name == 'dob'){
    temp = {firstName:props.row.firstName,
      lastName:props.row.lastName,
      rollNo:props.row.rollNo,
      department:e.target.value,
      email:props.row.email,
      Profile:{
        semester:props.row.Profile.semester,
        gender:props.row.Profile.gender,
        dateOfBirth:e.target.value,
        contactNumber:props.row.Profile.contactNumber,
        secondaryNumber:props.row.Profile.secondaryNumber,
        fatherName:props.row.Profile.fatherName,
        fatherOccupation:props.row.Profile.fatherOccupation,
        motherName: props.row.Profile.motherName,
        motherOccupation: props.row.Profile.motherOccupation,
        bloodGroup: props.row.Profile.bloodGroup,
        identificationMark: props.row.Profile.identificationMark,
        bankDetails:props.row.Profile.bankDetails
      }}
  }else if(e.target.name == 'contact'){
    temp = {firstName:props.row.firstName,
      lastName:props.row.lastName,
      rollNo:props.row.rollNo,
      department:e.target.value,
      email:props.row.email,
      Profile:{
        semester:props.row.Profile.semester,
        gender:props.row.Profile.gender,
        dateOfBirth:props.row.Profile.dateOfBirth,
        contactNumber:e.target.value,
        secondaryNumber:props.row.Profile.secondaryNumber,
        fatherName:props.row.Profile.fatherName,
        fatherOccupation:props.row.Profile.fatherOccupation,
        motherName: props.row.Profile.motherName,
        motherOccupation: props.row.Profile.motherOccupation,
        bloodGroup: props.row.Profile.bloodGroup,
        identificationMark: props.row.Profile.identificationMark,
        bankDetails:props.row.Profile.bankDetails
      }}
  }else if(e.target.name == 's-contact'){
    temp = {firstName:props.row.firstName,
      lastName:props.row.lastName,
      rollNo:props.row.rollNo,
      department:e.target.value,
      email:props.row.email,
      Profile:{
        semester:props.row.Profile.semester,
        gender:props.row.Profile.gender,
        dateOfBirth:props.row.Profile.dateOfBirth,
        contactNumber:props.row.Profile.contactNumber,
        secondaryNumber:e.target.value,
        fatherName:props.row.Profile.fatherName,
        fatherOccupation:props.row.Profile.fatherOccupation,
        motherName: props.row.Profile.motherName,
        motherOccupation: props.row.Profile.motherOccupation,
        bloodGroup: props.row.Profile.bloodGroup,
        identificationMark: props.row.Profile.identificationMark,
        bankDetails:props.row.Profile.bankDetails
      }}
  }else if(e.target.name == 'fatherName'){
    temp = {firstName:props.row.firstName,
      lastName:props.row.lastName,
      rollNo:props.row.rollNo,
      department:e.target.value,
      email:props.row.email,
      Profile:{
        semester:props.row.Profile.semester,
        gender:props.row.Profile.gender,
        dateOfBirth:props.row.Profile.dateOfBirth,
        contactNumber:props.row.Profile.contactNumber,
        secondaryNumber:props.row.Profile.secondaryNumber,
        fatherName:e.target.value,
        fatherOccupation:props.row.Profile.fatherOccupation,
        motherName: props.row.Profile.motherName,
        motherOccupation: props.row.Profile.motherOccupation,
        bloodGroup: props.row.Profile.bloodGroup,
        identificationMark: props.row.Profile.identificationMark,
        bankDetails:props.row.Profile.bankDetails
      }}
  }else if(e.target.name == 'fatherOccu'){
    temp = {firstName:props.row.firstName,
      lastName:props.row.lastName,
      rollNo:props.row.rollNo,
      department:e.target.value,
      email:props.row.email,
      Profile:{
        semester:props.row.Profile.semester,
        gender:props.row.Profile.gender,
        dateOfBirth:props.row.Profile.dateOfBirth,
        contactNumber:props.row.Profile.contactNumber,
        secondaryNumber:props.row.Profile.secondaryNumber,
        fatherName:props.row.Profile.fatherName,
        fatherOccupation:e.target.value,
        motherName: props.row.Profile.motherName,
        motherOccupation: props.row.Profile.motherOccupation,
        bloodGroup: props.row.Profile.bloodGroup,
        identificationMark: props.row.Profile.identificationMark,
        bankDetails:props.row.Profile.bankDetails
      }}
  }else if(e.target.name == 'motherName'){
    temp = {firstName:props.row.firstName,
      lastName:props.row.lastName,
      rollNo:props.row.rollNo,
      department:e.target.value,
      email:props.row.email,
      Profile:{
        semester:props.row.Profile.semester,
        gender:props.row.Profile.gender,
        dateOfBirth:props.row.Profile.dateOfBirth,
        contactNumber:props.row.Profile.contactNumber,
        secondaryNumber:props.row.Profile.secondaryNumber,
        fatherName:props.row.Profile.fatherName,
        fatherOccupation:props.row.Profile.fatherOccupation,
        motherName: e.target.value,
        motherOccupation: props.row.Profile.motherOccupation,
        bloodGroup: props.row.Profile.bloodGroup,
        identificationMark: props.row.Profile.identificationMark,
        bankDetails:props.row.Profile.bankDetails
      }}
  }else if(e.target.name == 'motherOccu'){
    temp = {firstName:props.row.firstName,
      lastName:props.row.lastName,
      rollNo:props.row.rollNo,
      department:e.target.value,
      email:props.row.email,
      Profile:{
        semester:props.row.Profile.semester,
        gender:props.row.Profile.gender,
        dateOfBirth:props.row.Profile.dateOfBirth,
        contactNumber:props.row.Profile.contactNumber,
        secondaryNumber:props.row.Profile.secondaryNumber,
        fatherName:props.row.Profile.fatherName,
        fatherOccupation:props.row.Profile.fatherOccupation,
        motherName: props.row.Profile.motherName,
        motherOccupation:e.target.value,
        bloodGroup: props.row.Profile.bloodGroup,
        identificationMark: props.row.Profile.identificationMark,
        bankDetails:props.row.Profile.bankDetails
      }}
  }else if(e.target.name == 'bloodGroup'){
    temp = {firstName:props.row.firstName,
      lastName:props.row.lastName,
      rollNo:props.row.rollNo,
      department:e.target.value,
      email:props.row.email,
      Profile:{
        semester:props.row.Profile.semester,
        gender:props.row.Profile.gender,
        dateOfBirth:props.row.Profile.dateOfBirth,
        contactNumber:props.row.Profile.contactNumber,
        secondaryNumber:props.row.Profile.secondaryNumber,
        fatherName:props.row.Profile.fatherName,
        fatherOccupation:props.row.Profile.fatherOccupation,
        motherName: props.row.Profile.motherName,
        motherOccupation: props.row.Profile.motherOccupation,
        bloodGroup: e.target.value,
        identificationMark: props.row.Profile.identificationMark,
        bankDetails:props.row.Profile.bankDetails
      }}
  }else if(e.target.name == 'idMark'){
    temp = {firstName:props.row.firstName,
      lastName:props.row.lastName,
      rollNo:props.row.rollNo,
      department:e.target.value,
      email:props.row.email,
      Profile:{
        semester:props.row.Profile.semester,
        gender:props.row.Profile.gender,
        dateOfBirth:props.row.Profile.dateOfBirth,
        contactNumber:props.row.Profile.contactNumber,
        secondaryNumber:props.row.Profile.secondaryNumber,
        fatherName:props.row.Profile.fatherName,
        fatherOccupation:props.row.Profile.fatherOccupation,
        motherName: props.row.Profile.motherName,
        motherOccupation: props.row.Profile.motherOccupation,
        bloodGroup: props.row.Profile.bloodGroup,
        identificationMark: e.target.value,
        bankDetails:props.row.Profile.bankDetails
      }}
  }
}

const handleBank = (e)=>{
    if(e.target.name == 'achn'){
      temp = {firstName:props.row.firstName,
        lastName:props.row.lastName,
        rollNo:props.row.rollNo,
        department:e.target.value,
        email:props.row.email,
        Profile:{
          semester:props.row.Profile.semester,
          gender:props.row.Profile.gender,
          dateOfBirth:props.row.Profile.dateOfBirth,
          contactNumber:props.row.Profile.contactNumber,
          secondaryNumber:props.row.Profile.secondaryNumber,
          fatherName:props.row.Profile.fatherName,
          fatherOccupation:props.row.Profile.fatherOccupation,
          motherName: props.row.Profile.motherName,
          motherOccupation: props.row.Profile.motherOccupation,
          bloodGroup: props.row.Profile.bloodGroup,
          identificationMark: e.target.value,
          bankDetails:{
            AccountHolderName:e.target.value,
            AccountNumber:props.row.Profile.bankDetails.AccountNumber,
            BankName:props.row.Profile.bankDetails.BankName,
            IFSC:props.row.Profile.bankDetails.IFSC
          }
        }}
    }else if(e.target.name == 'acn'){
      temp = {firstName:props.row.firstName,
        lastName:props.row.lastName,
        rollNo:props.row.rollNo,
        department:e.target.value,
        email:props.row.email,
        Profile:{
          semester:props.row.Profile.semester,
          gender:props.row.Profile.gender,
          dateOfBirth:props.row.Profile.dateOfBirth,
          contactNumber:props.row.Profile.contactNumber,
          secondaryNumber:props.row.Profile.secondaryNumber,
          fatherName:props.row.Profile.fatherName,
          fatherOccupation:props.row.Profile.fatherOccupation,
          motherName: props.row.Profile.motherName,
          motherOccupation: props.row.Profile.motherOccupation,
          bloodGroup: props.row.Profile.bloodGroup,
          identificationMark: e.target.value,
          bankDetails:{
            AccountHolderName:props.row.Profile.bankDetails.AccountHolderName,
            AccountNumber:e.target.value,
            BankName:props.row.Profile.bankDetails.BankName,
            IFSC:props.row.Profile.bankDetails.IFSC
          }
        }}
    }else if(e.target.name == 'bn'){
      temp = {firstName:props.row.firstName,
        lastName:props.row.lastName,
        rollNo:props.row.rollNo,
        department:e.target.value,
        email:props.row.email,
        Profile:{
          semester:props.row.Profile.semester,
          gender:props.row.Profile.gender,
          dateOfBirth:props.row.Profile.dateOfBirth,
          contactNumber:props.row.Profile.contactNumber,
          secondaryNumber:props.row.Profile.secondaryNumber,
          fatherName:props.row.Profile.fatherName,
          fatherOccupation:props.row.Profile.fatherOccupation,
          motherName: props.row.Profile.motherName,
          motherOccupation: props.row.Profile.motherOccupation,
          bloodGroup: props.row.Profile.bloodGroup,
          identificationMark: e.target.value,
          bankDetails:{
            AccountHolderName:props.row.Profile.bankDetails.AccountHolderName,
            AccountNumber:props.row.Profile.bankDetails.AccountNumber,
            BankName:e.target.value,
            IFSC:props.row.Profile.bankDetails.IFSC
          }
        }}
    }else if(e.target.name == 'ifsc'){
      temp = {firstName:props.row.firstName,
        lastName:props.row.lastName,
        rollNo:props.row.rollNo,
        department:e.target.value,
        email:props.row.email,
        Profile:{
          semester:props.row.Profile.semester,
          gender:props.row.Profile.gender,
          dateOfBirth:props.row.Profile.dateOfBirth,
          contactNumber:props.row.Profile.contactNumber,
          secondaryNumber:props.row.Profile.secondaryNumber,
          fatherName:props.row.Profile.fatherName,
          fatherOccupation:props.row.Profile.fatherOccupation,
          motherName: props.row.Profile.motherName,
          motherOccupation: props.row.Profile.motherOccupation,
          bloodGroup: props.row.Profile.bloodGroup,
          identificationMark: e.target.value,
          bankDetails:{
            AccountHolderName:props.row.Profile.bankDetails.AccountHolderName,
            AccountNumber:props.row.Profile.bankDetails.AccountNumber,
            BankName:props.row.Profile.bankDetails.BankName,
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

        <div className="container">
        <Paper sx={{p:'25px'}}>
        <div className="Box">
        <div className="photo"></div>
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
            <p><span style={{fontWeight:'bold'}}>Department :</span> {profile?<Input name="department" onChange={handleProfile} defaultValue={save.department} />:save.department}</p>
            <p><span style={{fontWeight:'bold'}}>Email :</span> {profile?<Input name="email" onChange={handleProfile} defaultValue={save.email} />:save.email}</p>
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
            <p><span style={{fontWeight:'bold'}}>Semester :</span> {additional?<Input name="semester" onChange={handleAd} defaultValue={save.Profile.semester} />: save.Profile.semester}</p>
            <p><span style={{fontWeight:'bold'}}>Gender :</span> {additional?<Input name="gender" onChange={handleAd} defaultValue={save.Profile.gender} />:save.Profile.gender}</p>
            <p><span style={{fontWeight:'bold'}}>Date Of Birth :</span> {additional?<Input name="dob" onChange={handleAd} defaultValue={save.Profile.dateOfBirth} />:save.Profile.dateOfBirth}</p>
            <p><span style={{fontWeight:'bold'}}>Contact :</span> {additional?<Input name="contact" onChange={handleAd} defaultValue={save.Profile.contactNumber} />:save.Profile.contactNumber}</p>
            <p><span style={{fontWeight:'bold'}}>Secondary Contact :</span> {additional?<Input name="s-contact" onChange={handleAd} defaultValue={save.Profile.secondaryNumber} />:save.Profile.secondaryNumber}</p>
            <p><span style={{fontWeight:'bold'}}>Father's Name :</span> {additional?<Input name="fatherName" onChange={handleAd} defaultValue={save.Profile.fatherName} />:save.Profile.fatherName}</p>
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