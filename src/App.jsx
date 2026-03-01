import "./App.css";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Typography, Button, Box, Container, Paper } from "@mui/material";
import theme from "./theme";
import ReservasListCliente from "./reservas/ReservasListCliente";
import ReservasListAdmin from "./reservas/ReservasListAdmin";
import Billing from "./reservas/Billing";
import BookingPanel from "./reservas/BookingPanel";
import LoginAdmin from "./admin/LoginAdmin";
import LogoutAdmin from "./admin/LogoutAdmin";
import Testimonios from "./components/Testimonio";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ServiciosLanding from "./servicios/ServiciosLanding";
import ManicurePedicurePage from "./servicios/ManicurePedicurePage";

const getRouteFromHash = (hashValue) => {
  if (hashValue === "#admin") return "admin";
  if (hashValue === "#/servicios/manicure-pedicure") return "manicure-route";
  return "home";
};

function App() {
  const [role, setRole] = useState("cliente");
  const [user, setUser] = useState(null);
  const [route, setRoute] = useState(getRouteFromHash(window.location.hash));
  const [bookingOpen, setBookingOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleLogin = (_, userData) => {
    if ((userData?.email || "").toLowerCase() === "jennailstudio23@gmail.com") {
      setRole("admin");
      setUser(userData);
      return;
    }
    setRole("cliente");
    setUser(null);
  };

  const handleLogout = () => {
    setRole("cliente");
    setUser(null);
  };

  if (route === "admin") {
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h4" sx={{ mb: 2, color: "#6D6875", fontWeight: 700 }}>
              Panel Admin
            </Typography>

            {role !== "admin" ? (
              <LoginAdmin onLogin={handleLogin} />
            ) : (
              <>
                <Typography sx={{ mb: 2 }}>Bienvenido: {user?.email}</Typography>
                <ReservasListAdmin />
                <Billing />
                <LogoutAdmin onLogout={handleLogout} />
              </>
            )}

            <Button sx={{ mt: 2 }} onClick={() => (window.location.hash = "")}>
              Volver a vista cliente
            </Button>
          </Paper>
        </Container>
      </ThemeProvider>
    );
  }

  if (route === "manicure-route") {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Navbar />
          <ManicurePedicurePage onBook={() => setBookingOpen(true)} />

          <Box id="testimonios">
            <Testimonios />
          </Box>
          <Footer />
        </div>

        <BookingPanel
          open={bookingOpen}
          onClose={() => setBookingOpen(false)}
          onCreated={() => setRefreshKey((prev) => prev + 1)}
        />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar />

        <Box id="inicio" className="hero-shell">
          <Box className="hero-overlay" />
          <Box className="hero-content">
            <Typography
              variant="h2"
              className="brand-premium brand-premium--hero"
              sx={{ fontWeight: "bold", mb: 2, fontSize: { xs: "2rem", sm: "2.6rem", md: "3.4rem" } }}
            >
              JeNailStudio
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" } }}>
              Tu estilo, tu momento, tu espacio de belleza en casa
            </Typography>
            <Button
              variant="contained"
              sx={{
                fontSize: { xs: "1rem", md: "1.05rem" },
                padding: { xs: "11px 24px", md: "12px 32px" },
                width: { xs: "100%", sm: "auto" },
                maxWidth: 340,
                borderRadius: "999px",
                backgroundColor: "#B5838D",
                "&:hover": { backgroundColor: "#6D6875" },
              }}
              onClick={() => setBookingOpen(true)}
            >
              Agendar tu cita
            </Button>
          </Box>
        </Box>

        <Box id="servicios">
          <ServiciosLanding />
        </Box>

        <Box id="reservar" className="reserve-shell">
          <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
          <Paper className="booking-banner" sx={{ p: { xs: 2, md: 4 }, borderRadius: 4 }}>
            <Typography variant="h4" sx={{ color: "#6D6875", fontWeight: 700, fontSize: { xs: "1.7rem", md: "2.125rem" } }}>
              Reserva Express
            </Typography>
            <Typography sx={{ mt: 1, mb: 2 }}>
              Agenda en menos de 1 minuto con un panel guiado y visual.
            </Typography>
            <Button
              variant="contained"
              sx={{
                borderRadius: "999px",
                px: 4,
                width: { xs: "100%", sm: "auto" },
                backgroundColor: "#B5838D",
                "&:hover": { backgroundColor: "#6D6875" },
              }}
              onClick={() => setBookingOpen(true)}
            >
              Abrir panel de reserva
            </Button>
          </Paper>

          <ReservasListCliente key={refreshKey} />
          </Container>
        </Box>

        <Box id="testimonios">
          <Testimonios />
        </Box>

        <Footer />
      </div>

      <BookingPanel
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        onCreated={() => setRefreshKey((prev) => prev + 1)}
      />
    </ThemeProvider>
  );
}

export default App;
