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
  Button,
  Box,
} from "@mui/material";

const toDate = (value) => {
  if (!value) return null;
  if (value?.toDate) return value.toDate();
  if (value?.seconds) return new Date(value.seconds * 1000);
  if (typeof value === "string" || typeof value === "number") return new Date(value);
  return null;
};

const ESTADOS = ["Agendado", "En curso", "Finalizado", "Cancelado"];

const normalizePhone = (raw) => {
  const clean = String(raw || "").replace(/\D/g, "");
  if (!clean) return null;
  if (clean.startsWith("57")) return clean;
  return `57${clean}`;
};

const buildStatusMessage = (reserva) => {
  const nombre = reserva.clienteNombre || "Cliente";
  const servicio = reserva.tipoUna || reserva["tipoU\u00f1a"] || "tu servicio";
  const estado = String(reserva.estado || "Agendado").toLowerCase().trim();

  if (estado === "agendado") {
    return `Hola ${nombre}, tu servicio de ${servicio} fue agendado con exito. En breve te compartimos detalles. Gracias por elegir JeNailStudio.`;
  }
  if (estado === "en curso") {
    return `Hola ${nombre}, tu servicio de ${servicio} ya esta en curso. Gracias por confiar en JeNailStudio.`;
  }
  if (estado === "finalizado" || estado === "completado") {
    return `Hola ${nombre}, tu servicio de ${servicio} fue finalizado con exito. Gracias por tu visita. Recuerda que al completar 10 servicios tendras un regalo especial de JeNailStudio.`;
  }
  if (estado === "cancelado") {
    return `Hola ${nombre}, tu solicitud de ${servicio} fue cancelada. Si deseas reagendar, estamos atentas para ayudarte.`;
  }
  return `Hola ${nombre}, el estado de tu solicitud fue actualizado a ${reserva.estado}.`;
};

function ReservasListAdmin() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const snapshot = await getDocs(collection(db, "reservas"));
        const data = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
        setReservas(data);
      } catch (error) {
        console.error("Error al cargar reservas admin:", error);
      }
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

  const abrirWhatsApp = (reserva) => {
    const phone = normalizePhone(reserva.clienteTelefono || reserva.clineteTelefono);
    if (!phone) return;
    const mensaje = encodeURIComponent(buildStatusMessage(reserva));
    window.open(`https://wa.me/${phone}?text=${mensaje}`, "_blank", "noopener,noreferrer");
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
            <TableCell>Barrio</TableCell>
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
              <TableCell>{reserva.clienteTelefono || reserva.clineteTelefono || "-"}</TableCell>
              <TableCell>{reserva.barrio || "-"}</TableCell>
              <TableCell>{reserva.tipoUna || reserva["tipoU\u00f1a"] || "-"}</TableCell>
              <TableCell>{reserva.modeloSeleccionado || "-"}</TableCell>
              <TableCell>{toDate(reserva.fechaHora || reserva.fecha)?.toLocaleString() || "-"}</TableCell>
              <TableCell>${Number(reserva.precioTotal || 0).toLocaleString()}</TableCell>
              <TableCell>
                <Chip label={reserva.estado || "Agendado"} size="small" />
              </TableCell>
              <TableCell>
                <Box sx={{ display: "grid", gap: 1 }}>
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
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => abrirWhatsApp(reserva)}
                    disabled={!normalizePhone(reserva.clienteTelefono || reserva.clineteTelefono)}
                  >
                    Enviar WhatsApp
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default ReservasListAdmin;
