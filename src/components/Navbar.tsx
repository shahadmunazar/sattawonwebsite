import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Logo from "../../public/SattaWon.jpeg";

function Navbar() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#222",
        boxShadow: "none",
        height: "80px",
        padding: "10px 0",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Box>
            <img
              src={Logo}
              alt="Company Logo"
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                boxShadow: "0 4px 8px rgba(255,255,255,0.2)",
              }}
            />
          </Box>

          {/* Company Name */}
          <Typography
            variant="h5"
            sx={{ color: "#fff", fontWeight: "bold", letterSpacing: "1px" }}
          >
            Satta Won
          </Typography>

          {/* Download App Button */}
          <Button
            href="/https://download.sattawon.com/SattaWon.apk"
            sx={{
              color: "#fff",
              backgroundColor: "#f50057",
              textTransform: "none",
              borderRadius: "8px",
              padding: "8px 20px",
              fontSize: "14px",
              fontWeight: "bold",
              transition: "0.3s",
              "&:hover": { backgroundColor: "#d4004f" },
            }}
          >
            Download App
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
