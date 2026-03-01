import { Avatar, Box, Card, CardContent, Container, Grid, Typography } from "@mui/material";

const testimonios = [
  {
    nombre: "Maria G.",
    texto: "Me encanto el servicio, super puntual y profesional. Mis unas quedaron hermosas.",
    avatar: "/images/avatar1.jpg",
  },
  {
    nombre: "Laura P.",
    texto: "La experiencia fue acogedora y relajante. Definitivamente volvere a agendar.",
    avatar: "/images/avatar2.jpg",
  },
  {
    nombre: "Carolina R.",
    texto: "El sistema de reservas es muy intuitivo y el servicio impecable.",
    avatar: "/images/avatar3.jpg",
  },
];

function Testimonios() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
      <Typography variant="h4" align="center" sx={{ color: "#6D6875", fontWeight: 700, mb: 1 }}>
        Testimonios Reales
      </Typography>
      <Typography align="center" sx={{ color: "#6D6875", mb: 4, maxWidth: 760, mx: "auto" }}>
        Opiniones de clientes que ya vivieron la experiencia JeNailStudio.
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {testimonios.map((testimonio) => (
          <Grid item xs={12} sm={6} md={4} key={testimonio.nombre}>
            <Card
              className="premium-card"
              sx={{
                height: "100%",
                borderRadius: 3,
                background: "linear-gradient(145deg, rgba(255,255,255,0.92) 0%, rgba(255,240,245,0.9) 100%)",
                border: "1px solid rgba(109,104,117,0.13)",
                boxShadow: "0 12px 30px rgba(109,104,117,0.12)",
              }}
            >
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Avatar
                  src={testimonio.avatar}
                  alt={testimonio.nombre}
                  sx={{
                    width: 72,
                    height: 72,
                    mx: "auto",
                    mb: 1.2,
                    border: "2px solid rgba(181,131,141,0.35)",
                  }}
                />
                <Typography variant="h6" sx={{ color: "#B5838D", fontWeight: 700 }}>
                  {testimonio.nombre}
                </Typography>
                <Box sx={{ mt: 1.2, px: 0.5 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#6D6875",
                      lineHeight: 1.7,
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      minHeight: 110,
                    }}
                  >
                    "{testimonio.texto}"
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Testimonios;
