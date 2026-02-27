import { Box, Typography, Link } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#6D6875",
        color: "#FFF0F5",
        padding: "30px 20px",
        marginTop: "40px",
        textAlign: "center",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
        <Typography variant="body1">Telefono:</Typography>
        <Typography variant="body1">304 553 8465</Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
        <Typography variant="body1">Horario:</Typography>
        <Typography variant="body1">
          Lunes a Sabado: 8:00 am - 7:00 pm | Domingos: 8:00 am - 2:00 pm
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        <Typography variant="body2">Dev:</Typography>
        <Typography variant="body2">
          Desarrollado con amor por{" "}
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
