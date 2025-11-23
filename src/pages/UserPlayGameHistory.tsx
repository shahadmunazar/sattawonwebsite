// src/pages/UserPlayGameHistory.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Define an interface for the API response data
interface UserPlayGame {
  id: number;
  user_id: number;
  user_name: string;
  category_name: string;
  Playing_Name: string;
  play_type: string;
  entered_number: number;
  entered_amount: string;
  status: "won" | "lost" | "waiting";
  created_at: string;
}

const UserPlayGameHistory: React.FC = () => {
  const [playHistory, setPlayHistory] = useState<UserPlayGame[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "won" | "lost" | "waiting">("all");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if screen size is mobile

  useEffect(() => {
    const fetchPlayHistory = async () => {
      try {
        const token = localStorage.getItem("token") || "";
        const response = await axios.get("https://apisattaking.sattakingmaker.com/api/user/user-game-history", {
          params: { won: "true", lost: "true", waiting: "true" },
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.status === "success") {
          setPlayHistory(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching play history:", error);
      }
    };

    fetchPlayHistory();
  }, []);

  // Filter play history based on the selected tab
  const filteredHistory = playHistory.filter((history) => {
    if (activeTab === "all") return true;
    return history.status === activeTab;
  });

  // Function to set color based on the status
  const getStatusColor = (status: "won" | "lost" | "waiting") => {
    switch (status) {
      case "won":
        return theme.palette.success.main; // Green color for "won" games
      case "lost":
        return theme.palette.error.main; // Red color for "lost" games
      case "waiting":
        return theme.palette.warning.main; // Orange color for "waiting" games
      default:
        return theme.palette.text.primary;
    }
  };

  return (
    <Box sx={{ padding: isMobile ? "10px" : "20px", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center" sx={{ mb: 4 }}>
        Complete Play Game History
      </Typography>

      {/* Tab Buttons */}
      <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
        {["all", "won", "lost", "waiting"].map((tab) => (
          <Grid item key={tab} xs={6} sm={3}>
            <Button
              fullWidth
              variant={activeTab === tab ? "contained" : "outlined"}
              color={
                tab === "won"
                  ? "success"
                  : tab === "lost"
                  ? "error"
                  : tab === "waiting"
                  ? "warning"
                  : "primary"
              }
              onClick={() => setActiveTab(tab as "all" | "won" | "lost" | "waiting")}
              sx={{
                textTransform: "capitalize",
                fontWeight: activeTab === tab ? "bold" : "normal",
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Games
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* MUI Table for displaying the filtered game history */}
      <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: 3, overflowX: "auto" }}>
        <Table>
          <TableHead sx={{ backgroundColor: theme.palette.grey[200] }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Game Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Play Type</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Entered Number</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Entered Amount</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Play Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredHistory.length > 0 ? (
              filteredHistory.map((history) => (
                <TableRow key={history.id} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" } }}>
                  <TableCell>{history.category_name}</TableCell>
                  <TableCell>{history.Playing_Name}</TableCell>
                  <TableCell>{history.entered_number}</TableCell>
                  <TableCell>{history.entered_amount}</TableCell>
                  <TableCell>{new Date(history.created_at).toLocaleString()}</TableCell>
                  <TableCell sx={{ color: getStatusColor(history.status), fontWeight: "bold" }}>
                    {history.status}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: "center", py: 3 }}>
                  No play history available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserPlayGameHistory;
