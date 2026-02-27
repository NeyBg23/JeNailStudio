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
      const snapshot = await getDocs(collection(db, "reservas"));
      const data = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
      setReservas(data);
    };
    fetchReservas();
  }, []);

  const reservasCliente = useMemo(() => {
    if (!telefonoFiltro.trim()) return [];
    return reservas
      .filter((r) => (r.clienteTelefono || "").includes(telefonoFiltro.trim()))
      .sort((a, b) => (toDate(b.fechaHora) || 0) - (toDate(a.fechaHora) || 0));
  }, [reservas, telefonoFiltro]);

  const totalServicios = reservasCliente.length;
  const progreso = Math.min((totalServicios / 10) * 100, 100);
  const descuento =
    totalServicios >= 10
      ? "Cliente VIP: 50% en tu proximo servicio."
      : `Te faltan ${10 - totalServicios} servicios para tu beneficio VIP.`;

  return (
    <Paper sx={{ mt: 4, p: 3, borderRadius: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, color: "#6D6875", fontWeight: 700 }}>
        Consulta tus reservas
      </Typography>

      <TextField
        label="Busca por telefono"
        value={telefonoFiltro}
        onChange={(event) => setTelefonoFiltro(event.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      <Grid container spacing={2}>
        {reservasCliente.map((r) => (
          <Grid item xs={12} md={6} key={r.id}>
            <Card sx={{ backgroundColor: "#FAE3D9" }}>
              <CardContent>
                <Typography variant="h6">{r.tipoUna || "Servicio"}</Typography>
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
