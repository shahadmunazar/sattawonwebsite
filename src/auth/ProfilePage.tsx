import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from "@mui/material";
import axios from "axios";
import { styled } from "@mui/system";

// Define User interface
interface User {
  id: number;
  name: string;
  email: string;
  mobile: string | null;
  referral_code: string | null;
  earnings: string;
  balance: string;
  role: string;
}

// Custom Save Button with hover animation
const SaveButton = styled(Button)(() => ({
  backgroundColor: "#1976d2",
  color: "#fff",
  fontWeight: "bold",
  marginTop: "16px",
  width: "100%",
  "&:hover": {
    backgroundColor: "#115293",
  },
  transition: "background-color 0.3s ease-in-out",
}));

// Container for form with animation
const FormContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "16px",
  transition: "opacity 0.5s ease-in-out",
  opacity: 1,
}));

const ButtonContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-end", // Align button to the right
  marginTop: "25px",
}));

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [bankModalOpen, setBankModalOpen] = useState(false);
  const [upiModalOpen, setUpiModalOpen] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    user_name: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
  });
  const [upiId, setUpiId] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (user) {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://apisattaking.sattakingmaker.com/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    if (user) {
      setSaving(true);
      try {
        await axios.put(
          "https://apisattaking.sattakingmaker.com/api/user/profile/update",
          {
            name: user.name,
            email: user.email,
            mobile: user.mobile,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSnackbarMessage("Profile updated successfully!");
      } catch (error) {
        console.error("Error saving user data:", error);
        setSnackbarMessage("Failed to save profile. Please try again.");
      } finally {
        setSaving(false);
        setSnackbarOpen(true);
      }
    }
  };

  const handleReferralCodeCopy = () => {
    if (user?.referral_code) {
      navigator.clipboard.writeText(user.referral_code)
        .then(() => {
          setSnackbarMessage("Referral Code Copied!");
          setSnackbarOpen(true);
        })
        .catch(err => console.error("Failed to copy referral code: ", err));
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleBankModalOpen = () => {
    setBankModalOpen(true);
  };

  const handleBankModalClose = () => {
    setBankModalOpen(false);
  };

  const handleUpiModalOpen = () => {
    setUpiModalOpen(true);
  };

  const handleUpiModalClose = () => {
    setUpiModalOpen(false);
    setImageFile(null); // Reset image file when closing modal
  };

  const handleBankDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleBankDetailsSubmit = async () => {
    if (bankDetails.accountNumber === bankDetails.confirmAccountNumber) {
      try {
        await axios.post(
          "https://apisattaking.sattakingmaker.com/api/user/add-bank-details",
          {
            user_name: bankDetails.user_name,
            bank_name: bankDetails.bankName,
            account_number: bankDetails.accountNumber,
            confirm_account_number: bankDetails.confirmAccountNumber,
            ifsc_code: bankDetails.ifscCode,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSnackbarMessage("Bank details added successfully!");
      } catch (error) {
        console.error("Error adding bank details:", error);
        setSnackbarMessage("Failed to add bank details. Please try again.");
      } finally {
        setBankModalOpen(false);
        setSnackbarOpen(true);
      }
    } else {
      setSnackbarMessage("Account numbers do not match.");
      setSnackbarOpen(true);
    }
  };

  const handleUpiSubmit = async () => {
    if (upiId && imageFile) {
      const formData = new FormData();
      formData.append("upi_id", upiId);
      formData.append("qr_code", imageFile);

      try {
        await axios.post("https://apisattaking.sattakingmaker.com/api/user/add-bank-details", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUpiModalOpen(false);
        setSnackbarMessage("UPI ID added successfully!");
      } catch (error) {
        console.error("Error uploading UPI ID:", error);
      }
    } else {
      setSnackbarMessage("Please provide UPI ID and QR code image.");
      setSnackbarOpen(true);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4">Loading...</Typography>
        </Box>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" color="error">
            Failed to load profile data.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Profile Details
        </Typography>

        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            textAlign: 'center', 
            fontWeight: 'bold', 
            marginTop: '20px', 
            color: '#1976d2'
          }}
        >
          Available Balance: {user.balance}
        </Typography>

        <ButtonContainer>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleBankModalOpen}
          >
            Add Bank Details
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleUpiModalOpen}
            sx={{ ml: 2 }}
          >
            Add UPI ID
          </Button>
        </ButtonContainer>

        <Paper sx={{ padding: 3 }}>
          <FormContainer>
            <Typography variant="h6" gutterBottom>
              User Information
            </Typography>

            <TextField
              fullWidth
              label="Name"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              sx={{ transition: "0.3s" }}
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              sx={{ transition: "0.3s" }}
            />

            <TextField
              fullWidth
              label="Mobile"
              name="mobile"
              value={user.mobile || ""}
              onChange={handleInputChange}
              sx={{ transition: "0.3s" }}
            />

            <Box sx={{ display: "flex", alignItems: "center", mt: 0 }}>
              <TextField
                fullWidth
                label="Referral Code"
                name="referral_code"
                value={user.referral_code || ""}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ transition: "0.3s" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleReferralCodeCopy}
                sx={{ ml: 2 }}
              >
                Copy Referral Code
              </Button>
            </Box>

            <ButtonContainer>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <SaveButton
                    variant="contained"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Savess"}
                  </SaveButton>
                </Grid>
              </Grid>
            </ButtonContainer>
          </FormContainer>
        </Paper>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
        />

        <Dialog open={bankModalOpen} onClose={handleBankModalClose}>
          <DialogTitle>Add Bank Details</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Full Name"
              type="text"
              fullWidth
              name="user_name"
              value={bankDetails.user_name}
              onChange={handleBankDetailsChange}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Bank Name"
              type="text"
              fullWidth
              name="bankName"
              value={bankDetails.bankName}
              onChange={handleBankDetailsChange}
            />
            <TextField
              margin="dense"
              label="Account Number"
              type="number"
              fullWidth
              name="accountNumber"
              value={bankDetails.accountNumber}
              onChange={handleBankDetailsChange}
            />
            <TextField
              margin="dense"
              label="Confirm Account Number"
              type="number"
              fullWidth
              name="confirmAccountNumber"
              value={bankDetails.confirmAccountNumber}
              onChange={handleBankDetailsChange}
            />
            <TextField
              margin="dense"
              label="IFSC Code"
              type="text"
              fullWidth
              name="ifscCode"
              value={bankDetails.ifscCode}
              onChange={handleBankDetailsChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleBankModalClose}>Cancel</Button>
            <Button onClick={handleBankDetailsSubmit}>Add</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={upiModalOpen} onClose={handleUpiModalClose}>
          <DialogTitle>Add UPI ID</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="UPI ID"
              type="text"
              fullWidth
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
            <Button
              variant="contained"
              component="label"
              sx={{
                marginTop: '20px', // Add margin if needed
                backgroundColor: '#1976d2', // Change to your desired color
                '&:hover': {
                  backgroundColor: '#155a8a', // Change to your desired hover color
                },
              }}
            >
              Upload Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  if (e.target.files) {
                    setImageFile(e.target.files[0]);
                  }
                }}
              />
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUpiModalClose}>Cancel</Button>
            <Button onClick={handleUpiSubmit}>Add</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default ProfilePage;
