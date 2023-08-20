import {Modal, useModal} from "@nextui-org/react";
import {Button,Paper} from '@mui/material';
import './assets/ViewDetails.css';
import { useEffect } from "react";

const ViewDetails = (props)=>{

    const {setVisible,bindings} = useModal();
   
    useEffect(()=>{
      console.log(props.row);
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
        
        
        <div id="room-paper" >
        <h2>Occupants</h2>
        <Paper elevation={2} >
        
        <div style={{margin:'25px 0'}} className="occupants">
        {props.row.students.map(d =><div>
                  <img  src={d.Profile.image} alt="Image 1" className="image"/>
                  <h3>{d.firstName} {d.lastName}</h3>
                </div> )}

      </div>
      
        </Paper>
        <h3>Size:{props.row.occupancy}</h3>
        </div>
        
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