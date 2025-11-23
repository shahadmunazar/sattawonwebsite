  // @ts-ignore

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const ChartPlayGameResult = () => {
  const { category_name } = useParams<{ category_name: string }>(); // Fetch category from URL parameters

  const [data, setData] = useState<any>({}); // Initial state as an empty object

  useEffect(() => {
    // Fetching the data from API based on the category_name from URL
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://liveapi.sattawon.com/api/today-numbers-history=${category_name}`
        );
        console.log("API response:", response);
        if (response.data && response.data.data) {
          setData(response.data.data); // Set the data from the API response
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data if category_name is available
    if (category_name) {
      fetchData();
    }
  }, [category_name]); // Re-fetch data if category_name changes

  return (
    <Box sx={{ width: "90%", margin: "0 auto", padding: { xs: "10px", sm: "20px" }, maxWidth: "1200px" }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          marginBottom: "20px",
          fontWeight: "bold",
          color: "#333",
          fontSize: { xs: "24px", sm: "28px" }, // Adjust font size for small screens
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Game Results - {category_name}
      </Typography>

      <TableContainer
        sx={{
          boxShadow: 6,
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #ddd",
          backgroundColor: "#ffffff",
          maxWidth: "100%",
          overflowX: "auto", // Make the table scrollable horizontally on small screens
        }}
      >
        <Table sx={{ width: "100%", tableLayout: "auto" }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "#6200ea",
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                  padding: "16px",
                  borderRadius: "10px 0 0 10px",
                  fontSize: { xs: "14px", sm: "16px" }, // Adjust font size for small screens
                }}
              >
                Month
              </TableCell>
              {/* Generate header for days from 1 to 31 */}
              {Array.from({ length: 31 }, (_, i) => (
                <TableCell
                  key={i}
                  sx={{
                    backgroundColor: "#6200ea",
                    color: "white",
                    textAlign: "center",
                    fontWeight: "bold",
                    padding: "12px 8px",
                    fontSize: { xs: "10px", sm: "14px" }, // Adjust font size for mobile view
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  {i + 1}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Loop through the months and their days */}
            {Object.keys(data).map((month) => (
              <TableRow
                key={month}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f1f1f1",
                  },
                  borderBottom: "1px solid #ddd",
                  transition: "background-color 0.3s ease",
                }}
              >
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    textAlign: "center",
                    backgroundColor: "#f4f4f4",
                    padding: "14px 16px",
                    borderRadius: "0 10px 10px 0",
                    fontSize: { xs: "14px", sm: "16px" }, // Adjust font size for small screens
                  }}
                >
                  {month}
                </TableCell>
                {data[month].map((item: any, index: number) => (
                  <TableCell
                    key={index}
                    sx={{
                      textAlign: "center",
                      padding: "14px",
                      borderBottom: "1px solid #ddd",
                      backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
                      fontSize: { xs: "12px", sm: "14px" }, // Adjust font size for mobile view
                      transition: "background-color 0.2s ease",
                    }}
                  >
                    {item.open_number || <span style={{ color: "#ccc" }}>-</span>}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ChartPlayGameResult;
