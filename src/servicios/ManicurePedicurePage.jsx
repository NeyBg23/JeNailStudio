import { Box, Button, Card, CardContent, CardMedia, Chip, Container, Grid, Typography } from "@mui/material";
import { manicureServices } from "./data";

function ManicurePedicurePage({ onBook }) {
  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        minHeight: "70vh",
        background:
          "radial-gradient(circle at 14% 10%, rgba(255, 214, 229, 0.28), transparent 34%), radial-gradient(circle at 88% 84%, rgba(253, 226, 228, 0.3), transparent 38%), linear-gradient(180deg, #fff6fa 0%, #fdf0f4 100%)",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            mb: 3,
            p: { xs: 2, md: 3 },
            borderRadius: 3,
            background: "linear-gradient(110deg, #fff0f5 0%, #fde2e4 70%)",
            border: "1px solid rgba(109,104,117,0.2)",
          }}
        >
          <Chip label="Vista dedicada" sx={{ mb: 1, backgroundColor: "#FFD6A5" }} />
          <Typography variant="h4" sx={{ color: "#6D6875", fontWeight: 800 }}>
            Manicure & Pedicure
          </Typography>
          <Typography sx={{ mt: 1, color: "#6D6875", maxWidth: 760 }}>
            Aqui ves solo el catalogo de unas, de forma clara y responsive. Elige tu servicio y agenda desde el
            panel premium.
          </Typography>
          <Box sx={{ mt: 2, display: "flex", gap: 1.2, flexWrap: "wrap" }}>
            <Button
              variant="outlined"
              onClick={() => (window.location.hash = "#servicios")}
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              Volver a categorias
            </Button>
            <Button
              variant="contained"
              onClick={() => onBook("Semipermanente")}
              sx={{
                backgroundColor: "#B5838D",
                width: { xs: "100%", sm: "auto" },
                "&:hover": { backgroundColor: "#6D6875" },
              }}
            >
              Agendar cita
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {manicureServices.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.name}>
              <Card
                className="premium-card"
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
                }}
              >
                <Box sx={{ position: "relative", overflow: "hidden" }}>
                  <CardMedia
                    component="img"
                    className="premium-media-zoom"
                    image={service.image}
                    alt={service.name}
                    sx={{
                      height: { xs: 260, sm: 280, md: 290 },
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      p: 1.5,
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      background: "linear-gradient(180deg, rgba(0,0,0,0.00) 42%, rgba(0,0,0,0.62) 100%)",
                    }}
                  >
                    <Typography sx={{ color: "#fff", fontWeight: 700 }}>{service.name}</Typography>
                    <Chip
                      label={`$${service.price.toLocaleString()}`}
                      sx={{ backgroundColor: "rgba(255,214,221,0.95)", color: "#6D6875", fontWeight: 700 }}
                    />
                  </Box>
                </Box>
                <CardContent>
                  <Typography sx={{ mb: 2, color: "#6D6875" }}>{service.details}</Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => onBook(service.bookingKey)}
                    sx={{
                      borderRadius: "999px",
                      backgroundColor: "#B5838D",
                      "&:hover": { backgroundColor: "#6D6875" },
                    }}
                  >
                    Reservar este servicio
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default ManicurePedicurePage;
