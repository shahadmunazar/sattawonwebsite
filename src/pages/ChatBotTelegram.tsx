import React from 'react';
import { IconButton } from '@mui/material';
import { Telegram } from '@mui/icons-material';

const ChatBotTelegram: React.FC = () => {
  return (
    <IconButton
      href="https://t.me/Sw_king_007" // Replace with your Telegram profile URL
      target="_blank"
      aria-label="Chat with us on Telegram"
      sx={{
        position: 'fixed',
        bottom: { xs: '10px', sm: '20px' }, // Responsive bottom spacing
        right: { xs: '10px', sm: '20px' }, // Responsive right spacing
        backgroundColor: '#0088cc',
        color: '#fff',
        borderRadius: '50%',
        boxShadow: 3,
        width: { xs: '48px', sm: '56px' }, // Responsive width
        height: { xs: '48px', sm: '56px' }, // Responsive height
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
          backgroundColor: '#007ab8',
        },
        transition: 'background-color 0.3s ease', // Smooth color transition on hover
      }}
    >
      <Telegram sx={{ fontSize: { xs: '24px', sm: '28px' } }} /> {/* Responsive icon size */}
    </IconButton>
  );
};

export default ChatBotTelegram;
