import React from "react";
import { Container, Typography, Box } from "@mui/material";

const Blog: React.FC = () => {
  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Blog
        </Typography>
        <Typography variant="body1">Welcome to our Blog page! Here you can read the latest news and updates.</Typography>
      </Box>
    </Container>
  );
};

export default Blog;
