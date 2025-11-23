import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Button, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface SubCategoryPage2Props {
  category: string;
  subCategory: string;
  categoryId: string;
  subCategoryId: string;
}

const initialInputValues = Array(10).fill("");

const SubCategoryPage2: React.FC<SubCategoryPage2Props> = ({ subCategory, categoryId, subCategoryId }) => {
  const [anderHarupValues, setAnderHarupValues] = useState<string[]>(initialInputValues);
  const [baharHarupValues, setBaharHarupValues] = useState<string[]>(initialInputValues);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWalletBalance = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setShowAlert(true);
        setAlertMessage("Unauthorized access! Please log in.");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        return;
      }

      try {
        const response = await axios.get("https://apisattaking.sattakingmaker.com/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWalletBalance(response.data.data.balance ?? 0);
      } catch (error) {
        console.error("Error fetching wallet balance:", error);
        setAlertMessage("Failed to fetch wallet balance. Please try again later.");
        setShowAlert(true);
      }
    };

    fetchWalletBalance();
  }, [navigate]);

  const handleAnderHarupChange = (index: number, value: string) => {
    const updatedAnderHarupValues = [...anderHarupValues];
    updatedAnderHarupValues[index] = value;
    setAnderHarupValues(updatedAnderHarupValues);
  };

  const handleBaharHarupChange = (index: number, value: string) => {
    const updatedBaharHarupValues = [...baharHarupValues];
    updatedBaharHarupValues[index] = value;
    setBaharHarupValues(updatedBaharHarupValues);
  };

  const handleSubmit = async () => {
    const anderHarupPayload = anderHarupValues
      .map((value, index) => ({ number: index, amount: value }))
      .filter((item) => item.amount !== "");

    const baharHarupPayload = baharHarupValues
      .map((value, index) => ({ number: index, amount: value }))
      .filter((item) => item.amount !== "");

    const payload = {
      entered_data: {
        ander_harup: anderHarupPayload,
        bahar_harup: baharHarupPayload,
      },
      category_id: categoryId,
      subcategory_id: subCategoryId,
      subcategory_name: subCategory,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://apisattaking.sattakingmaker.com/api/user/submit-harup-game",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setAlertMessage("Data submitted successfully!");
        setShowAlert(true);
      } else {
        setAlertMessage(response.data.message || "An error occurred while submitting.");
        setShowAlert(true);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to submit data.";
      setAlertMessage(errorMessage);
      setShowAlert(true);

      if (errorMessage === "Insufficient balance. Please add more money to play all games") {
        setTimeout(() => {
          navigate("/wallet");
        }, 3000);
      }
    }

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleBackToAllGames = () => {
    navigate("/playgame");
  };

  return (
    <Box
      sx={{
        padding: 3,
        maxWidth: 600,
        margin: "0 auto",
        backgroundColor: "#F0F8FF",
        color: "rgb(18 15 15 / 14%)",
        borderRadius: "10px",
      }}
    >
      {showAlert && alertMessage && (
        <Alert severity={alertMessage.includes("successfully") ? "success" : "error"} sx={{ mb: 2 }}>
          {alertMessage}
        </Alert>
      )}

      <Typography
        variant="h6"
        sx={{ mb: 2, textAlign: "center", fontWeight: "bold", color: "rgb(12 2 25 / 96%)" }}
      >
        Wallet Balance: ₹{walletBalance !== null ? walletBalance.toLocaleString("en-IN") : "Loading..."}
      </Typography>

      <Typography variant="h5" sx={{ marginBottom: 2, color: "rgb(12 2 25 / 96%)" }}>
        Ander Harup
      </Typography>

      {Array.from({ length: Math.ceil(anderHarupValues.length / 5) }, (_, rowIndex) => (
        <Box key={rowIndex} sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
          {anderHarupValues.slice(rowIndex * 5, rowIndex * 5 + 5).map((value, index) => (
            <TextField
              key={index}
              label={`0${index + rowIndex * 5}`}
              value={value}
              onChange={(e) => handleAnderHarupChange(index + rowIndex * 5, e.target.value)}
              sx={{ flex: 1, marginRight: 1, backgroundColor: "rgb(18 15 15 / 14%)", borderRadius: "5px" }}
            />
          ))}
        </Box>
      ))}

      <Typography variant="h5" sx={{ marginBottom: 2, color: "rgb(12 2 25 / 96%)" }}>
        Bahar Harup
      </Typography>

      {Array.from({ length: Math.ceil(baharHarupValues.length / 5) }, (_, rowIndex) => (
        <Box key={rowIndex} sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
          {baharHarupValues.slice(rowIndex * 5, rowIndex * 5 + 5).map((value, index) => (
            <TextField
              key={index}
              label={`0${index + rowIndex * 5}`}
              value={value}
              onChange={(e) => handleBaharHarupChange(index + rowIndex * 5, e.target.value)}
              sx={{ flex: 1, marginRight: 1, backgroundColor: "rgb(18 15 15 / 14%)", borderRadius: "5px" }}
            />
          ))}
        </Box>
      ))}

      <Button
        variant="contained"
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
        Submit
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
            background: "linear-gradient(45deg, #FF3D00 30%, #FFAB91 90%)",
          },
        }}
      >
        Back to All Games
      </Button>
    </Box>
  );
};

export default SubCategoryPage2;
