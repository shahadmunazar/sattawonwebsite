import React, { useState, useEffect } from 'react';
// @ts-ignore

import { Box, TextField, Button, Typography, Fade, Snackbar, Alert } from '@mui/material';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from 'axios';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');
  // @ts-ignore

  const [submitted, setSubmitted] = useState(false);
  const [alert, setAlert] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | undefined } | null>(null);
  const [defaultCountry, setDefaultCountry] = useState('in'); // Default to India

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get('https://ipapi.co/json/');
        setDefaultCountry(response.data.country.toLowerCase()); // Set default country based on IP
      } catch (error) {
        console.error('Error fetching country:', error);
      }
    };

    fetchCountry();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Mobile number validation
    // if (!/^\+\d{1,3}\s?\d{1,14}(?:x.+)?$/.test(mobile)) {
    //   setAlert({ open: true, message: 'Please enter a valid mobile number.', severity: 'error' });
    //   return;
    // }
  
    try {
      const response = await axios.post('https://apisattaking.sattakingmaker.com/api/contact-form', {
        name,
        email,
        mobile,
        message,
      });
  
      if (response.status === 201) {
        setAlert({ open: true, message: 'Contact form submitted successfully!', severity: 'success' });
        setSubmitted(true);
        setName('');
        setEmail('');
        setMobile('');
        setMessage('');
      }
    } catch (error) {
      setAlert({ open: true, message: 'An error occurred while submitting the form. Please try again.', severity: 'error' });
      console.error('Error submitting form:', error);
    }
  };
  

  const handleClose = () => {
    setAlert(null);
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: '0 auto',
        padding: 3,
        backgroundColor: '#f9f9f9',
        borderRadius: 2,
        boxShadow: 3,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Contact Us
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <PhoneInput
          country={defaultCountry} // Use fetched country
          value={mobile}
          onChange={setMobile}
          inputStyle={{
            width: '100%',
            border: '1px solid #ccc',
            borderRadius: '4px',
            margin: '16px 0',
            padding: '10px',
            transition: 'border-color 0.3s ease',
          }}
        />
        <TextField
          label="Message"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2, width: '100%' }}
        >
          Submit
        </Button>
      </form>

      <Snackbar
        open={alert?.open || false}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={alert?.severity} sx={{ width: '100%' }}>
          {alert?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
