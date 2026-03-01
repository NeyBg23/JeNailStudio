import { useEffect, useMemo, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, doc, updateDoc, Timestamp } from "firebase/firestore";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Paper,
  TextField,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";

const toDate = (value) => {
  if (!value) return null;
  if (value?.toDate) return value.toDate();
  if (typeof value === "string" || typeof value === "number") return new Date(value);
  if (value?.seconds) return new Date(value.seconds * 1000);
  return null;
};

const normalizePhone = (value) => (value || "").replace(/\D/g, "");
const toInputDateTime = (value) => {
  const date = toDate(value);
  if (!date || Number.isNaN(date.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(
    date.getMinutes()
  )}`;
};

const statusLabel = (value) => {
  const normalized = (value || "").toLowerCase().trim();
  if (normalized === "en curso") return "En curso";
  if (normalized === "finalizado" || normalized === "completado") return "Finalizado";
  if (normalized === "cancelado") return "Cancelado";
  return "Agendado";
};

const statusColor = (value) => {
  const label = statusLabel(value);
  if (label === "En curso") return { bg: "#FFE7B3", text: "#7A5600" };
  if (label === "Finalizado") return { bg: "#D5F5E3", text: "#1E6B45" };
  if (label === "Cancelado") return { bg: "#FFD6D6", text: "#7A1E1E" };
  return { bg: "#E8D9F0", text: "#5B3A6E" };
};

function ReservasListCliente() {
  const [reservas, setReservas] = useState([]);
  const [telefonoFiltro, setTelefonoFiltro] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [editSaving, setEditSaving] = useState(false);
  const [editReserva, setEditReserva] = useState(null);
  const [okOpen, setOkOpen] = useState(false);

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

  const telefonoNormalizado = normalizePhone(telefonoFiltro);
  const telefonoCompleto = telefonoNormalizado.length >= 10;

  const reservasCliente = useMemo(() => {
    if (!telefonoCompleto) return [];
    return reservas
      .filter((r) => {
        const telReserva = normalizePhone(r.clienteTelefono || r.clineteTelefono);
        return telReserva === telefonoNormalizado;
      })
      .sort((a, b) => (toDate(b.fechaHora) || 0) - (toDate(a.fechaHora) || 0));
  }, [reservas, telefonoCompleto, telefonoNormalizado]);

  const totalServicios = reservasCliente.length;
  const progreso = Math.min((totalServicios / 10) * 100, 100);
  const descuento =
    totalServicios >= 10
      ? "Cliente VIP: 50% en tu proximo servicio."
      : `Te faltan ${10 - totalServicios} servicios para tu beneficio VIP.`;

  const canEdit = (estado) => {
    const normalized = statusLabel(estado);
    return normalized === "Agendado" || normalized === "En curso";
  };

  const openEdit = (reserva) => {
    setEditReserva({
      id: reserva.id,
      tipoUna: reserva.tipoUna || reserva["tipoU\u00f1a"] || "Semipermanente",
      direccion: reserva.direccion || "",
      barrio: reserva.barrio || "",
      modeloSeleccionado: reserva.modeloSeleccionado || "",
      observaciones: reserva.observaciones || "",
      fechaHora: toInputDateTime(reserva.fechaHora || reserva.fecha),
      estado: reserva.estado || "Agendado",
    });
    setEditOpen(true);
  };

  const saveEdit = async () => {
    if (!editReserva?.id) return;
    setEditSaving(true);
    try {
      const payload = {
        tipoUna: editReserva.tipoUna,
        ["tipoU\u00f1a"]: editReserva.tipoUna,
        direccion: editReserva.direccion.trim(),
        barrio: editReserva.barrio.trim(),
        modeloSeleccionado: editReserva.modeloSeleccionado.trim(),
        observaciones: editReserva.observaciones.trim(),
      };

      if (editReserva.fechaHora) {
        payload.fechaHora = Timestamp.fromDate(new Date(editReserva.fechaHora));
      }

      await updateDoc(doc(db, "reservas", editReserva.id), payload);

      setReservas((prev) =>
        prev.map((r) =>
          r.id === editReserva.id
            ? {
                ...r,
                ...payload,
              }
            : r
        )
      );
      setOkOpen(true);
      setEditOpen(false);
    } catch (error) {
      console.error("Error al editar reserva:", error);
    } finally {
      setEditSaving(false);
    }
  };

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
        helperText="Ingresa el numero completo para consultar tus reservas."
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
                <Chip
                  label={`Estado: ${statusLabel(r.estado)}`}
                  sx={{
                    mt: 1,
                    mb: 0.5,
                    backgroundColor: statusColor(r.estado).bg,
                    color: statusColor(r.estado).text,
                    fontWeight: 700,
                  }}
                />
                <Typography>Precio: ${Number(r.precioTotal || 0).toLocaleString()}</Typography>
                <Button
                  variant="outlined"
                  sx={{ mt: 1.2, borderRadius: "999px" }}
                  disabled={!canEdit(r.estado)}
                  onClick={() => openEdit(r)}
                >
                  Editar solicitud
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {!!telefonoFiltro && !telefonoCompleto && (
        <Typography sx={{ mt: 2 }}>Escribe el numero completo para iniciar la busqueda.</Typography>
      )}

      {!!telefonoFiltro && telefonoCompleto && reservasCliente.length === 0 && (
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

      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Editar reserva</DialogTitle>
        <DialogContent>
          <Grid container spacing={1.5} sx={{ mt: 0.2 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Servicio"
                value={editReserva?.tipoUna || ""}
                onChange={(event) => setEditReserva((prev) => ({ ...prev, tipoUna: event.target.value }))}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Modelo"
                value={editReserva?.modeloSeleccionado || ""}
                onChange={(event) =>
                  setEditReserva((prev) => ({ ...prev, modeloSeleccionado: event.target.value }))
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Direccion"
                value={editReserva?.direccion || ""}
                onChange={(event) => setEditReserva((prev) => ({ ...prev, direccion: event.target.value }))}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Barrio"
                value={editReserva?.barrio || ""}
                onChange={(event) => setEditReserva((prev) => ({ ...prev, barrio: event.target.value }))}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Fecha y hora"
                type="datetime-local"
                value={editReserva?.fechaHora || ""}
                onChange={(event) => setEditReserva((prev) => ({ ...prev, fechaHora: event.target.value }))}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notas del servicio"
                value={editReserva?.observaciones || ""}
                onChange={(event) => setEditReserva((prev) => ({ ...prev, observaciones: event.target.value }))}
                fullWidth
                multiline
                minRows={2}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancelar</Button>
          <Button onClick={saveEdit} variant="contained" disabled={editSaving}>
            {editSaving ? "Guardando..." : "Guardar cambios"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={okOpen}
        autoHideDuration={3000}
        onClose={() => setOkOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setOkOpen(false)} severity="success" sx={{ width: "100%" }}>
          Reserva actualizada correctamente.
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default ReservasListCliente;
