// src/reservas/ReservasListCliente.jsx
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Card, CardContent, Typography, Grid, LinearProgress } from "@mui/material";

function ReservasListCliente() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetchReservas = async () => {
      const querySnapshot = await getDocs(collection(db, "reservas"));
      const reservasData = querySnapshot.docs.map(doc => doc.data());
      setReservas(reservasData);
    };
    fetchReservas();
  }, []);

  // Cliente actual (luego lo conectamos con login real)
  const clienteNombre = "Cliente Demo";
  const reservasCliente = reservas.filter(r => r.clienteNombre === clienteNombre);

  // Fidelización: progreso hacia 10 servicios
  const totalServicios = reservasCliente.length;
  const progreso = Math.min((totalServicios / 10) * 100, 100);
  const descuento = totalServicios >= 10 ? "¡Tienes 50% de descuento en tu próximo servicio!" : `Te faltan ${10 - totalServicios} servicios para tu descuento`;

  return (
    <div style={{ marginTop: "20px" }}>
      <Typography variant="h5">Tus Reservas</Typography>
      <Grid container spacing={2}>
        {reservasCliente.map((r, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card style={{ backgroundColor: "#FAE3D9", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
              <CardContent>
                <Typography variant="h6">{r.tipoUña}</Typography>
                <Typography>Fecha: {new Date(r.fecha).toLocaleDateString()}</Typography>
                <Typography>Estado: {r.estado}</Typography>
                <Typography>Precio: ${r.precioTotal}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Fidelización */}
      <div style={{ marginTop: "30px" }}>
        <Typography variant="h6">Programa de Fidelización</Typography>
        <LinearProgress
          variant="determinate"
          value={progreso}
          style={{ height: "10px", borderRadius: "5px", marginTop: "10px", backgroundColor: "#FDE2E4" }}
        />
        <Typography style={{ marginTop: "10px", fontWeight: "bold", color: "#6D6875" }}>
          {descuento}
        </Typography>
      </div>
    </div>
  );
}

export default ReservasListCliente;