import React from 'react';
import { IconButton } from '@mui/material';
import { Instagram } from '@mui/icons-material';

const ChatBotInstagram: React.FC = () => {
  return (
    <IconButton
      href="https://instagram.com/yourprofile" // Replace with your Instagram profile URL
      target="_blank"
      aria-label="Follow us on Instagram"
      sx={{
        position: 'fixed',
        bottom: { xs: '10px', sm: '20px' },
        left: { xs: '130px', sm: '140px' }, // Adjust positioning to avoid overlap
        backgroundColor: '#e4405f',
        color: '#fff',
        borderRadius: '50%',
        boxShadow: 3,
        width: { xs: '48px', sm: '56px' },
        height: { xs: '48px', sm: '56px' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
          backgroundColor: '#c13584',
        },
        transition: 'background-color 0.3s ease',
      }}
    >
      <Instagram sx={{ fontSize: { xs: '24px', sm: '28px' } }} />
    </IconButton>
  );
};

export default ChatBotInstagram;
