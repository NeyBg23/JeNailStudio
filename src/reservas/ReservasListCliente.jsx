import { useEffect, useMemo, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Paper,
  TextField,
  Chip,
} from "@mui/material";

const toDate = (value) => {
  if (!value) return null;
  if (value?.toDate) return value.toDate();
  if (typeof value === "string" || typeof value === "number") return new Date(value);
  if (value?.seconds) return new Date(value.seconds * 1000);
  return null;
};

function ReservasListCliente() {
  const [reservas, setReservas] = useState([]);
  const [telefonoFiltro, setTelefonoFiltro] = useState("");

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const snapshot = await getDocs(collection(db, "reservas"));
        const data = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
        setReservas(data);
      } catch (error) {
        console.error("Error al consultar reservas:", error);
      }
    };
    fetchReservas();
  }, []);

  const reservasCliente = useMemo(() => {
    if (!telefonoFiltro.trim()) return [];
    return reservas
      .filter((r) => ((r.clienteTelefono || r.clineteTelefono || "").includes(telefonoFiltro.trim())))
      .sort((a, b) => (toDate(b.fechaHora) || 0) - (toDate(a.fechaHora) || 0));
  }, [reservas, telefonoFiltro]);

  const totalServicios = reservasCliente.length;
  const progreso = Math.min((totalServicios / 10) * 100, 100);
  const descuento =
    totalServicios >= 10
      ? "Cliente VIP: 50% en tu proximo servicio."
      : `Te faltan ${10 - totalServicios} servicios para tu beneficio VIP.`;

  return (
    <Paper
      sx={{
        mt: 4,
        p: { xs: 2, md: 3 },
        borderRadius: 3,
        background: "linear-gradient(135deg, rgba(255,240,245,0.95) 0%, rgba(253,226,228,0.9) 100%)",
        border: "1px solid rgba(109,104,117,0.15)",
        boxShadow: "0 12px 28px rgba(109,104,117,0.12)",
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, color: "#6D6875", fontWeight: 700 }}>
        Consulta tus reservas
      </Typography>

      <TextField
        label="Busca por telefono"
        value={telefonoFiltro}
        onChange={(event) => setTelefonoFiltro(event.target.value)}
        fullWidth
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(255,255,255,0.8)",
            borderRadius: 2,
          },
        }}
      />

      <Grid container spacing={2}>
        {reservasCliente.map((r) => (
          <Grid item xs={12} md={6} key={r.id}>
            <Card
              sx={{
                backgroundColor: "rgba(255,255,255,0.65)",
                border: "1px solid rgba(109,104,117,0.12)",
                boxShadow: "0 8px 18px rgba(109,104,117,0.08)",
              }}
            >
              <CardContent>
                <Typography variant="h6">{r.tipoUna || "Servicio"}</Typography>
                <Typography>Barrio: {r.barrio || "Sin barrio"}</Typography>
                <Typography>Modelo: {r.modeloSeleccionado || "Sin modelo"}</Typography>
                <Typography>Fecha: {toDate(r.fechaHora)?.toLocaleString() || "Pendiente"}</Typography>
                <Typography>Estado: {r.estado || "Agendado"}</Typography>
                <Typography>Precio: ${Number(r.precioTotal || 0).toLocaleString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {!!telefonoFiltro && reservasCliente.length === 0 && (
        <Typography sx={{ mt: 2 }}>No encontramos reservas con ese telefono.</Typography>
      )}

      <Typography variant="h6" sx={{ mt: 3 }}>
        Fidelizacion
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progreso}
        sx={{
          mt: 1,
          height: 10,
          borderRadius: 5,
          backgroundColor: "#FDE2E4",
          "& .MuiLinearProgress-bar": { backgroundColor: "#B5838D" },
        }}
      />
      <Chip
        label={descuento}
        sx={{ mt: 1.5, backgroundColor: "#FFF0F5", color: "#6D6875", fontWeight: 700 }}
      />
    </Paper>
  );
}

export default ReservasListCliente;
