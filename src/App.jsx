import "./App.css";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Typography, Button, Box, Container, Paper } from "@mui/material";
import theme from "./theme";
import ReservasForm from "./reservas/ReservasForm";
import ReservasListCliente from "./reservas/ReservasListCliente";
import ReservasListAdmin from "./reservas/ReservasListAdmin";
import Billing from "./reservas/Billing";
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

  useEffect(() => {
    const onHashChange = () => setIsAdminView(window.location.hash === "#admin");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleLogin = (_, userData) => {
    if (userData?.email === "JenNailStudio23@gmail.com") {
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

        <Box
          id="inicio"
          sx={{
            backgroundImage: "url('/images/hero-nails.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            textShadow: "0 2px 6px rgba(0,0,0,0.5)",
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
            JenNailStudio
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Tu estilo, tu momento, tu espacio de belleza en casa
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              fontSize: "1.2rem",
              padding: "10px 30px",
              borderRadius: "30px",
              backgroundColor: "#B5838D",
              "&:hover": { backgroundColor: "#6D6875" },
            }}
            onClick={() =>
              document.getElementById("reservar").scrollIntoView({ behavior: "smooth" })
            }
          >
            Agendar tu cita ahora
          </Button>
        </Box>

        <Box id="servicios">
          <Servicios />
        </Box>

        <Box id="testimonios">
          <Testimonios />
        </Box>

        <Box id="reservar" sx={{ px: 2 }}>
          <ReservasForm />
          <ReservasListCliente />
        </Box>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
