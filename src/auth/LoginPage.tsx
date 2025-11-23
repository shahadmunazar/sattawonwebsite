import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Avatar,
  Snackbar,
  Alert,
} from "@mui/material";
import Logo from "../../public/DALL·E 2024-09-14 15.05.51 - A fantasy game logo with intricate medieval-style typography, featuring a dragon coiled around the text. The letters are glowing with a mystical aura,.webp"; // Replace this with your actual logo path

const Page: React.FC = () => {
  const [mobile, setmobile] = useState<string>(""); // Use mobile instead of email
  const [password, setPassword] = useState<string>("");
  const [mobileError, setMobileError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false); // Snackbar state
  const [alertMessage, setAlertMessage] = useState<string>(""); // Alert message from API
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success"); // Alert severity

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setGeneralError(null); // Clear any previous general errors
    setMobileError(null); // Clear previous mobile errors

    try {
      // Send login request to the API
      const response = await axios.post("https://apisattaking.sattakingmaker.com/api/login", {
        mobile,
        password,
      });

      const { token, user } = response.data;

      if (user.role !== "user") {
        setAlertMessage("You are not authorized to log in with this role.");
        setAlertSeverity("error");
        setOpenSnackbar(true);
        return;
      }

      localStorage.setItem("token", token);
      setAlertMessage("Login successful");
      setAlertSeverity("success");
      setOpenSnackbar(true);

      navigate("/");

    } catch (error: any) {
      if (error.response && error.response.data) {
        const apiResponse = error.response.data;

        if (apiResponse.errors && apiResponse.errors.mobile) {
          setMobileError(apiResponse.errors.mobile[0]); // Set specific mobile validation error
        }

        if (apiResponse.message) {
          setAlertMessage(apiResponse.message); // Set the general error message
          setAlertSeverity("error");
          setOpenSnackbar(true); // Show Snackbar with the error message
        }
      } else {
        setGeneralError("An error occurred. Please try again.");
        setAlertMessage("An error occurred. Please try again.");
        setAlertSeverity("error");
        setOpenSnackbar(true); // Open Snackbar for other general errors
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Close the Snackbar
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 8 }}>
        {/* Logo */}
        <Avatar alt="Company Logo" src={Logo} sx={{ width: 100, height: 100, mb: 2 }} />

        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Mobile Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={mobile}
            onChange={(e) => setmobile(e.target.value)}
            required
            error={!!mobileError} // Apply error styling if there's a mobile error
            helperText={mobileError} // Show the mobile validation error message
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, borderRadius: 1 }}
            >
              Sign In
            </Button>
            {generalError && (
              <Typography color="error" variant="body2" mt={2}>
                {generalError}
              </Typography>
            )}
            <Button
              onClick={() => navigate("/register")}
              sx={{ mt: 2 }}
              variant="text"
              color="primary"
            >
              Don't have an account? Register
            </Button>
          </Box>
        </form>

        {/* Snackbar for API response messages */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert onClose={handleCloseSnackbar} severity={alertSeverity} sx={{ width: "100%" }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default Page;
