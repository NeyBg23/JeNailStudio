// src/App.jsx
import './App.css';
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { Typography, Button, Box } from "@mui/material";
import ReservasForm from './reservas/ReservasForm';
import ReservasListCliente from './reservas/ReservasListCliente';
import ReservasListAdmin from './reservas/ReservasListAdmin';
import Billing from './reservas/Billing';
import LoginAdmin from './admin/LoginAdmin';
import LogoutAdmin from './admin/LogoutAdmin';
import Testimonios from './components/Testimonio';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Servicios from './components/Servicios'; // nuevo componente

function App() {
  const [role, setRole] = useState("cliente");
  const [user, setUser] = useState(null);

  const handleLogin = (newRole, userData) => {
    if (userData.email === "admin@jennailstudio.com") {
      setRole("admin");
    } else {
      setRole("cliente");
    }
    setUser(userData);
  };

  const handleLogout = () => {
    setRole("cliente");
    setUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* Navbar fija arriba con scroll spy */}
        <Navbar />

        {/* Hero Section */}
        <Box id="inicio"
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
            textShadow: "0 2px 6px rgba(0,0,0,0.5)"
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
              "&:hover": { backgroundColor: "#6D6875" }
            }}
            onClick={() => document.getElementById("reservar").scrollIntoView({ behavior: "smooth" })}
          >
            Agendar tu cita ahora
          </Button>
        </Box>

        {/* Sección de Servicios destacados */}
        <Box id="servicios">
          <Servicios />
        </Box>

        {/* Sección de Testimonios */}
        <Box id="testimonios">
          <Testimonios />
        </Box>

        {/* Sección de Reservas */}
        <Box id="reservar">
          {role === "cliente" && (
            <>
              <ReservasForm />
              <ReservasListCliente />
              <Billing />
              <LoginAdmin onLogin={handleLogin} />
            </>
          )}

          {role === "admin" && (
            <>
              <ReservasForm />
              <ReservasListAdmin />
              <Billing />
              <Typography>Bienvenido Admin: {user?.email}</Typography>
              <LogoutAdmin onLogout={handleLogout} />
            </>
          )}
        </Box>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;