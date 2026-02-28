import { Box, Typography, Link, Button, Container, Divider } from "@mui/material";
import "./Footer.css";

function Footer() {
  return (
    <Box
      component="footer"
      className="footer-premium"
      sx={{
        mt: 6,
        background:
          "linear-gradient(135deg, #5f566e 0%, #6D6875 40%, #8b7c92 100%)",
        color: "#FFF0F5",
        borderTop: "1px solid rgba(255,255,255,0.18)",
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr 1fr" },
            gap: 3,
            alignItems: "start",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: "0.03em" }}>
              JenNailStudio
            </Typography>
            <Typography sx={{ mt: 1.2, opacity: 0.9 }}>
              Elegancia, detalle y estilo en cada cita. Agenda facil y confirma tu servicio por WhatsApp.
            </Typography>
            <Button
              className="footer-whatsapp-btn"
              component="a"
              href="https://wa.me/573045538465"
              target="_blank"
              rel="noopener"
              variant="contained"
              sx={{
                mt: 2,
                borderRadius: "999px",
                px: 3,
                width: { xs: "100%", sm: "auto" },
                backgroundColor: "#FFD6A5",
                color: "#4a4255",
                fontWeight: 700,
                "&:hover": { backgroundColor: "#ffc889" },
              }}
            >
              Escribir por WhatsApp
            </Button>
          </Box>

          <Box>
            <Typography sx={{ fontWeight: 700, mb: 1 }}>Contacto</Typography>
            <Typography>WhatsApp: +57 304 553 8465</Typography>
            <Typography sx={{ mt: 0.5 }}>Ubicacion: Servicio a domicilio</Typography>
          </Box>

          <Box>
            <Typography sx={{ fontWeight: 700, mb: 1 }}>Horario</Typography>
            <Typography>Lunes a Sabado: 8:00 am - 7:00 pm</Typography>
            <Typography sx={{ mt: 0.5 }}>Domingos: 8:00 am - 2:00 pm</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.2)" }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            gap: 1,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            © {new Date().getFullYear()} JenNailStudio. Todos los derechos reservados.
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            Desarrollado por{" "}
            <Link
              href="https://github.com/NeyBg23"
              target="_blank"
              rel="noopener"
              sx={{ color: "#FFD6A5", fontWeight: 700 }}
            >
              NeyBg23
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
