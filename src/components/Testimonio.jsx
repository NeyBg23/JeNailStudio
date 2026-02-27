// src/components/Testimonios.jsx
import { Card, CardContent, Typography, Grid, Avatar } from "@mui/material";

const testimonios = [
  {
    nombre: "María G.",
    texto: "Me encantó el servicio, súper puntual y profesional. Mis uñas quedaron hermosas.",
    avatar: "/images/avatar1.jpg"
  },
  {
    nombre: "Laura P.",
    texto: "La experiencia fue acogedora y relajante. Definitivamente volveré a agendar.",
    avatar: "/images/avatar2.jpg"
  },
  {
    nombre: "Carolina R.",
    texto: "El sistema de reservas es muy intuitivo y el servicio impecable.",
    avatar: "/images/avatar3.jpg"
  }
];

function Testimonios() {
  return (
    <div style={{ marginTop: "40px", padding: "20px", backgroundColor: "#FAE3D9" }}>
      <Typography variant="h4" align="center" gutterBottom style={{ color: "#6D6875" }}>
        Testimonios Reales
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {testimonios.map((t, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
              <CardContent style={{ textAlign: "center" }}>
                <Avatar src={t.avatar} alt={t.nombre} sx={{ width: 60, height: 60, margin: "0 auto 10px" }} />
                <Typography variant="h6" style={{ color: "#B5838D" }}>{t.nombre}</Typography>
                <Typography variant="body1" style={{ color: "#6D6875", marginTop: "10px" }}>
                  "{t.texto}"
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Testimonios;