// src/reservas/ReservasForm.jsx
import { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { TextField, Button, Snackbar, Alert } from "@mui/material";

function ReservasForm() {
  const [clienteNombre, setClienteNombre] = useState("");
  const [tipoUña, setTipoUña] = useState("");
  const [fecha, setFecha] = useState("");
  const [precioTotal, setPrecioTotal] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "reservas"), {
        clienteNombre,
        tipoUña,
        fecha,
        precioTotal,
        estado: "Agendado"
      });
      setOpenSnackbar(true); // mostrar confirmación
      setClienteNombre("");
      setTipoUña("");
      setFecha("");
      setPrecioTotal(0);
    } catch (err) {
      console.error("Error al agendar reserva:", err);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre del Cliente"
          value={clienteNombre}
          onChange={(e) => setClienteNombre(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Tipo de Uña"
          value={tipoUña}
          onChange={(e) => setTipoUña(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Fecha"
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Precio Total"
          type="number"
          value={precioTotal}
          onChange={(e) => setPrecioTotal(Number(e.target.value))}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          style={{ marginTop: "10px" }}
        >
          Agendar Reserva
        </Button>
      </form>

      {/* Snackbar de confirmación */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          🎉 Tu cita fue agendada con éxito
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ReservasForm;