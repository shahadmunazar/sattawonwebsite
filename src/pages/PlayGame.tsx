import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Button, CircularProgress, Grid, Alert, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";

// AES Encryption function
const encrypt = (text: string) => {
  const secretKey = "your-secret-key"; // Replace with a secure secret key
  const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
  return encrypted;
};

interface SubCategory {
  subcategory_id: number;
  subcategory_name: string;
}

interface Category {
  category_id: number;
  category_name: string;
  open_time: string;
  close_time: string;
  is_open: boolean;
  subcategories: SubCategory[];
}

const PlayGame: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const token = localStorage.getItem("token") || "";
  console.log(token);
  
  useEffect(() => {
    axios
      .get("https://apisattaking.sattakingmaker.com/api/sub-category-frontend", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCategories(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, [token]);

  useEffect(() => {
    if (modalVisible) {
      const timer = setTimeout(() => {
        setModalVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [modalVisible]);

  if (loading) {
    return (
      <Container>
        <Box sx={{ py: 4, display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  const handleClick = (category: Category) => {
    if (!category.is_open) {
      setModalVisible(true);
    }
  };

  return (
    <Container sx={{ pt: 8, backgroundColor: "#F0F8FF", padding: "20px", borderRadius: "10px" }}>
      <Box sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
        If you win the game, you will get ₹96 for every ₹1.
        </Typography>
        <Typography variant="h5" gutterBottom>अगर आप गेम जीतते हैं, तो आपको ₹1 पर ₹96 मिलेंगे।</Typography>
        

        <Grid container spacing={2} justifyContent="center">
          {categories.map((category) => (
            <Grid item xs={12} key={category.category_id}>
              <Box sx={{ my: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: 2,
                    marginBottom: 2,
                    backgroundColor: "#b5ac8f",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6" sx={{ flexGrow: 1, textAlign: { xs: "center", md: "left" } }}>
                      <Box component="span" sx={{ fontWeight: "bold" }}>
                        {category.category_name}
                      </Box>
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", textAlign: { xs: "center", md: "right" } }}>
                      <Box component="span" sx={{ mx: 1 }}>
                        {category.open_time}
                      </Box>
                      <Box component="span" sx={{ mx: 1 }}>|</Box>
                      <Box component="span" sx={{ mx: 1 }}>
                        {category.close_time}
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                      justifyContent: { xs: "center", md: "flex-start" },
                      px: 1,
                    }}
                  >
                    {category.subcategories.map((sub) => (
                      <Button
                        key={sub.subcategory_id}
                        variant="outlined"
                        sx={{
                          backgroundColor: category.is_open ? "green" : "red",
                          color: "#fff",
                          minWidth: { xs: "80px", sm: "100px" },
                          fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                          padding: { xs: "6px 12px", sm: "8px 16px", md: "10px 20px" },
                        }}
                        component={Link}
                        to={
                          category.is_open
                            ? `/playGames/${encodeURIComponent(encrypt(category.category_id.toString()))}/${encodeURIComponent(encrypt(sub.subcategory_id.toString()))}/${encodeURIComponent(encrypt(category.category_name))}/${encodeURIComponent(encrypt(sub.subcategory_name))}`
                            : "#"
                        }
                        onClick={() => handleClick(category)}
                      >
                        {sub.subcategory_name}
                      </Button>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        
      </Box>

      <Modal
        open={modalVisible}
        onClose={() => setModalVisible(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
            borderRadius: '10px',
          }}
        >
          <Alert severity="warning">
            This game is currently closed. Please check again later.
          </Alert>
        </Box>
      </Modal>
    </Container>
  );
};

export default PlayGame;
