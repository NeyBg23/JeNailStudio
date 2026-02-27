// src/components/Footer.jsx
import { Box, Typography, Link } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CodeIcon from "@mui/icons-material/Code";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#6D6875",
        color: "#FFF0F5",
        padding: "30px 20px",
        marginTop: "40px",
        textAlign: "center"
      }}
    >
      {/* Contacto */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
        <PhoneIcon />
        <Typography variant="body1">304 553 8465</Typography>
      </Box>

      {/* Horarios */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
        <AccessTimeIcon />
        <Typography variant="body1">
          Lunes a Sábado: 8:00 am – 7:00 pm | Domingos: 8:00 am – 2:00 pm
        </Typography>
      </Box>

      {/* Developer */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        <CodeIcon />
        <Typography variant="body2">
          Desarrollado con ❤️ por{" "}
          <Link
            href="https://github.com/NeyBg23"
            target="_blank"
            rel="noopener"
            sx={{ color: "#FFD6A5", fontWeight: "bold" }}
          >
            NeyBg23
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;