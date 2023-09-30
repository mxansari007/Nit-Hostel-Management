import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import axios from 'axios';


const EmailOtpForm = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendOtp = async () => {


  };




  return (
    <Paper elevation={2} style={{ padding: '50px', maxWidth: '300px', margin: '0 auto',marginTop:'30px' }}>
      <h2>Forget Password</h2>
      <TextField
        fullWidth
        label=" Enter Your Email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        required
        variant="outlined"
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: '10px' }}
        onClick={handleSendOtp}
      >
        Send OTP
      </Button>
      {otpSent && <p>OTP sent to your email. Check your inbox.</p>}
    </Paper>
  );
};

export default EmailOtpForm;
