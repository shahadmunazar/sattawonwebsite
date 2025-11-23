import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, TextField, Button, Alert, Typography, CircularProgress } from "@mui/material";
import { keyframes } from "@mui/system";

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

interface Field {
  amount: string;
  enteredNumber: string;
}

interface SubCategoryPage1Props {
  category: string;
  subCategory: string;
  categoryId: number;
  subCategoryId: number;
}

const SubCategoryPage1: React.FC<SubCategoryPage1Props> = ({ subCategory, categoryId, subCategoryId }) => {
  const navigate = useNavigate();
  const [fields, setFields] = useState<Field[]>([{ amount: "", enteredNumber: "" }]);
  const [balance, setWalletBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [alert, setAlert] = useState<{ message: string; severity: 'success' | 'error' } | null>(null);

  const handleFieldChange = (index: number, fieldName: keyof Field, value: string) => {
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], [fieldName]: value };
    setFields(newFields);
  };

  const handleAddField = () => {
    setFields([...fields, { amount: "", enteredNumber: "" }]);
  };

  const handleRemoveField = (index: number) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAlert({ message: "Please log in to your account.", severity: "error" });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      return;
    }

    const fetchWalletBalance = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("https://apisattaking.sattakingmaker.com/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWalletBalance(response.data.data.balance ?? 0);
      } catch (error) {
        console.error("Error fetching wallet balance:", error);
        setAlert({ message: "Failed to fetch wallet balance.", severity: "error" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchWalletBalance();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return;

    // Basic validation
    for (const field of fields) {
      if (!field.amount || isNaN(Number(field.amount)) || Number(field.amount) <= 0) {
        setAlert({ message: "Please enter a valid amount.", severity: "error" });
        return;
      }
      if (!field.enteredNumber || isNaN(Number(field.enteredNumber))) {
        setAlert({ message: "Please enter a valid number.", severity: "error" });
        return;
      }
    }

    const enteredData = fields.map(field => ({
      number: Number(field.enteredNumber),
      amount: Number(field.amount),
    }));

    const payload = {
      entered_data: enteredData,
      category_id: categoryId,
      subcategory_id: subCategoryId,
      subcategory_name: subCategory,
    };

    try {
      const response = await axios.post(
        "https://apisattaking.sattakingmaker.com/api/user/submit-double-game",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Submission success:", response.data);
      setAlert({ message: "Submission successful!", severity: "success" });
    } catch (error) {
      console.error("Submission error:", error);
      setAlert({ message: "Submission failed. Please try again.", severity: "error" });
    }
  };

  const handleBackToAllGames = () => {
    navigate("/playgame");
  };

  return (
    <Box
      sx={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: 3,
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        borderRadius: 2,
        backgroundColor: "#F0F8FF",
        transition: "background-color 0.3s ease, transform 0.3s ease",
        ":hover": {
          backgroundColor: "#E6F0FA",
          transform: "scale(1.02)",
        },
        "@media (max-width: 600px)": {
          padding: 2,
        },
      }}
    >
      {alert && (
        <Alert severity={alert.severity} sx={{ mb: 2 }}>
          {alert.message}
        </Alert>
      )}

      <Typography variant="h6" sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}>
        Wallet Balance: 
        {isLoading ? (
          <CircularProgress size={20} />
        ) : (
          `₹${balance !== null ? balance.toLocaleString("en-IN") : "Loading..."}`
        )}
      </Typography>

      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <TextField
              label="Enter amount"
              variant="outlined"
              value={field.amount}
              onChange={(e) => handleFieldChange(index, "amount", e.target.value)}
              sx={{ flex: 1, mr: 2 }}
            />
            <TextField
              label="Enter number"
              variant="outlined"
              value={field.enteredNumber}
              onChange={(e) => handleFieldChange(index, "enteredNumber", e.target.value)}
              sx={{ flex: 1, mr: 2 }}
            />
            {fields.length > 1 && (
              <Button
                variant="contained"
                color="error"
                onClick={() => handleRemoveField(index)}
                sx={{
                  ml: 1,
                  animation: `${pulse} 1s infinite`,
                }}
              >
                Remove
              </Button>
            )}
          </Box>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddField}
          sx={{
            mb: 2,
            animation: `${pulse} 1s infinite`,
          }}
        >
          Add More
        </Button>
        <br />
        <Button
          type="submit"
          variant="contained"
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
      </form>

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
            background: "linear-gradient(45deg, #FF7043 40%, #FFCCBC 80%)",
          },
        }}
      >
        Back to All Games
      </Button>
    </Box>
  );
};

export default SubCategoryPage1;
