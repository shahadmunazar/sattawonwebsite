import React from 'react';
import { IconButton } from '@mui/material';
import { WhatsApp } from '@mui/icons-material';

const ChatBotWhatsApp: React.FC = () => {
  return (
    <IconButton
      href="https://wa.me/919718487696 " // Replace with your WhatsApp number
      target="_blank"
      aria-label="Chat with us on WhatsApp"
      sx={{
        position: 'fixed',
        bottom: { xs: '10px', sm: '20px' }, // Responsive bottom spacing
        left: { xs: '10px', sm: '20px' }, // Responsive left spacing
        backgroundColor: '#25d366',
        color: '#fff',
        borderRadius: '50%',
        boxShadow: 3,
        width: { xs: '48px', sm: '56px' }, // Responsive width
        height: { xs: '48px', sm: '56px' }, // Responsive height
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
          backgroundColor: '#1ebe54',
        },
        transition: 'background-color 0.3s ease', // Smooth color transition on hover
      }}
    >
      <WhatsApp sx={{ fontSize: { xs: '24px', sm: '28px' } }} /> {/* Responsive icon size */}
    </IconButton>
  );
};

export default ChatBotWhatsApp;
