import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';


const OtpVerification = () => {


  const [otp, setOtp] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerifyOtp = async () => {
    //  Implement logic to verify OTP on the server.
   
    const isOtpValid = true; // Replace with your OTP verification result

    if (isOtpValid) {
      setVerificationStatus('OTP verified. You can now reset your password.');

      
      history.push('/new-password');
    } else {
      setVerificationStatus('Invalid OTP. Please try again.');
    }
  };

  return (
    <Paper elevation={2} style={{ padding: '50px', maxWidth: '300px', margin: '0 auto',marginTop:'50px' }}>
      <h2>Enter OTP</h2>
      <TextField
        fullWidth
        label="OTP"
        type="text"
        value={otp}
        onChange={handleOtpChange}
        required
        variant="outlined"
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: '10px' }}
        onClick={handleVerifyOtp}
      >
        Verify OTP
      </Button>
      {verificationStatus && <p>{verificationStatus}</p>}
    </Paper>
  );
};

export default OtpVerification;

