// src/components/Servicios.jsx
import { Card, CardContent, CardMedia, Typography, Button, Grid } from "@mui/material";

const servicios = [
  {
    nombre: "Uñas Acrílicas",
    precio: "$50.000",
    imagen: "/images/servicio-acrilicas.jpg"
  },
  {
    nombre: "Uñas en Gel",
    precio: "$60.000",
    imagen: "/images/servicio-gel.jpg"
  },
  {
    nombre: "Semipermanente",
    precio: "$40.000",
    imagen: "/images/servicio-semi.jpg"
  }
];

function Servicios() {
  return (
    <div style={{ padding: "40px 20px", backgroundColor: "#FAE3D9" }}>
      <Typography variant="h4" align="center" gutterBottom style={{ color: "#6D6875" }}>
        Servicios Destacados
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {servicios.map((s, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
              <CardMedia
                component="img"
                height="200"
                image={s.imagen}
                alt={s.nombre}
              />
              <CardContent style={{ textAlign: "center" }}>
                <Typography variant="h6" style={{ color: "#B5838D" }}>
                  {s.nombre}
                </Typography>
                <Typography variant="body1" style={{ margin: "10px 0", color: "#6D6875" }}>
                  {s.precio}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#B5838D",
                    borderRadius: "30px",
                    "&:hover": { backgroundColor: "#6D6875" }
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
    </div>
  );
}

export default Servicios;