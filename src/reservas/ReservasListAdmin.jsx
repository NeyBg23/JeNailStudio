import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";

const toDate = (value) => {
  if (!value) return null;
  if (value?.toDate) return value.toDate();
  if (value?.seconds) return new Date(value.seconds * 1000);
  if (typeof value === "string" || typeof value === "number") return new Date(value);
  return null;
};

const ESTADOS = ["Agendado", "En curso", "Finalizado", "Cancelado"];

function ReservasListAdmin() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetchReservas = async () => {
      const snapshot = await getDocs(collection(db, "reservas"));
      const data = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
      setReservas(data);
    };
    fetchReservas();
  }, []);

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      await updateDoc(doc(db, "reservas", id), { estado: nuevoEstado });
      setReservas((prev) => prev.map((r) => (r.id === id ? { ...r, estado: nuevoEstado } : r)));
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
  };

  return (
    <Paper sx={{ p: 2, borderRadius: 3, mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, color: "#6D6875", fontWeight: 700 }}>
        Solicitudes de servicios
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Cliente</TableCell>
            <TableCell>Telefono</TableCell>
            <TableCell>Servicio</TableCell>
            <TableCell>Modelo</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Gestion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservas.map((reserva) => (
            <TableRow key={reserva.id}>
              <TableCell>{reserva.clienteNombre || "-"}</TableCell>
              <TableCell>{reserva.clienteTelefono || "-"}</TableCell>
              <TableCell>{reserva.tipoUna || reserva.tipoUña || "-"}</TableCell>
              <TableCell>{reserva.modeloSeleccionado || "-"}</TableCell>
              <TableCell>{toDate(reserva.fechaHora || reserva.fecha)?.toLocaleString() || "-"}</TableCell>
              <TableCell>${Number(reserva.precioTotal || 0).toLocaleString()}</TableCell>
              <TableCell>
                <Chip label={reserva.estado || "Agendado"} size="small" />
              </TableCell>
              <TableCell>
                <Select
                  size="small"
                  value={reserva.estado || "Agendado"}
                  onChange={(event) => cambiarEstado(reserva.id, event.target.value)}
                >
                  {ESTADOS.map((estado) => (
                    <MenuItem key={estado} value={estado}>
                      {estado}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default ReservasListAdmin;
