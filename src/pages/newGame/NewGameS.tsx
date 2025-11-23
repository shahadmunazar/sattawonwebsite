// import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';

// Function to generate a random color for the gradient
const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};
const NewGameS: React.FC = () => {
  const navigate = useNavigate();
  // const [ setGameInfo] = useState<{ label: string, description: string, terms: string } | null>(null);

  // Define the game ranges (00-09, 10-19, etc.)
  const gameRanges = Array.from({ length: 10 }, (_, index) => ({
    start: index * 10,
    end: (index + 1) * 10 - 1,
    label: `00 to ${String((index + 1) * 10 - 1).padStart(2, '0')}`,
    description: `How to play the game from ${String(index * 10).padStart(2, '0')} to ${String((index + 1) * 10 - 1).padStart(2, '0')}`,
    terms: `Terms and conditions for the game from ${String(index * 10).padStart(2, '0')} to ${String((index + 1) * 10 - 1).padStart(2, '0')}.`,
  }));

  // Function to navigate to the selected game range component
  const navigateToGameGroup = (start: number, end: number) => {
    const group = `${String(start).padStart(2, '0')}-${String(end).padStart(2, '0')}`;
    navigate(`/game/${group}`); // Navigate to the dynamic route
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f5f5f5' }}>
      <Typography variant="h3" color="primary" gutterBottom>
        Welcome to Chakri Games
      </Typography>
      <Typography variant="h6" color="textSecondary" paragraph>
        Explore exciting Chakri game ranges! Choose a game range below.
      </Typography>

      {/* Game group buttons */}
      <Grid container spacing={3} justifyContent="center">
        {gameRanges.map((range) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={range.label}>
            <Button
              variant="contained"
              style={{
                background: `linear-gradient(45deg, ${generateRandomColor()}, ${generateRandomColor()})`,
                color: '#fff',
                fontSize: '14px',
                fontWeight: 'bold',
                textTransform: 'none',
                borderRadius: '30px',
                padding: '8px 20px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                width: '100%',
              }}
              onClick={() => navigateToGameGroup(range.start, range.end)} // Redirect to the correct route
            >
              {range.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default NewGameS;
