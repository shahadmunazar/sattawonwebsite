import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, WhatsApp, Telegram } from '@mui/icons-material';

const ContactSocial: React.FC = () => {
  return (
    <Box
      sx={{
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: 2,
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'center'
      }}
    >
      <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
        Connect with Us
      </Typography>

      <Typography variant="body1" sx={{ marginBottom: '20px' }}>
        Stay updated and connect with us through our social media channels and messaging platforms.
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
        <IconButton
          href="https://facebook.com/yourpage"
          target="_blank"
          aria-label="Facebook"
          sx={{ color: '#3b5998' }}
        >
          <Facebook />
        </IconButton>
        <IconButton
          href="https://twitter.com/yourprofile"
          target="_blank"
          aria-label="Twitter"
          sx={{ color: '#1da1f2' }}
        >
          <Twitter />
        </IconButton>
        <IconButton
          href="https://instagram.com/yourprofile"
          target="_blank"
          aria-label="Instagram"
          sx={{ color: '#c13584' }}
        >
          <Instagram />
        </IconButton>
        <IconButton
          href="https://wa.me/yourphonenumber"
          target="_blank"
          aria-label="WhatsApp"
          sx={{ color: '#25d366' }}
        >
          <WhatsApp />
        </IconButton>
        <IconButton
          href="https://t.me/yourprofile"
          target="_blank"
          aria-label="Telegram"
          sx={{ color: '#0088cc' }}
        >
          <Telegram />
        </IconButton>
      </Box>

      <Typography variant="body2">
        For more detailed support, feel free to reach out to our support team via the platforms above.
      </Typography>
    </Box>
  );
};

export default ContactSocial;
