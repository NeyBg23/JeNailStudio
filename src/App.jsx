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
import Servicios from "./components/Servicios";

function App() {
  const [role, setRole] = useState("cliente");
  const [user, setUser] = useState(null);
  const [isAdminView, setIsAdminView] = useState(window.location.hash === "#admin");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const onHashChange = () => setIsAdminView(window.location.hash === "#admin");
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

  if (isAdminView) {
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

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar />

        <Box id="inicio" className="hero-shell">
          <Box className="hero-overlay" />
          <Box className="hero-content">
            <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
              JenNailStudio
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Tu estilo, tu momento, tu espacio de belleza en casa
            </Typography>
            <Button
              variant="contained"
              sx={{
                fontSize: "1.1rem",
                padding: "12px 32px",
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
          <Servicios />
        </Box>

        <Box id="testimonios">
          <Testimonios />
        </Box>

        <Container id="reservar" maxWidth="lg" sx={{ py: 6 }}>
          <Paper className="booking-banner" sx={{ p: { xs: 2, md: 4 }, borderRadius: 4 }}>
            <Typography variant="h4" sx={{ color: "#6D6875", fontWeight: 700 }}>
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
