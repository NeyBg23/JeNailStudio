import { useEffect, useMemo, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Box,
  Chip,
} from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const toDate = (value) => {
  if (!value) return null;
  if (value?.toDate) return value.toDate();
  if (value?.seconds) return new Date(value.seconds * 1000);
  if (typeof value === "string" || typeof value === "number") return new Date(value);
  return null;
};

function Billing() {
  const [reservas, setReservas] = useState([]);
  const [filter, setFilter] = useState("mes");

  useEffect(() => {
    const fetchReservas = async () => {
      const snapshot = await getDocs(collection(db, "reservas"));
      const data = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
      setReservas(data);
    };
    fetchReservas();
  }, []);

  const filtradas = useMemo(() => {
    const now = new Date();
    return reservas.filter((r) => {
      const fecha = toDate(r.fechaHora || r.fecha);
      if (!fecha) return false;

      if (filter === "dia") {
        return fecha.toDateString() === now.toDateString();
      }
      if (filter === "semana") {
        const inicio = new Date(now);
        inicio.setDate(now.getDate() - 7);
        return fecha >= inicio;
      }
      return fecha.getMonth() === now.getMonth() && fecha.getFullYear() === now.getFullYear();
    });
  }, [reservas, filter]);

  const totalIngresos = filtradas.reduce((acc, r) => acc + Number(r.precioTotal || 0), 0);
  const totalReservas = filtradas.length;

  const ingresosPorFecha = useMemo(() => {
    const map = {};
    filtradas.forEach((r) => {
      const key = toDate(r.fechaHora || r.fecha)?.toLocaleDateString() || "Sin fecha";
      map[key] = (map[key] || 0) + Number(r.precioTotal || 0);
    });
    return map;
  }, [filtradas]);

  const clientesFrecuentes = useMemo(() => {
    const counter = {};
    reservas.forEach((r) => {
      const key = r.clienteTelefono || r.clineteTelefono || r.clienteNombre || "Cliente";
      counter[key] = (counter[key] || 0) + 1;
    });
    return counter;
  }, [reservas]);

  const lineData = {
    labels: Object.keys(ingresosPorFecha),
    datasets: [
      {
        label: "Ingresos",
        data: Object.values(ingresosPorFecha),
        borderColor: "#B5838D",
        backgroundColor: "rgba(181,131,141,0.2)",
        fill: true,
        tension: 0.35,
      },
    ],
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Box
        sx={{
          p: 2,
          borderRadius: 3,
          background: "linear-gradient(120deg, #fff0f5 0%, #fde2e4 100%)",
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ color: "#6D6875", fontWeight: 700 }}>
          Billing y analitica
        </Typography>
        <Typography variant="body2">Resumen financiero del periodo seleccionado.</Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Periodo</InputLabel>
            <Select value={filter} label="Periodo" onChange={(event) => setFilter(event.target.value)}>
              <MenuItem value="mes">Este mes</MenuItem>
              <MenuItem value="semana">Ultima semana</MenuItem>
              <MenuItem value="dia">Hoy</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, backgroundColor: "#FFF0F5" }}>
            <CardContent>
              <Typography variant="subtitle1">Ingresos</Typography>
              <Typography variant="h4">${totalIngresos.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, backgroundColor: "#FDE2E4" }}>
            <CardContent>
              <Typography variant="subtitle1">Reservas</Typography>
              <Typography variant="h4">{totalReservas}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Line data={lineData} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Historial de servicios
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Servicio</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Precio</TableCell>
                  <TableCell>Fidelizacion</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtradas.map((r) => {
                  const key = r.clienteTelefono || r.clineteTelefono || r.clienteNombre || "Cliente";
                  const servicios = clientesFrecuentes[key] || 0;
                  const vip = servicios >= 10;
                  return (
                    <TableRow key={r.id}>
                      <TableCell>{r.clienteNombre || "-"}</TableCell>
                      <TableCell>{r.tipoUna || r["tipoU\u00f1a"] || "-"}</TableCell>
                      <TableCell>{toDate(r.fechaHora || r.fecha)?.toLocaleString() || "-"}</TableCell>
                      <TableCell>{r.estado || "-"}</TableCell>
                      <TableCell>${Number(r.precioTotal || 0).toLocaleString()}</TableCell>
                      <TableCell>
                        {vip ? (
                          <Chip label="VIP 50%" size="small" sx={{ backgroundColor: "#ffd6a5" }} />
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Billing;
