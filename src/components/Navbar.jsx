import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

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

const NAV_ITEMS = [
  { label: "Inicio", id: "inicio" },
  { label: "Servicios", id: "servicios" },
  { label: "Testimonios", id: "testimonios" },
  { label: "Reservar", id: "reservar", cta: true },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (sectionId) => {
    goToSection(sectionId);
    setMobileOpen(false);
  };

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
      <Toolbar sx={{ minHeight: 72, display: "flex", justifyContent: "space-between", gap: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            color: "#6D6875",
            letterSpacing: "0.04em",
            cursor: "pointer",
          }}
          onClick={() => handleNav("inicio")}
        >
          JenNailStudio
        </Typography>

        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1.2, alignItems: "center" }}>
          {NAV_ITEMS.map((item) => (
            <Button
              key={item.id}
              onClick={() => handleNav(item.id)}
              variant={item.cta ? "contained" : "text"}
              sx={{
                color: item.cta ? "#fff" : "#6D6875",
                backgroundColor: item.cta ? "#B5838D" : "transparent",
                borderRadius: "999px",
                px: item.cta ? 2.2 : 1.4,
                "&:hover": {
                  backgroundColor: item.cta ? "#6D6875" : "rgba(109,104,117,0.08)",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        <IconButton
          onClick={() => setMobileOpen(true)}
          sx={{ display: { xs: "inline-flex", md: "none" }, color: "#6D6875" }}
          aria-label="Abrir menu"
        >
          <Box component="span" sx={{ fontSize: "1.4rem", fontWeight: 700, lineHeight: 1 }}>
            ≡
          </Box>
        </IconButton>
      </Toolbar>

      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 270, pt: 1 }}>
          <List>
            {NAV_ITEMS.map((item) => (
              <ListItemButton key={item.id} onClick={() => handleNav(item.id)}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
