// src/components/Navbar.jsx
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

function Navbar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "rgba(255, 200, 221, 0.8)", // rosa elegante translúcido
        backdropFilter: "blur(10px)", // efecto vidrio esmerilado
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo centrado */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#6D6875",
            flexGrow: 1,
            textAlign: "center"
          }}
        >
          JenNailStudio
        </Typography>

        {/* Menú */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <Button sx={{ color: "#6D6875", "&:hover": { color: "#B5838D" } }}>
            Inicio
          </Button>
          <Button sx={{ color: "#6D6875", "&:hover": { color: "#B5838D" } }}>
            Servicios
          </Button>
          <Button sx={{ color: "#6D6875", "&:hover": { color: "#B5838D" } }}>
            Testimonios
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#B5838D",
              borderRadius: "30px",
              padding: "5px 20px",
              "&:hover": { backgroundColor: "#6D6875" }
            }}
          >
            Reservar
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;