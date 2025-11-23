import React, { useState, useEffect } from "react";
import { Box, Typography, Link, IconButton, Container, Grid, CircularProgress } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link as RouterLink } from "react-router-dom";

interface Category {
  category_id: number;
  category_name: string;
}

// Footer Component
const Footer: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://apisattaking.sattakingmaker.com/api/sub-category-frontend");
        const data = await response.json();
        console.log('Fetched data: ', data.data);
        if (data) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Scroll to top function
  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#212121",
        color: "#fff",
        py: 4,
        mt: "auto",
        boxShadow: "0px -4px 15px rgba(0, 0, 0, 0.2)",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          {/* Contact Info Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Contact Us
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <IconButton color="inherit" sx={{ p: 0 }}>
                <EmailIcon />
              </IconButton>
              <Link href="mailto:sattakingmaker3009@gmail.com" color="inherit" underline="hover" sx={{ ml: 1 }}>
                sattakingmaker3009@gmail.com
              </Link>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <IconButton color="inherit" sx={{ p: 0 }}>
                <PhoneIcon />
              </IconButton>
              <Link href="tel:+919259767717" color="inherit" underline="hover" sx={{ ml: 1 }}>
                +91 9259767717
              </Link>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <IconButton color="inherit" sx={{ p: 0 }}>
                <WhatsAppIcon />
              </IconButton>
              <Link href="https://wa.me/919259767717" color="inherit" underline="hover" sx={{ ml: 1 }}>
                +91 9259767717 (WhatsApp)
              </Link>
            </Box>
          </Grid>

          {/* Navigation Links Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Link href="/" color="inherit" underline="hover">Home</Link>
              <Link href="/playgame" color="inherit" underline="hover">Play Game</Link>
              <Link href="/about" color="inherit" underline="hover">About</Link>
              <Link href="/contact" color="inherit" underline="hover">Contact Us</Link>
            </Box>
          </Grid>

          {/* All Games List Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              All Games List
            </Typography>
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                {categories.map((category) => (
                  <li key={category.category_id} style={{ marginBottom: "16px" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", textTransform: "capitalize" }}>
                      <Link
                        component={RouterLink}
                        to={`/result/${category.category_name.toLowerCase().replace(/\s+/g, '-')}`}
                        color="inherit"
                        underline="hover"
                        onClick={handleScrollToTop} // Scroll to top when clicked
                      >
                        {category.category_name}
                      </Link>
                    </Typography>
                  </li>
                ))}
              </ul>
            )}
          </Grid>

          {/* About Us Section */}
          <Grid item xs={12} sm={12} md={3}>
            <Typography variant="h6" sx={{ mb: 2, textAlign: { xs: "center", md: "left" }, fontWeight: "bold" }}>
              About Us
            </Typography>
            <Typography variant="body2" sx={{ textAlign: { xs: "center", md: "left" } }}>
              We pride ourselves on providing fast and accurate results. Our live streaming ensures you receive updates immediately after each game, so you can celebrate your wins without delay!
            </Typography>
          </Grid>
        </Grid>

        {/* Social Media Section */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Follow Us
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <IconButton href="https://www.facebook.com" target="_blank" color="inherit" aria-label="Facebook">
              <FacebookIcon />
            </IconButton>
            <IconButton href="https://twitter.com" target="_blank" color="inherit" aria-label="Twitter">
              <TwitterIcon />
            </IconButton>
            <IconButton href="https://www.instagram.com" target="_blank" color="inherit" aria-label="Instagram">
              <InstagramIcon />
            </IconButton>
            <IconButton href="https://www.linkedin.com" target="_blank" color="inherit" aria-label="LinkedIn">
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Copyright Section */}
        <Box
          sx={{
            textAlign: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            mt: 4,
            pt: 2,
            fontSize: "0.875rem",
          }}
        >
          <Typography variant="body2">
            © 2024 Satta King Maker - All Rights Reserved.
          </Typography>
          <Link href="https://sattakingmaker.com/" color="inherit" underline="hover">
            Satta King Maker
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
