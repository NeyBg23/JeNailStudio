import { Card, CardContent, CardMedia, Typography, Button, Grid, Box } from "@mui/material";

const servicios = [
  {
    nombre: "Unas Acrilicas",
    precio: "$65.000",
    imagen: "/images/UnasAcrilicas.png",
  },
  {
    nombre: "Unas en Gel",
    precio: "$60.000",
    imagen: "/images/unasGel.png",
  },
  {
    nombre: "Semipermanente",
    precio: "$45.000",
    imagen: "/images/unasSemipermantente.png",
  },
];

function Servicios() {
  return (
    <Box sx={{ py: 8, px: 2, backgroundColor: "#FAE3D9" }}>
      <Typography variant="h4" align="center" sx={{ color: "#6D6875", fontWeight: 700, mb: 4 }}>
        Servicios Destacados
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {servicios.map((s) => (
          <Grid item xs={12} sm={6} md={4} key={s.nombre}>
            <Card
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
              }}
            >
              <Box sx={{ position: "relative", overflow: "hidden" }}>
                <CardMedia
                  component="img"
                  height="280"
                  image={s.imagen}
                  alt={s.nombre}
                  sx={{
                    transition: "transform 450ms ease",
                    ".MuiCard-root:hover &": { transform: "scale(1.07)" },
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.00) 35%, rgba(0,0,0,0.55) 100%)",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    p: 1.5,
                  }}
                >
                  <Typography sx={{ color: "#fff", fontWeight: 700 }}>{s.nombre}</Typography>
                  <Box
                    sx={{
                      px: 1.2,
                      py: 0.4,
                      borderRadius: "999px",
                      backgroundColor: "rgba(255, 214, 221, 0.92)",
                      color: "#6D6875",
                      fontWeight: 800,
                      fontSize: "0.9rem",
                    }}
                  >
                    {s.precio}
                  </Box>
                </Box>
              </Box>

              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="body1" sx={{ my: 1, color: "#6D6875" }}>
                  Diseño elegante y duradero con acabado profesional.
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#B5838D",
                    borderRadius: "30px",
                    "&:hover": { backgroundColor: "#6D6875" },
                  }}
                  onClick={() => document.getElementById("reservar").scrollIntoView({ behavior: "smooth" })}
                >
                  Reservar
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Servicios;
