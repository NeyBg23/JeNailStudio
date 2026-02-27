import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

function Navbar() {
  return (
    <AppBar
      position="sticky"
      sx={{
        top: 0,
        backgroundColor: "rgba(255, 240, 245, 0.8)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(109,104,117,0.15)",
        boxShadow: "0 6px 24px rgba(109,104,117,0.1)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            color: "#6D6875",
            letterSpacing: "0.04em",
          }}
        >
          JenNailStudio
        </Typography>

        <Box sx={{ display: "flex", gap: { xs: 0.5, md: 1.2 }, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <Button sx={{ color: "#6D6875" }} href="#inicio">
            Inicio
          </Button>
          <Button sx={{ color: "#6D6875" }} href="#servicios">
            Servicios
          </Button>
          <Button sx={{ color: "#6D6875" }} href="#testimonios">
            Testimonios
          </Button>
          <Button
            variant="contained"
            href="#reservar"
            sx={{
              backgroundColor: "#B5838D",
              borderRadius: "999px",
              px: 2,
              "&:hover": { backgroundColor: "#6D6875" },
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
