import { Box, Card, CardContent, CardMedia, Chip, Typography, Button } from "@mui/material";
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

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
          maxWidth: 1300,
          mx: "auto",
        }}
      >
        {serviceCategories.map((category) => (
          <Box
            key={category.id}
            sx={{
              width: {
                xs: "100%",
                sm: "calc(50% - 12px)",
                lg: "calc(33.333% - 16px)",
              },
              minWidth: { xs: "auto", sm: 320 },
              maxWidth: 430,
            }}
          >
            <Card
              sx={{
                height: 1,
                borderRadius: 3,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
              }}
            >
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  image={category.image}
                  alt={category.title}
                  sx={{ height: { xs: 190, sm: 210, md: 220 } }}
                />
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

              <CardContent sx={{ display: "grid", gap: 1.2, flexGrow: 1, gridTemplateRows: "auto auto 1fr auto" }}>
                <Chip label={category.role} sx={{ width: "fit-content", backgroundColor: "#FFD6A5" }} />
                <Typography
                  variant="body2"
                  sx={{
                    color: "#6D6875",
                    minHeight: { xs: "auto", md: 84 },
                    display: "-webkit-box",
                    WebkitLineClamp: { xs: "unset", md: 3 },
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {category.description}
                </Typography>

                {category.id === "manicure-pedicure" ? (
                  <Button
                    variant="contained"
                    onClick={() => (window.location.hash = "#/servicios/manicure-pedicure")}
                    sx={{
                      mt: "auto",
                      borderRadius: "999px",
                      width: { xs: "100%", sm: "auto" },
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
                    sx={{
                      mt: "auto",
                      borderRadius: "999px",
                      width: { xs: "100%", sm: "auto" },
                      borderColor: "#B5838D",
                      color: "#B5838D",
                    }}
                  >
                    Proximamente
                  </Button>
                )}
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ServiciosLanding;
