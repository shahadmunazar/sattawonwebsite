import React from 'react';
import { IconButton } from '@mui/material';
import { Facebook } from '@mui/icons-material'; // Messenger icon from MUI

const ChatBotMessenger: React.FC = () => {
  return (
    <IconButton
      href="https://m.me/yourprofile" // Replace with your Messenger profile URL
      target="_blank"
      aria-label="Chat with us on Messenger"
      sx={{
        position: 'fixed',
        bottom: { xs: '10px', sm: '20px' },
        left: { xs: '70px', sm: '80px' }, // Adjust positioning to avoid overlap
        backgroundColor: '#0084ff',
        color: '#fff',
        borderRadius: '50%',
        boxShadow: 3,
        width: { xs: '48px', sm: '56px' },
        height: { xs: '48px', sm: '56px' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
          backgroundColor: '#007bff',
        },
        transition: 'background-color 0.3s ease',
      }}
    >
      <Facebook sx={{ fontSize: { xs: '24px', sm: '28px' } }} />
    </IconButton>
  );
};

export default ChatBotMessenger;
