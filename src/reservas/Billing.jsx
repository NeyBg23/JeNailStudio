// src/reservas/Billing.jsx
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import {
  Card, CardContent, Typography, Grid, Select, MenuItem, FormControl, InputLabel,
  Table, TableHead, TableBody, TableRow, TableCell, Paper
} from "@mui/material";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale, LinearScale, BarElement, ArcElement,
  LineElement, PointElement, Title, Tooltip, Legend
);

function Billing() {
  const [reservas, setReservas] = useState([]);
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [totalReservas, setTotalReservas] = useState(0);
  const [filter, setFilter] = useState("mes");

  useEffect(() => {
    const fetchReservas = async () => {
      const querySnapshot = await getDocs(collection(db, "reservas"));
      const reservasData = querySnapshot.docs.map(doc => doc.data());
      setReservas(reservasData);
      calcularMétricas(reservasData, filter);
    };
    fetchReservas();
  }, [filter]);

  const calcularMétricas = (data, filtro) => {
    const now = new Date();
    let filtered = data;

    if (filtro === "mes") {
      filtered = data.filter(r => new Date(r.fecha).getMonth() === now.getMonth());
    } else if (filtro === "semana") {
      const start = new Date(now.setDate(now.getDate() - 7));
      filtered = data.filter(r => new Date(r.fecha) >= start);
    } else if (filtro === "dia") {
      filtered = data.filter(r => new Date(r.fecha).toDateString() === now.toDateString());
    }

    const ingresos = filtered.reduce((acc, r) => acc + r.precioTotal, 0);
    setTotalIngresos(ingresos);
    setTotalReservas(filtered.length);
  };

  // Fidelización: clientes con más de 10 reservas
  const clientesFieles = reservas.reduce((acc, r) => {
    acc[r.clienteNombre] = (acc[r.clienteNombre] || 0) + 1;
    return acc;
  }, {});

  const clientesConDescuento = Object.entries(clientesFieles)
    .filter(([_, count]) => count >= 10)
    .map(([nombre]) => nombre);

  // Gráfica de línea: ingresos por fecha
  const ingresosPorFecha = reservas.reduce((acc, r) => {
    const fecha = new Date(r.fecha).toLocaleDateString();
    acc[fecha] = (acc[fecha] || 0) + r.precioTotal;
    return acc;
  }, {});

  const lineData = {
    labels: Object.keys(ingresosPorFecha),
    datasets: [
      {
        label: "Ingresos por fecha",
        data: Object.values(ingresosPorFecha),
        borderColor: "#B5838D",
        backgroundColor: "#FFC8DD",
        tension: 0.3,
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: "#6D6875"
      }
    ]
  };

  return (
    <Grid container spacing={2} style={{ marginTop: "20px" }}>
      {/* Filtros */}
      <Grid item xs={12}>
        <FormControl style={{ minWidth: 150 }}>
          <InputLabel>Filtro</InputLabel>
          <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <MenuItem value="mes">Este mes</MenuItem>
            <MenuItem value="semana">Última semana</MenuItem>
            <MenuItem value="dia">Hoy</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Cards métricas */}
      <Grid item xs={6}>
        <Card style={{ backgroundColor: "#FFF0F5", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
          <CardContent>
            <Typography variant="h5">Ingresos Totales</Typography>
            <Typography variant="h4">${totalIngresos}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card style={{ backgroundColor: "#FDE2E4", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
          <CardContent>
            <Typography variant="h5">Reservas Totales</Typography>
            <Typography variant="h4">{totalReservas}</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Gráficas */}
      <Grid item xs={12}>
        <Card><CardContent><Line data={lineData} /></CardContent></Card>
      </Grid>

      {/* Historial de clientes */}
      <Grid item xs={12}>
        <Paper style={{ marginTop: "20px", padding: "10px" }}>
          <Typography variant="h6">Historial de Clientes</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cliente</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Descuento</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservas.map((r, index) => (
                <TableRow key={index}>
                  <TableCell>{r.clienteNombre}</TableCell>
                  <TableCell>{new Date(r.fecha).toLocaleDateString()}</TableCell>
                  <TableCell>{r.estado}</TableCell>
                  <TableCell>${r.precioTotal}</TableCell>
                  <TableCell>
                    {clientesConDescuento.includes(r.clienteNombre) ? "50%" : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Billing;