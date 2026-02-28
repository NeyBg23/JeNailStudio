import { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Button, Grid, Box, Chip } from "@mui/material";

const categorias = [
  {
    id: "manicure",
    titulo: "Manicure & Pedicure",
    rol: "Manicurista y Pedicurista",
    breve:
      "Cuidado estetico de manos y pies: limpieza, limado, exfoliacion, masajes y tecnicas como acrilico, gel y semipermanente.",
  },
  {
    id: "estilista",
    titulo: "Cabello y Color",
    rol: "Estilista / Colorista",
    breve:
      "Cortes, peinados y trabajos de color para renovar la imagen con un acabado armonico y profesional.",
  },
  {
    id: "estetica",
    titulo: "Piel y Bienestar",
    rol: "Esteticista / Cosmetologo",
    breve:
      "Enfoque en limpieza facial, depilacion y rutinas de bienestar corporal con resultados naturales.",
  },
  {
    id: "barberia",
    titulo: "Barberia",
    rol: "Barbero",
    breve:
      "Corte masculino, perfilado de barba y diseno de contornos con tecnicas tradicionales y modernas.",
  },
  {
    id: "maquillaje",
    titulo: "Maquillaje Social",
    rol: "Makeup Artist",
    breve:
      "Maquillaje para eventos y sesiones, adaptado a tono de piel, estilo y objetivo de cada cliente.",
  },
];

const serviciosUnas = [
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
  const [categoriaActiva, setCategoriaActiva] = useState("manicure");

  return (
    <Box sx={{ py: 8, px: 2, backgroundColor: "#FAE3D9" }}>
      <Typography variant="h4" align="center" sx={{ color: "#6D6875", fontWeight: 700, mb: 1 }}>
        Servicios
      </Typography>
      <Typography align="center" sx={{ color: "#6D6875", maxWidth: 850, mx: "auto", mb: 4 }}>
        Primero elige una categoria. Si eliges Manicure & Pedicure, veras las opciones de unas disponibles
        ahora mismo.
      </Typography>

      <Grid container spacing={2.2} justifyContent="center" sx={{ mb: 4 }}>
        {categorias.map((cat) => (
          <Grid item xs={12} sm={6} md={4} key={cat.id}>
            <Card
              onClick={() => setCategoriaActiva(cat.id)}
              sx={{
                cursor: "pointer",
                borderRadius: 3,
                border:
                  categoriaActiva === cat.id
                    ? "2px solid #6D6875"
                    : "1px solid rgba(109,104,117,0.22)",
                backgroundColor: categoriaActiva === cat.id ? "#fff3f7" : "#ffffffcc",
                boxShadow:
                  categoriaActiva === cat.id
                    ? "0 14px 34px rgba(109,104,117,0.18)"
                    : "0 7px 18px rgba(0,0,0,0.08)",
                transition: "all 220ms ease",
                "&:hover": { transform: "translateY(-2px)" },
              }}
            >
              <CardContent>
                <Chip label={cat.rol} sx={{ mb: 1.2, backgroundColor: "#FFD6A5", color: "#6D6875" }} />
                <Typography variant="h6" sx={{ color: "#6D6875", fontWeight: 700 }}>
                  {cat.titulo}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: "#6D6875" }}>
                  {cat.breve}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {categoriaActiva === "manicure" ? (
        <Grid container spacing={3} justifyContent="center">
          {serviciosUnas.map((s) => (
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
                    Diseno elegante y duradero con acabado profesional.
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#B5838D",
                      borderRadius: "30px",
                      "&:hover": { backgroundColor: "#6D6875" },
                    }}
                    onClick={() =>
                      document.getElementById("reservar").scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Reservar
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            p: 3,
            borderRadius: 3,
            textAlign: "center",
            backgroundColor: "#fff3f7",
            border: "1px solid rgba(109,104,117,0.2)",
          }}
        >
          <Typography variant="h6" sx={{ color: "#6D6875", fontWeight: 700 }}>
            Categoria en preparacion
          </Typography>
          <Typography sx={{ mt: 1, color: "#6D6875" }}>
            Esta categoria se puede habilitar en la siguiente fase con su propio catalogo, precios e imagenes.
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default Servicios;
