import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import axios from 'axios'; // For API calls
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal({ onSubmit, amount }: { onSubmit: (amount: string, transactionId: string, image: File | null) => void; amount: string }) {
  const [open, setOpen] = React.useState(false);
  const [transactionId, setTransactionId] = React.useState<string>('');
  const [image, setImage] = React.useState<File | null>(null); // State for the uploaded image

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddMoney = () => {
    if (transactionId) {
      onSubmit(amount, transactionId, image); // Pass the image along with amount and transaction ID
      handleClose(); // Close the modal after submission
    }
  };

  // Handle image file change
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]); // Set the uploaded file
    }
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Verify Payment Detail and Add Money</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300 }}>
          <h2 id="child-modal-title">Add Money</h2>
          {/* Non-editable Amount Field */}
          <TextField
            label="Amount"
            variant="outlined"
            fullWidth
            margin="normal"
            value={amount}
            InputProps={{
              readOnly: true, // Make it non-editable
            }}
          />
          <TextField
            label="Transaction ID"
            variant="outlined"
            fullWidth
            margin="normal"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
          />
          <input
            type="file"
            accept="image/*" // Accept image files
            onChange={handleImageChange} // Handle file change
            style={{ marginTop: 16 }} // Add some margin for spacing
          />
          <Button onClick={handleAddMoney} variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
          <Button onClick={handleClose} variant="outlined" color="secondary" sx={{ mt: 2, ml: 1 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal() {
  const [open, setOpen] = React.useState(false);
  const [qrCodeUrl, setQrCodeUrl] = React.useState<string | null>(null);
  const [upiId, setUpiId] = React.useState<string | null>(null); // UPI ID from API
  const [amount, setAmount] = React.useState<string>(''); // State to hold fetched amount
  const token = localStorage.getItem("token") || "";

  const handleOpen = async () => {
    try {
      const response = await axios.get(
        'https://apisattaking.sattakingmaker.com/api/user/payment-qr-code',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQrCodeUrl(response.data.data.qr_code_url); // Set QR code URL
      setUpiId(response.data.data.upi_id); // Set UPI ID
      setAmount(response.data.data.amount); // Set fetched amount
    } catch (error) {
      console.error('Error fetching QR code and UPI ID:', error);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Function to copy UPI ID to clipboard
  const handleCopyUpiId = () => {
    if (upiId) {
      navigator.clipboard.writeText(upiId).then(() => {
        alert("UPI ID copied to clipboard!");
      }).catch(err => {
        console.error("Failed to copy UPI ID: ", err);
      });
    }
  };

  // Function to handle form submission from ChildModal
  const handleAddMoney = async (amount: string, transactionId: string, image: File | null) => {
    console.log('Adding Money:', { amount, transactionId, image });
    // Here you can implement the logic to send the amount, transaction ID, and image to your API
    const formData = new FormData();
    formData.append('amount', amount);
    formData.append('transaction_id', transactionId);
    if (image) {
      formData.append('image', image); // Append the image file to form data
    }

    try {
      const response = await axios.post(
        'YOUR_API_ENDPOINT_HERE', // Replace with your API endpoint
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Money added successfully:', response.data);
    } catch (error) {
      console.error('Error adding money:', error);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Add Money</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">UPI Payment QR Code</h2>

          {/* Display the UPI ID fetched from the API */}
          {upiId ? (
            <>
              <Typography>UPI ID: {upiId}</Typography>
              <Button variant="contained" onClick={handleCopyUpiId} sx={{ mt: 1 }}>
                Copy UPI ID
              </Button>
            </>
          ) : (
            <Typography>Loading UPI ID...</Typography>
          )}

          {/* Display the QR Code fetched from the API */}
          {qrCodeUrl ? (
            <Box
              component="img"
              src={qrCodeUrl}
              alt="Payment QR Code"
              sx={{ width: '100%', height: 'auto', marginTop: 2 }}
            />
          ) : (
            <Typography>Loading QR Code...</Typography>
          )}
          
          <ChildModal onSubmit={handleAddMoney} amount={amount} /> {/* Pass fetched amount */}
        </Box>
      </Modal>
    </div>
  );
}
