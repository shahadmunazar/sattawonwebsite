import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Container, Paper, Box, Modal, Snackbar, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface SubCategoryPage4Props {
  category: string;
  subCategory: string;
  categoryId: number;
  subCategoryId: number;
}

const SubCategoryPage4: React.FC<SubCategoryPage4Props> = ({
  subCategory,
  categoryId,
  subCategoryId,
}) => {
  const [amounts, setAmounts] = useState<string[]>(Array(100).fill(''));
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Fetch wallet balance
  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const response = await axios.get('https://apisattaking.sattakingmaker.com/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWalletBalance(response.data.data.balance);
      } catch (error) {
        setSnackbarSeverity('error');
        setSnackbarMessage('Failed to fetch wallet balance. Please log in again.');
        setSnackbarOpen(true);
        setOpenModal(true);
      }
    };

    fetchWalletBalance();
  }, [token]);

  const handleBackToAllGames = () => {
    navigate("/playgame");
  };

  // Handle amount change
  const handleAmountChange = (index: number, value: string) => {
    const newAmounts = [...amounts];
    newAmounts[index] = value;
    setAmounts(newAmounts);
  };

  // Submit numbers and amounts
  const handleSubmit = async () => {
    const enteredData = amounts
      .map((amount, index) => ( {
        number: index,
        amount: parseInt(amount),
      }))
      .filter((item) => item.amount > 0);

    const payload = {
      entered_data: enteredData,
      category_id: categoryId,
      subcategory_id: subCategoryId,
      subcategory_name: subCategory,
    };

    try {
      // @ts-ignore
      const response = await axios.post(
        'https://apisattaking.sattakingmaker.com/api/user/submit-double-game',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSnackbarSeverity('success');
      setSnackbarMessage('Your bet is set successfully.');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Failed to submit data.');
      setSnackbarOpen(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    navigate('/login');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container
      component={Paper}
      elevation={3}
      sx={{
        padding: 4,
        maxWidth: 'md',
        marginTop: 4,
        backgroundColor: '#F0F8FF',
        borderRadius: '8px',
        [theme.breakpoints.down('sm')]: {
          padding: 2,
        },
      }}
    >
      {/* Modal for error message */}
      <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2" align="center">
            Error
          </Typography>
          <Alert severity="error" sx={{ mt: 2 }}>
            {snackbarMessage}
          </Alert>
          <Box mt={2} display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleCloseModal}>
              Go to Login
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Display wallet balance if token is valid */}
      {walletBalance !== null && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" align="center" sx={{ color: theme.palette.primary.main }}>
            Wallet Balance: ₹{walletBalance}
          </Typography>
        </Box>
      )}

      {/* Display inputs if token is valid */}
      {walletBalance !== null && (
        <>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: theme.palette.primary.main,
              backgroundColor: '#283593',
              padding: '10px',
              borderRadius: '8px',
            }}
          >
            Jantri Play Game
          </Typography>

          {/* Grid for input fields */}
          <Grid container spacing={2}>
            {Array.from({ length: 10 }, (_, rowIndex) => (
              <Grid item xs={12} key={rowIndex}>
                <Grid container spacing={2}>
                  {Array.from({ length: 10 }, (_, colIndex) => {
                    const index = rowIndex * 10 + colIndex;
                    return (
                      <Grid
                        item
                        xs={isSmallScreen ? 2.4 : 1.2}
                        key={index}
                      >
                        <TextField
                          label={`${index < 10 ? `0${index}` : index}`}
                          variant="outlined"
                          fullWidth
                          type="number"
                          inputProps={{ min: '0', max: '99', step: '1' }}
                          value={amounts[index]}
                          onChange={(e) => handleAmountChange(index, e.target.value)}
                          sx={{
                            '& .MuiInputLabel-root': {
                              color: '#3949ab',
                            },
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: '#3949ab',
                              },
                              '&:hover fieldset': {
                                borderColor: '#1e88e5',
                              },
                            },
                          }}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            ))}
          </Grid>

          {/* Button to submit or process amounts */}
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              sx={{
                marginTop: 2,
                width: "100%",
                backgroundColor: "#61dafb",
                color: "#282c34",
                "&:hover": {
                  backgroundColor: "#21a1f1",
                },
              }}
            >
              Submit Amounts
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBackToAllGames}
              sx={{
                mt: 2,
                width: "100%",
                borderRadius: 2,
                background: "linear-gradient(45deg, #FF7043 30%, #FFCCBC 90%)",
                ":hover": {
                  background: "linear-gradient(45deg, #FF7043 40%, #FF5722 90%)",
                },
              }}
            >
              Back to All Games
            </Button>
          </Box>
        </>
      )}

      {/* Snackbar for alerts */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SubCategoryPage4;
