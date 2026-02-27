import { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { TextField, Button, Snackbar, Alert, Paper, Typography, Grid } from "@mui/material";

function ReservasForm() {
  const [form, setForm] = useState({
    clienteNombre: "",
    clienteTelefono: "",
    direccion: "",
    tipoUna: "",
    modeloSeleccionado: "",
    fechaHora: "",
    precioTotal: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const setValue = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await addDoc(collection(db, "reservas"), {
        clienteNombre: form.clienteNombre.trim(),
        clienteTelefono: form.clienteTelefono.trim(),
        direccion: form.direccion.trim(),
        tipoUna: form.tipoUna.trim(),
        modeloSeleccionado: form.modeloSeleccionado.trim(),
        fechaHora: form.fechaHora ? Timestamp.fromDate(new Date(form.fechaHora)) : Timestamp.now(),
        precioTotal: Number(form.precioTotal) || 0,
        estado: "Agendado",
      });

      setOpenSnackbar(true);
      setForm({
        clienteNombre: "",
        clienteTelefono: "",
        direccion: "",
        tipoUna: "",
        modeloSeleccionado: "",
        fechaHora: "",
        precioTotal: "",
      });
    } catch (err) {
      console.error("Error al agendar reserva:", err);
    }
  };

  return (
    <Paper sx={{ mt: 4, p: 3, borderRadius: 3 }}>
      <Typography variant="h5" sx={{ color: "#6D6875", mb: 2, fontWeight: 700 }}>
        Agenda tu cita
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Nombre"
              value={form.clienteNombre}
              onChange={(event) => setValue("clienteNombre", event.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Telefono"
              value={form.clienteTelefono}
              onChange={(event) => setValue("clienteTelefono", event.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Direccion"
              value={form.direccion}
              onChange={(event) => setValue("direccion", event.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Tipo de una"
              value={form.tipoUna}
              onChange={(event) => setValue("tipoUna", event.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Modelo"
              value={form.modeloSeleccionado}
              onChange={(event) => setValue("modeloSeleccionado", event.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Precio total"
              type="number"
              value={form.precioTotal}
              onChange={(event) => setValue("precioTotal", event.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Fecha y hora"
              type="datetime-local"
              value={form.fechaHora}
              onChange={(event) => setValue("fechaHora", event.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            borderRadius: 999,
            px: 4,
            backgroundColor: "#B5838D",
            "&:hover": { backgroundColor: "#6D6875" },
          }}
        >
          Confirmar reserva
        </Button>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3500}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Tu cita fue agendada con exito.
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default ReservasForm;
