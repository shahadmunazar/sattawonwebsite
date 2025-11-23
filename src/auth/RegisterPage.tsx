import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  InputLabel,
  Input,
  FormControl,
  FormHelperText,
  Alert,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import Logo from "../../public/DALL·E 2024-09-14 15.05.51 - A fantasy game logo with intricate medieval-style typography, featuring a dragon coiled around the text. The letters are glowing with a mystical aura,.webp";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [referralCode, setReferralCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
// @ts-ignore
const response = await axios.post("https://apisattaking.sattakingmaker.com/api/signup", {
        name,
        mobile,
        referral_code: referralCode,
        password,
        password_confirmation: confirmPassword,
      });

      setSnackbarMessage("Registration successful! You will be redirected to the login page shortly.");
      setSnackbarOpen(true);
      setError(null);

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      const err = error as AxiosError;
      if (err.response && err.response.data) {
        const errorMessages = Object.values((err.response.data as any).errors).flat().join(", ");
        
        if (errorMessages.includes("The mobile number has already been taken.")) {
          setSnackbarMessage("Mobile number already in use. Redirecting to login.");
          setSnackbarOpen(true);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setSnackbarMessage(errorMessages);
          setSnackbarOpen(true);
        }
      } else {
        setSnackbarMessage("An error occurred during registration.");
        setSnackbarOpen(true);
      }
      setError(null);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container component="main" maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#f9f9f9",
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          style={{
            width: "150px",
            borderRadius: "50%",
            marginBottom: "20px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        />
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Register
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box
          component="form"
          onSubmit={handleRegister}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <FormControl fullWidth variant="outlined" sx={{ borderRadius: 1 }}>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-describedby="name-helper-text"
            />
            <FormHelperText id="name-helper-text">Enter your full name</FormHelperText>
          </FormControl>

          <FormControl fullWidth variant="outlined" sx={{ borderRadius: 1 }}>
            <InputLabel htmlFor="mobile">Mobile Number</InputLabel>
            <Input
              id="mobile"
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              aria-describedby="mobile-helper-text"
            />
            <FormHelperText id="mobile-helper-text">Enter your mobile number</FormHelperText>
          </FormControl>

          <FormControl fullWidth variant="outlined" sx={{ borderRadius: 1 }}>
            <InputLabel htmlFor="referral-code">Referral Code (optional)</InputLabel>
            <Input
              id="referral-code"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              aria-describedby="referral-code-helper-text"
            />
            <FormHelperText id="referral-code-helper-text">Enter a referral code if you have one</FormHelperText>
          </FormControl>

          <FormControl fullWidth variant="outlined" sx={{ borderRadius: 1 }}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-describedby="password-helper-text"
            />
            <FormHelperText id="password-helper-text">Enter your password</FormHelperText>
          </FormControl>

          <FormControl fullWidth variant="outlined" sx={{ borderRadius: 1 }}>
            <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              aria-describedby="confirm-password-helper-text"
            />
            <FormHelperText id="confirm-password-helper-text">Confirm your password</FormHelperText>
          </FormControl>

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, borderRadius: 1 }}>
            Register
          </Button>
          <Button variant="text" fullWidth sx={{ mt: 2 }} onClick={() => navigate("/login")}>
            Already have an account? Login
          </Button>
        </Box>

        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <SnackbarContent
            message={snackbarMessage}
            sx={{ backgroundColor: '#46b34a' }}
          />
        </Snackbar>
      </Box>
    </Container>
  );
};

export default RegisterPage;
