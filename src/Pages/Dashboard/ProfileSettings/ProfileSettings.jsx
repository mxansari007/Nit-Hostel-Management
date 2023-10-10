import React, { useState } from 'react';
import './Assets/ProfileSettings.css';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

const ProfileSettings = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value); 
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("New password and Confirm password don't match");
      setSuccessMessage('');
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/changePassword`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setSuccessMessage("Password reset successful");
        setError('');
      } else {
        setError("Old password is incorrect");
        setSuccessMessage('');
        setOldPassword(''); 
      }
    } catch (error) {
      setError("An error occurred while resetting the password");
      setSuccessMessage('');
    }
  };

  return (
    <>
      <Paper id="resetBox" elevation={2}>
        <h2 style={{ marginBottom: '20px' }}>Reset Password</h2>
        <form style={{ textAlign: 'center', padding: '20px' }}>
          <TextField
            type="password"
            label="Old Password"
            variant="outlined"
            value={oldPassword}
            onChange={handleOldPasswordChange} 
            style={{ marginBottom: '20px' }}
          />
          <TextField
            type="password"
            label="New Password"
            variant="outlined"
            value={newPassword}
            onChange={handleNewPasswordChange}
            style={{ marginBottom: '20px' }}
          />
          <TextField
            type="password"
            label="Confirm Password"
            variant="outlined"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            style={{ marginBottom: '20px' }}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          <Button
            variant="contained"
            color="primary"
            onClick={handleResetPassword}
            style={{ display: 'block', margin: '0 auto', marginTop: '20px' }}
          >
            <span>Reset</span>
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default ProfileSettings;
