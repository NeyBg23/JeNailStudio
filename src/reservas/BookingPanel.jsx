import { useEffect, useMemo, useState } from "react";
import { db } from "../firebaseConfig";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  Grid,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const SERVICES = [
  {
    key: "TradicionalCombo",
    label: "Combo Tradicional Manos y Pies",
    price: 35000,
    time: "45 min",
    image: "/images/unasTradicionales juego.png",
  },
  {
    key: "TradicionalSimple",
    label: "Tradicional Manos o Pies",
    price: 20000,
    time: "30 min",
    image: "/images/unasTradicionales juego.png",
  },
  {
    key: "Acrilicas",
    label: "Acrilicas",
    price: 65000,
    time: "90 min",
    image: "/images/UnasAcrilicas.png",
  },
  {
    key: "Gel",
    label: "Gel",
    price: 60000,
    time: "60 min",
    image: "/images/unasGel.png",
  },
  {
    key: "Semipermanente",
    label: "Semipermanente",
    price: 45000,
    time: "45 min",
    image: "/images/unasSemipermantente.png",
  },
];

const panelStyles = {
  borderRadius: 4,
  overflow: "hidden",
  background:
    "linear-gradient(180deg, rgba(255,240,245,0.95) 0%, rgba(253,226,228,0.9) 35%, rgba(250,227,217,0.92) 100%)",
  border: "1px solid rgba(109,104,117,0.15)",
};

function BookingPanel({ open, onClose, onCreated, initialServiceKey = "Semipermanente" }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [form, setForm] = useState({
    clienteNombre: "",
    clienteTelefono: "",
    direccion: "",
    barrio: "",
    tipoUna: "Semipermanente",
    modeloSeleccionado: "",
    fechaHora: "",
    observaciones: "",
  });
  const [saving, setSaving] = useState(false);
  const [okOpen, setOkOpen] = useState(false);

  const selectedService = useMemo(
    () => SERVICES.find((item) => item.key === form.tipoUna) || SERVICES[0],
    [form.tipoUna]
  );

  const total = selectedService.price;
  const setValue = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    if (!open) return;
    const exists = SERVICES.some((service) => service.key === initialServiceKey);
    if (exists) {
      setForm((prev) => ({ ...prev, tipoUna: initialServiceKey }));
    }
  }, [open, initialServiceKey]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await addDoc(collection(db, "reservas"), {
        clienteNombre: form.clienteNombre.trim(),
        clienteTelefono: form.clienteTelefono.trim(),
        clineteTelefono: form.clienteTelefono.trim(),
        direccion: form.direccion.trim(),
        barrio: form.barrio.trim(),
        tipoUna: form.tipoUna,
        tipoU\u00f1a: form.tipoUna,
        modeloSeleccionado: form.modeloSeleccionado.trim(),
        fechaHora: form.fechaHora ? Timestamp.fromDate(new Date(form.fechaHora)) : Timestamp.now(),
        observaciones: form.observaciones.trim(),
        precioTotal: total,
        estado: "Agendado",
      });
      setOkOpen(true);
      onCreated?.();
      onClose?.();
      setForm({
        clienteNombre: "",
        clienteTelefono: "",
        direccion: "",
        barrio: "",
        tipoUna: "Semipermanente",
        modeloSeleccionado: "",
        fechaHora: "",
        observaciones: "",
      });
    } catch (error) {
      console.error("Error al guardar reserva:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
        fullScreen={isMobile}
        scroll="paper"
        PaperProps={{ sx: { borderRadius: isMobile ? 0 : 2.5 } }}
      >
        <DialogContent
          sx={{
            ...panelStyles,
            p: { xs: 2, md: 3 },
            overflowY: "auto",
            maxHeight: isMobile ? "100dvh" : "calc(100dvh - 40px)",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
              <Typography variant="h5" sx={{ fontWeight: 800, color: "#6D6875" }}>
                Reserva Premium
              </Typography>
              <Typography sx={{ mt: 1, mb: 2 }}>
                Selecciona el servicio y agenda tu cita con una experiencia mas cuidada.
              </Typography>

              <Box sx={{ display: "grid", gap: 1.2 }}>
                {SERVICES.map((service) => (
                  <Box
                    key={service.key}
                    onClick={() => setValue("tipoUna", service.key)}
                    sx={{
                      p: 1.2,
                      borderRadius: 2,
                      cursor: "pointer",
                      display: "grid",
                      gridTemplateColumns: "70px 1fr",
                      gap: 1.2,
                      alignItems: "center",
                      border:
                        form.tipoUna === service.key
                          ? "2px solid #6D6875"
                          : "1px solid rgba(109,104,117,0.2)",
                      backgroundColor: form.tipoUna === service.key ? "#fff0f5" : "#ffffffcf",
                    }}
                  >
                    <Box
                      component="img"
                      src={service.image}
                      alt={service.label}
                      sx={{ width: 70, height: 70, objectFit: "cover", borderRadius: 2 }}
                    />
                    <Box>
                      <Typography sx={{ fontWeight: 700 }}>{service.label}</Typography>
                      <Typography variant="body2">
                        ${service.price.toLocaleString()} - {service.time}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Box sx={{ mt: 2 }}>
                <Chip label={`Total estimado: $${total.toLocaleString()}`} sx={{ fontWeight: 700 }} />
              </Box>
            </Grid>

            <Grid item xs={12} md={7}>
              <form onSubmit={handleSubmit}>
                <Box
                  sx={{
                    display: "grid",
                    gap: 1.5,
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  }}
                >
                  <Box>
                    <TextField
                      label="Nombre"
                      value={form.clienteNombre}
                      onChange={(event) => setValue("clienteNombre", event.target.value)}
                      fullWidth
                      required
                    />
                  </Box>
                  <Box>
                    <TextField
                      label="WhatsApp"
                      type="tel"
                      value={form.clienteTelefono}
                      onChange={(event) => setValue("clienteTelefono", event.target.value)}
                      placeholder="Ej: 3001234567"
                      helperText="Te contactaremos por WhatsApp para confirmar."
                      fullWidth
                      required
                    />
                  </Box>
                  <Box sx={{ gridColumn: { xs: "auto", sm: "1 / -1" } }}>
                    <TextField
                      label="Direccion"
                      value={form.direccion}
                      onChange={(event) => setValue("direccion", event.target.value)}
                      fullWidth
                    />
                  </Box>
                  <Box>
                    <TextField
                      label="Barrio"
                      value={form.barrio}
                      onChange={(event) => setValue("barrio", event.target.value)}
                      fullWidth
                    />
                  </Box>
                  <Box>
                    <TextField
                      select
                      label="Servicio"
                      value={form.tipoUna}
                      onChange={(event) => setValue("tipoUna", event.target.value)}
                      fullWidth
                    >
                      {SERVICES.map((service) => (
                        <MenuItem key={service.key} value={service.key}>
                          {service.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                  <Box>
                    <TextField
                      label="Modelo"
                      value={form.modeloSeleccionado}
                      onChange={(event) => setValue("modeloSeleccionado", event.target.value)}
                      fullWidth
                    />
                  </Box>
                  <Box>
                    <TextField
                      label="Fecha y hora"
                      type="datetime-local"
                      value={form.fechaHora}
                      onChange={(event) => setValue("fechaHora", event.target.value)}
                      fullWidth
                      required
                      InputLabelProps={{ shrink: true }}
                    />
                  </Box>
                  <Box>
                    <TextField
                      label="Notas del servicio"
                      value={form.observaciones}
                      onChange={(event) => setValue("observaciones", event.target.value)}
                      fullWidth
                      multiline
                      minRows={2}
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    mt: 2.2,
                    pt: 1.2,
                    pb: isMobile ? 1 : 0,
                    display: "flex",
                    gap: 1.2,
                    justifyContent: "flex-end",
                    flexDirection: { xs: "column-reverse", sm: "row" },
                    position: "sticky",
                    bottom: 0,
                    background:
                      "linear-gradient(180deg, rgba(255,240,245,0) 0%, rgba(255,240,245,0.96) 38%, rgba(255,240,245,0.98) 100%)",
                  }}
                >
                  <Button onClick={onClose}>Cancelar</Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={saving}
                    sx={{
                      borderRadius: "999px",
                      px: 3,
                      width: { xs: "100%", sm: "auto" },
                      backgroundColor: "#B5838D",
                      "&:hover": { backgroundColor: "#6D6875" },
                    }}
                  >
                    {saving ? "Guardando..." : "Confirmar reserva"}
                  </Button>
                </Box>
              </form>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={okOpen}
        autoHideDuration={3500}
        onClose={() => setOkOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setOkOpen(false)} severity="success" sx={{ width: "100%" }}>
          Reserva creada con exito.
        </Alert>
      </Snackbar>
    </>
  );
}

export default BookingPanel;
