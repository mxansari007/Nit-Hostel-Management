import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const UploadInstructions = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

return (<>
    <div>
      <Button variant='contained' onClick={handleOpen}>Show Instructions</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Instructions For CSV
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           <p> - other than password all fields are required</p>
           <p> - first row is the table headings</p>
           <p> - you can fill each row on new lines</p>
            <p> - each cell entries are seprated by comma </p>
          </Typography>
          <Button variant='contained' sx={{my:'5px'}}><a href="https://drive.google.com/file/d/1FsPWB9CM9y61Q2Hy-lMWgiuVZVErW0vq/view?usp=drive_link" target='_blank'>Download Demo CSV</a></Button>
        </Box>
      </Modal>
    </div>
</>
);
 
}

export default UploadInstructions