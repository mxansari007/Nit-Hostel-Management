import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './assets/css/EditUploadData.css';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const EditUploadData = (props) => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const tableHeads = ['Roll no','First Name','Last Name','Year','Password','Department','Email'];

return (<>
    <div>
      <Button variant='contained' onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" sx={{textAlign:'center'}} component="h2">
            Edit Info
          </Typography>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
          <TableRow>
            {tableHeads.map(d=><TableCell sx={{fontWeight:'bold'}} align="right">{d}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              key={props.row.rollNo}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <input className='In' type="text" placeholder={props.row.rollNo}/>
                
              </TableCell>
              <TableCell align="right"><input className='In' type="text" placeholder={props.row.firstName}/></TableCell>
              <TableCell align="right"><input className='In' type="text" placeholder={props.row.lastName} /></TableCell>
              <TableCell align="right"><input className='In' type="number" placeholder={props.row.year}/></TableCell>
              <TableCell align="right"><input className='In' type="text" placeholder={props.row.password} /></TableCell>
              <TableCell align="right"><input className='In' type="text" placeholder={props.row.department}/></TableCell>
              <TableCell align="right"><input className='In email' type="text" placeholder={props.row.email}/></TableCell>
            </TableRow>
        </TableBody>
      </Table>
      
    </TableContainer>
    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
    <Button sx={{mt:'10px'}} variant='outlined' onClick={()=>{handleClose()}}>Update</Button>
    </div>
        </Box>
        
      </Modal>
    </div>
</>
);
 
}

export default EditUploadData;