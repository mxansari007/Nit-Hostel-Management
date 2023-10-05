import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

const NewPasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSetNewPassword = async () => {
  
  };

  return (
    <Paper elevation={2} style={{ padding: '50px', maxWidth: '300px', margin: '0 auto' ,marginTop:'50px'}}>
      <h2>Set a New Password</h2>
      <TextField
        fullWidth
        label="New Password"
        type="password"
        value={newPassword}
        onChange={handleNewPasswordChange}
        required
        variant="outlined"
        margin="normal"
      />
      <TextField
        fullWidth
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        required
        variant="outlined"
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: '10px' }}
        onClick={handleSetNewPassword}
      >
        Set New Password
      </Button>
    </Paper>
  );
};

export default NewPasswordForm;
