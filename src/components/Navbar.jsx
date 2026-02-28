import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const goToSection = (sectionId) => {
  if (window.location.hash === "#/servicios/manicure-pedicure" || window.location.hash === "#admin") {
    window.location.hash = "";
    window.setTimeout(() => {
      const target = document.getElementById(sectionId);
      target?.scrollIntoView({ behavior: "smooth" });
    }, 60);
    return;
  }

  const target = document.getElementById(sectionId);
  target?.scrollIntoView({ behavior: "smooth" });
};

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
            cursor: "pointer",
          }}
          onClick={() => goToSection("inicio")}
        >
          JenNailStudio
        </Typography>

        <Box sx={{ display: "flex", gap: { xs: 0.5, md: 1.2 }, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <Button sx={{ color: "#6D6875" }} onClick={() => goToSection("inicio")}>
            Inicio
          </Button>
          <Button sx={{ color: "#6D6875" }} onClick={() => goToSection("servicios")}>
            Servicios
          </Button>
          <Button sx={{ color: "#6D6875" }} onClick={() => goToSection("testimonios")}>
            Testimonios
          </Button>
          <Button
            variant="contained"
            onClick={() => goToSection("reservar")}
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
