import {Modal, useModal} from "@nextui-org/react";
import {Button} from '@mui/material';
import './assets/ViewDetails.css';
import {useEffect} from 'react';
const ViewDetails = (props)=>{

    const {setVisible,bindings} = useModal();
    useEffect(()=>{
      console.log(props);
    },[])

    return <>
      <Button size="small" variant='contained' onClick={() => setVisible(true)}>
        View Details
      </Button>
      <Modal
        scroll
        fullScreen
        closeButton
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
     <Modal.Header>
        <h2 style={{color:'teal'}}>Room No: {props.row.roomNo} / <span className="floor-title">Floor No: {props.row.floorNo}</span></h2>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
     <Modal.Footer style={{boxShadow:'0px 0px 3px 2px teal', zIndex:'1'}}>
          <Button color="error" sx={{mr:'10px'}} variant="outlined" onClick={() => setVisible(false)}>
            Close
          </Button>
        </Modal.Footer>

      </Modal>

    </>
}


export default ViewDetails;