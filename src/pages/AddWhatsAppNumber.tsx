import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';

const AddWhatsAppNumber: React.FC = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [alert, setAlert] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | undefined } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://apisattaking.sattakingmaker.com/api/add-whats-app-number', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, mobile }),
      });

      const data = await response.json();

      if (response.ok) {
        setAlert({ open: true, message: 'Contact form submitted successfully!', severity: 'success' });
        setName('');
        setMobile('');
      } else {
        // Check for validation errors and display them
        const errorMessage = data.errors?.mobile ? data.errors.mobile.join(', ') : data.message || 'An error occurred.';
        setAlert({ open: true, message: errorMessage, severity: 'error' });
      }
    } catch (error) {
      setAlert({ open: true, message: 'Network error occurred. Please try again.', severity: 'error' });
    }
  };

  const handleClose = () => {
    setAlert(null);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: '0 auto',
        padding: 3,
        backgroundColor: '#f9f9f9',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Add WhatsApp Number
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
          label="Mobile Number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
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

export default AddWhatsAppNumber;
