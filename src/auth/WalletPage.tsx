import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Paper,
  Grid,
  Modal,
  Alert,
  Tabs,
  Tab,
} from '@mui/material';
import axios, { AxiosError } from 'axios';

interface BankDetails {
  id: number;
  bank_name: string;
  account_number: string;
  ifsc_code: string;
  upi_id: string;
}

const WalletPage: React.FC = () => {
  const [amountToAdd, setAmountToAdd] = useState<number | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [withdrawalAmount, setWithdrawalAmount] = useState<number | null>(null);
  const [showQRCode, setShowQRCode] = useState<boolean>(false);
  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [upiId, setUpiId] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [notification, setNotification] = useState<{ message: string; severity: 'success' | 'error' } | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const token = localStorage.getItem('token') || '';
  const [selectedBankId, setSelectedBankId] = useState<number | null>(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "https://apisattaking.sattakingmaker.com/api/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBalance(response.data.data.balance || 0);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleAddMoney = async () => {
    if (amountToAdd !== null && amountToAdd > 0) {
      setShowQRCode(true);
      await fetchQRCode();
    } else {
      setNotification({ message: 'Please enter a valid amount to add.', severity: 'error' });
    }
  };

  const fetchQRCode = async () => {
    try {
      const response = await axios.get('https://apisattaking.sattakingmaker.com/api/user/payment-qr-code', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQrCodeUrl(response.data.data.qr_code_url);
      setUpiId(response.data.data.upi_id);
    } catch (error) {
      console.error('Error fetching QR code and UPI ID:', error);
      setNotification({ message: 'Failed to fetch QR code.', severity: 'error' });
    }
  };

  const handleVerifyPayment = () => {
    setOpenConfirmModal(true);
  };

  const checkBankDetails = async () => {
    try {
      const response = await axios.get('https://apisattaking.sattakingmaker.com/api/user/check-bank-details', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data && response.data.message === 'Bank details found.') {
        setBankDetails(response.data.data as BankDetails);
      }
    } catch (error) {
      console.error('Error checking bank details:', error);
    }
  };

  const handleAmountChange = (value: number | null) => {
    setWithdrawalAmount(value);
    if (value) {
      checkBankDetails();
    }
  };

  const handleConfirmAddMoney = async () => {
    if (amountToAdd !== null) {
      const formData = new FormData();
      formData.append('amount', amountToAdd.toString());
      formData.append('transactio_id', transactionId);
      if (uploadedImage) {
        formData.append('image', uploadedImage);
      }

      try {
        const response = await axios.post('https://apisattaking.sattakingmaker.com/api/user/add-money-to-wallet', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });

        setBalance((prevBalance) => prevBalance + (amountToAdd || 0));
        setNotification({ message: response.data.message || 'Amount added successfully!', severity: 'success' });
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage = error.response.data.errors.message[0];
          setNotification({ message: errorMessage, severity: 'error' });
        } else {
          console.error('Error adding money:', error);
        }
      } finally {
        setAmountToAdd(null);
        setTransactionId('');
        setUploadedImage(null);
        setOpenConfirmModal(false);
        setShowQRCode(false);
      }
    }
  };

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
    setShowQRCode(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setUploadedImage(event.target.files[0]);
    }
  };

  const handleSelectAccount = () => {
    if (bankDetails) {
      setSelectedBankId(bankDetails.id);
      console.log(bankDetails.id);
    }
  };


  const handleSaveQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = 'qrcode.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      setNotification({ message: 'QR Code URL is not available.', severity: 'error' });
    }
  };

  const copyToClipboard = () => {
    if (upiId) {
      navigator.clipboard.writeText(upiId)
        .then(() => {
          console.log('UPI ID copied to clipboard');
        })
        .catch((error) => {
          console.error('Failed to copy UPI ID:', error);
          setNotification({ message: 'Failed to copy UPI ID.', severity: 'error' });
        });
    }
  };

  const handleTabChange = (newValue: number) => {
    setActiveTab(newValue);
  };

  const handleWithdrawal = async () => {
    if (!token) {
      setNotification({ message: 'User is not authenticated. Please log in again.', severity: 'error' });
      return;
    }

    if (withdrawalAmount && withdrawalAmount > 0) {
      if (withdrawalAmount < 5000) {
        if (selectedBankId) {
          try {
            const response = await axios.post('https://apisattaking.sattakingmaker.com/api/user/withdrawal-money-request', {
              request_money: withdrawalAmount,
              bank_id: selectedBankId,
            }, {
              headers: { Authorization: `Bearer ${token}` },
            });

            setBalance((prevBalance) => prevBalance - (withdrawalAmount || 0));
            setNotification({ message: response.data.message || 'Withdrawal successful!', severity: 'success' });
          } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.status === 403) {
              setNotification({ message: 'Please wait, you already have a pending withdrawal request.', severity: 'error' });
            } else {
              console.error('Error during withdrawal:', error);
              setNotification({ message: 'Withdrawal failed. Please try again.', severity: 'error' });
            }
          }
        } else {
          setNotification({ message: 'No bank account selected. Please select a bank account first.', severity: 'error' });
        }
      } else {
        setNotification({ message: 'Withdrawal amount must be less than ₹5000 for UPI transfer.', severity: 'error' });
      }
    } else {
      setNotification({ message: 'Please enter a valid withdrawal amount.', severity: 'error' });
    }
  };

  return (
    <Container component={Paper} elevation={3} sx={{ padding: 4, maxWidth: 'md', marginTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Wallet Management
      </Typography>

      <Typography variant="h6" align="center" gutterBottom>
        Current Balance: ₹{balance}
      </Typography>

      {/* Notification Alert */}
      {notification && (
        <Box display="flex" justifyContent="center" alignItems="center" mb={2} sx={{ maxWidth: '100%' }}>
          <Alert severity={notification.severity} onClose={() => setNotification(null)} sx={{ width: '100%' }}>
            {notification.message}
          </Alert>
        </Box>
      )}

      {/* Tabs for Add Money and Withdraw Money */}
      <Tabs value={activeTab} onChange={(_, newValue) => handleTabChange(newValue)} centered>
        <Tab label="Add Money" />
        <Tab label="Withdraw Money" />
      </Tabs>

      {activeTab === 0 && (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Box p={3} sx={{ border: '1px solid #ccc', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Add Money
              </Typography>
              <TextField
                label="Amount"
                variant="outlined"
                fullWidth
                type="number"
                value={amountToAdd || ''}
                onChange={(e) => setAmountToAdd(Number(e.target.value) || null)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleAddMoney}
                sx={{ padding: '10px', borderRadius: '8px' }}
              >
                Add Money
              </Button>

              {showQRCode && qrCodeUrl && (
    <Box mt={3} textAlign="center">
        <Typography variant="h6">Scan this QR Code to complete your payment:</Typography>
        <img src={qrCodeUrl} alt="QR Code" style={{ width: '200px', height: '200px' }} />
        <Typography variant="h6">UPI ID: {upiId}</Typography>

      

        <Button 
            variant='contained' 
            color='primary' 
            onClick={handleSaveQRCode} 
            sx={{ mt: 2 }}
        >
            Save QR Code
        </Button>

        <Button 
            variant="contained" 
            color="primary" 
            onClick={copyToClipboard} 
            sx={{ mt: 2 }}
        >
            Copy UPI ID
        </Button>

        <Button 
            variant="contained" 
            color="primary" 
            onClick={handleVerifyPayment} 
            sx={{ mt: 2 }}
        >
            Verify Payment
        </Button>
    </Box>
)}

            </Box>
          </Grid>
        </Grid>
      )}

      {activeTab === 1 && (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Box p={3} sx={{ border: '1px solid #ccc', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Withdraw Money
              </Typography>
              <TextField
                label="Amount"
                variant="outlined"
                fullWidth
                type="number"
                value={withdrawalAmount || ''}
                onChange={(e) => handleAmountChange(Number(e.target.value) || null)}
                sx={{ mb: 2 }}
              />
              {withdrawalAmount && withdrawalAmount < 1 && (
                <TextField
                  label="UPI ID"
                  variant="outlined"
                  fullWidth
                  value={upiId || ''}
                  onChange={(e) => setUpiId(e.target.value)}
                  disabled={bankDetails?.upi_id ? true : false}
                  sx={{ mb: 2 }}
                />
              )}
              {bankDetails && (
                <Box mt={2}>
                  <Typography variant="body1">Bank Name: {bankDetails.bank_name}</Typography>
                  <Typography variant="body1">Account Number: {bankDetails.account_number}</Typography>
                  <Typography variant="body1">IFSC Code: {bankDetails.ifsc_code}</Typography>
                  <Typography variant="body1">UPI ID: {bankDetails.upi_id}</Typography>
                </Box>
              )}
              <Button variant="contained" color="primary" onClick={handleSelectAccount} sx={{ mb: 2 }}>
                Select Account
              </Button>
              <Button variant="contained" color="primary" fullWidth onClick={handleWithdrawal} sx={{ padding: '10px', borderRadius: '8px' }}>
                Withdraw
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}

      {/* Confirmation Modal */}
      <Modal open={openConfirmModal} onClose={handleCloseConfirmModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Confirm Payment
          </Typography>
          <TextField
            label="Transaction ID"
            variant="outlined"
            fullWidth
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            sx={{ mb: 2 }}
          />
          <input type="file" onChange={handleImageUpload} />
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirmAddMoney}
            sx={{ marginTop: 2 }}
          >
            Confirm
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default WalletPage;
