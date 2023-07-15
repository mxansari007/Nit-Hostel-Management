import { Modal, useModal, Text } from "@nextui-org/react";
import {Button,Paper} from '@mui/material';
import './assets/css/ViewInfoModal.css';
import {Divider} from '@mui/material';
import {useEffect, useState} from 'react';
import {Input} from '@mui/material';


export default function ViewInfoModal(props) {

//state constants
  const { setVisible, bindings } = useModal();
  const [profile,setProfile] = useState(false);
  const [additional,setAdditional] = useState(false);
  const [bank,setBank] = useState(false);
  let [tempData, setTempData] = useState(props.row);
  const [undoData,setUndoData] = useState(tempData);


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
            <Button onClick={()=>{setProfile(!profile)}}>{profile?'Save':'Edit'}</Button>
            {profile?<Button onClick={()=>{setTempData(undoData);setProfile(!profile);console.log(tempData)}}>Undo</Button>:null}
            </div>
        </div>
        <Divider />
        <div className="Box">
            <p><span style={{fontWeight:'bold'}}>First Name :</span> {profile?<Input onChange={(e)=>{tempData.firstName = e.target.value}} defaultValue={props.row.firstName} />:props.row.firstName}</p>
            <p><span style={{fontWeight:'bold'}}>Last Name :</span> {profile?<Input onChange={(e)=>{tempData.lastName = e.target.value}} defaultValue={props.row.lastName}/>:props.row.lastName}</p>
            <p><span style={{fontWeight:'bold'}}>Roll No :</span> {profile?<Input onChange={(e)=>{tempData.rollNo = e.target.value}} defaultValue={props.row.rollNo} />:props.row.rollNo}</p>
            <p><span style={{fontWeight:'bold'}}>Department :</span> {profile?<Input onChange={(e)=>{tempData.department = e.target.value}} defaultValue={props.row.department} />:props.row.department}</p>
            <p><span style={{fontWeight:'bold'}}>Email :</span> {profile?<Input onChange={(e)=>{tempData.email = e.target.value}} defaultValue={props.row.email} />:props.row.email}</p>
            </div>
            <Divider />
            <div className="sub-title">
            <h3 style={{color:'teal'}}>Additional Details</h3>
            <div className="buttons">
            <Button onClick={()=>{setAdditional(!additional)}}>{additional?'Save':'Edit'}</Button>
            {additional?<Button onClick={()=>{setAdditional(!additional)}}>Undo</Button>:null}
            </div>
            </div>
            <Divider />
            <div className="Box">
            <p><span style={{fontWeight:'bold'}}>Semester :</span> {additional?<Input onChange={(e)=>{tempData.Profile.semester = e.target.value}} defaultValue={props.row.Profile.semester} />: props.row.Profile.semester}</p>
            <p><span style={{fontWeight:'bold'}}>Gender :</span> {additional?<Input onChange={(e)=>{tempData.Profile.gender = e.target.value}} defaultValue={props.row.Profile.gender} />:props.row.Profile.gender}</p>
            <p><span style={{fontWeight:'bold'}}>Date Of Birth :</span> {additional?<Input onChange={(e)=>{tempData.Profile.dateOfBirth = e.target.value}} defaultValue={props.row.Profile.dateOfBirth} />:props.row.Profile.dateOfBirth}</p>
            <p><span style={{fontWeight:'bold'}}>Contact :</span> {additional?<Input onChange={(e)=>{tempData.Profile.contactNumber = e.target.value}} defaultValue={props.row.Profile.contactNumber} />:props.row.Profile.contactNumber}</p>
            <p><span style={{fontWeight:'bold'}}>Secondary Contact :</span> {additional?<Input onChange={(e)=>{tempData.Profile.secondaryNumber = e.target.value}} defaultValue={props.row.Profile.secondaryNumber} />:props.row.Profile.secondaryNumber}</p>
            <p><span style={{fontWeight:'bold'}}>Father's Name :</span> {additional?<Input onChange={(e)=>{tempData.Profile.fatherName = e.target.value}} defaultValue={props.row.Profile.fatherName} />:props.row.Profile.fatherName}</p>
            <p><span style={{fontWeight:'bold'}}>Father's Occupation :</span> {additional?<Input onChange={(e)=>{tempData.Profile.fatherOccupation = e.target.value}} defaultValue={props.row.Profile.fatherOccupation} />:props.row.Profile.fatherOccupation}</p>
            <p><span style={{fontWeight:'bold'}}>Mother's Name :</span> {additional?<Input onChange={(e)=>{tempData.Profile.motherName = e.target.value}} defaultValue={props.row.Profile.motherName} />:props.row.Profile.motherName}</p>
            <p><span style={{fontWeight:'bold'}}>Mother's Occupation :</span> {additional?<Input onChange={(e)=>{tempData.Profile.motherOccupation = e.target.value}} defaultValue={props.row.Profile.motherOccupation} />:props.row.Profile.motherOccupation}</p>
            <p><span style={{fontWeight:'bold'}}>Blood Group :</span> {additional?<Input onChange={(e)=>{tempData.Profile.bloodGroup = e.target.value}} defaultValue={props.row.Profile.bloodGroup} />:props.row.Profile.bloodGroup}</p>
            <p><span style={{fontWeight:'bold'}}>Identification Mark :</span> {additional?<Input onChange={(e)=>{tempData.Profile.identificationMark = e.target.value}} defaultValue={props.row.Profile.identificationMark} />:props.row.Profile.identificationMark}</p>
            </div>
            <Divider />
            <div className="sub-title">
            <h3 style={{color:'teal'}}>Bank Details</h3>
            <div className="buttons">
            <Button onClick={()=>{setBank(!bank)}}>{bank?'Save':'Edit'}</Button>
            {bank?<Button onClick={()=>{setBank(!bank)}}>Undo</Button>:null}
            </div>
            </div>
            <Divider />
            <div className="Box">
            <p><span style={{fontWeight:'bold'}}>Account Holder Name :</span> {bank?<Input onChange={(e)=>{tempData.Profile.bankDetails.AccountHolderName = e.target.value}} defaultValue={props.row.Profile.bankDetails.AccountHolderName} />:props.row.Profile.bankDetails.AccountHolderName}</p>
            <p><span style={{fontWeight:'bold'}}>Account Number :</span> {bank?<Input onChange={(e)=>{tempData.Profile.bankDetails.AccountNumber = e.target.value}} defaultValue={props.row.Profile.bankDetails.AccountNumber} />:props.row.Profile.bankDetails.AccountNumber}</p>
            <p><span style={{fontWeight:'bold'}}>Bank Name :</span> {bank?<Input onChange={(e)=>{tempData.Profile.bankDetails.BankName = e.target.value}} defaultValue={props.row.Profile.bankDetails.BankName} />:props.row.Profile.bankDetails.BankName}</p>
            <p><span style={{fontWeight:'bold'}}>IFSC Code :</span> {bank?<Input onChange={(e)=>{tempData.Profile.bankDetails.IFSC = e.target.value}} defaultValue={props.row.Profile.bankDetails.IFSC} />:props.row.Profile.bankDetails.IFSC}</p>
            </div>
        </div>
        </Paper>
        </div>


        </Modal.Body>
        <Modal.Footer style={{boxShadow:'0px 0px 3px 2px teal', zIndex:'1'}}>
          <Button color="error" sx={{mr:'10px'}} variant="outlined" onClick={() => setVisible(false)}>
            Close
          </Button>
          <Button disabled variant="outlined" onClick={() => setVisible(false)}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}