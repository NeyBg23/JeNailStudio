import { Box, Card, CardContent, CardMedia, Chip, Grid, Typography, Button } from "@mui/material";
import { serviceCategories } from "./data";

function ServiciosLanding() {
  return (
    <Box sx={{ py: 8, px: 2, backgroundColor: "#FAE3D9" }}>
      <Typography variant="h4" align="center" sx={{ color: "#6D6875", fontWeight: 700, mb: 1 }}>
        Servicios Profesionales
      </Typography>
      <Typography align="center" sx={{ color: "#6D6875", maxWidth: 900, mx: "auto", mb: 4 }}>
        Selecciona una categoria para ver su vista dedicada. Manicure & Pedicure ya tiene catalogo completo.
      </Typography>

      <Grid container spacing={3}>
        {serviceCategories.map((category) => (
          <Grid item xs={12} sm={6} lg={4} key={category.id}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
              }}
            >
              <Box sx={{ position: "relative" }}>
                <CardMedia component="img" height="210" image={category.image} alt={category.title} />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)",
                    display: "flex",
                    alignItems: "flex-end",
                    p: 1.5,
                  }}
                >
                  <Typography sx={{ color: "#fff", fontWeight: 700 }}>{category.title}</Typography>
                </Box>
              </Box>

              <CardContent sx={{ display: "grid", gap: 1.2, flexGrow: 1 }}>
                <Chip label={category.role} sx={{ width: "fit-content", backgroundColor: "#FFD6A5" }} />
                <Typography variant="body2" sx={{ color: "#6D6875", minHeight: 70 }}>
                  {category.description}
                </Typography>

                {category.id === "manicure-pedicure" ? (
                  <Button
                    variant="contained"
                    onClick={() => (window.location.hash = "#/servicios/manicure-pedicure")}
                    sx={{
                      mt: "auto",
                      borderRadius: "999px",
                      backgroundColor: "#B5838D",
                      "&:hover": { backgroundColor: "#6D6875" },
                    }}
                  >
                    Ver catalogo de unas
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    disabled
                    sx={{ mt: "auto", borderRadius: "999px", borderColor: "#B5838D", color: "#B5838D" }}
                  >
                    Proximamente
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ServiciosLanding;
