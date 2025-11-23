import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  balance: string;
}

interface UserData {
  data: UserProfile;
}

interface SubCategoryPage3Props {
  category: string;
  subCategory: string;
  categoryId: number;
  subCategoryId: number;
}

const generatePairs = (num1: string, num2: string) => {
  const pairs: string[] = [];
  if (num1 && num2) {
    for (let i = 0; i < num1.length; i++) {
      for (let j = 0; j < num2.length; j++) {
        pairs.push(`${num1[i]}${num2[j]}`);
      }
    }
  }
  return pairs;
};

const SubCategoryPage3: React.FC<SubCategoryPage3Props> = ({
  subCategory,
  categoryId,
  subCategoryId,
}) => {
  const [number1, setNumber1] = useState<string>('');
  const [number2, setNumber2] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [pairs, setPairs] = useState<string[]>([]);
  const [pairAmounts, setPairAmounts] = useState<{ [key: string]: number }>({});
  const [amountConfirmed, setAmountConfirmed] = useState<boolean>(false);
  const [walletBalance, setWalletBalance] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const theme = useTheme();
  const navigate = useNavigate();

  const fetchWalletBalance = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setDialogOpen(true);
        return;
      }

      const response = await axios.get<UserData>('https://apisattaking.sattakingmaker.com/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data) {
        setWalletBalance(response.data.data.balance);
      }
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
    }
  };

  useEffect(() => {
    fetchWalletBalance();
  }, []);

  const handleNumberChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    setTotalAmount(null);
  };

  const generateAndSetPairs = () => {
    if (number1 && number2) {
      const generatedPairs = generatePairs(number1, number2);
      setPairs(generatedPairs);

      const initialAmounts: { [key: string]: number } = {};
      generatedPairs.forEach(pair => {
        initialAmounts[pair] = amount; // Amount is fixed
      });
      setPairAmounts(initialAmounts);
      calculateTotalAmount(initialAmounts);
    }
  };

  const confirmAmountAndGeneratePairs = () => {
    if (amount > 0) {
      setAmountConfirmed(true);
      generateAndSetPairs();
    }
  };

  const calculateTotalAmount = (amounts: { [key: string]: number }) => {
    const total = Object.values(amounts).reduce((acc, curr) => acc + curr, 0);
    setTotalAmount(total);
  };

  const removePair = (pairToRemove: string) => {
    setPairs(pairs.filter(pair => pair !== pairToRemove));
    setPairAmounts(prevPairAmounts => {
      const newPairAmounts = { ...prevPairAmounts };
      delete newPairAmounts[pairToRemove];
      calculateTotalAmount(newPairAmounts);
      return newPairAmounts;
    });
  };

  const handleBackToAllGames = () => {
    navigate("/playgame");
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    navigate('/games');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const submitGeneratedPairs = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setDialogOpen(true);
      return;
    }

    const enteredData = pairs.map(pair => ({
      number: parseInt(pair),
      amount: pairAmounts[pair] || 0,
    })).filter(data => data.amount > 0); // Filter out pairs with zero amount

    const payload = {
      entered_data: enteredData,
      category_id: categoryId,
      subcategory_id: subCategoryId,
      subcategory_name: subCategory,
    };
    console.log(payload);

    try {
      await axios.post('https://apisattaking.sattakingmaker.com/api/user/submit-double-game', payload, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      setSnackbarMessage("Pairs submitted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error submitting pairs:', error);
      setSnackbarMessage("Error submitting pairs. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Container
      component={Paper}
      elevation={3}
      sx={{
        padding: 4,
        maxWidth: 'md',
        marginTop: 4,
        backgroundColor: '#E6F0FA',
        color: '#000',
        [theme.breakpoints.down('sm')]: {
          padding: 2,
        },
      }}
    >
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
        Crossing Number Pairing
      </Typography>

      <Box mb={2} textAlign="center">
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
          Wallet Balance: ₹{walletBalance}
        </Typography>
      </Box>

      <TextField
        label="Enter first number"
        variant="outlined"
        fullWidth
        type="number"
        value={number1}
        onChange={handleNumberChange(setNumber1)}
        margin="normal"
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} // This ensures number-only inputs
      />

      <TextField
        label="Enter second number"
        variant="outlined"
        fullWidth
        type="number"
        value={number2}
        onChange={handleNumberChange(setNumber2)}
        margin="normal"
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} // This ensures number-only inputs
      />
      <TextField
        label="Enter Amount"
        variant="outlined"
        fullWidth
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        margin="normal"
      />

      <Button
        onClick={confirmAmountAndGeneratePairs}
        variant="contained"
        color="secondary"
        sx={{ width: "100%", borderRadius: 2, background: "linear-gradient(45deg, #00C853 30%, #B2FF59 70%)" }}
      >
        Confirm Amount and Generate Pairs
      </Button>

      {amountConfirmed && (
        <Box mt={2}>
          <Typography variant="h6" align="center">Generated Pairs</Typography>
          {pairs.map(pair => (
            <Box key={pair} display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="body1">{pair}</Typography>
              <Typography variant="body1">₹{pairAmounts[pair]}</Typography>
              <Button onClick={() => removePair(pair)} variant="contained" color="error" size="small">
                Remove
              </Button>
            </Box>
          ))}
          {totalAmount !== null && (
            <Typography variant="h6" align="center">Total Amount: ₹{totalAmount}</Typography>
          )}
          <Button variant="contained" color="primary" onClick={submitGeneratedPairs} sx={{ mt: 2 }}>
            Submit Pairs
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
                background: "linear-gradient(45deg, #FF3D00 30%, #FFAB91 70%)",
              },
            }}
          >
            Back to All Games
          </Button>
        </Box>
      )}

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Unauthorized</DialogTitle>
        <DialogContent>
          <Typography>You need to be logged in to access this feature.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
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

export default SubCategoryPage3;
