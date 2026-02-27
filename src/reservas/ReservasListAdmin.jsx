// src/reservas/ReservasListAdmin.jsx
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

function ReservasListAdmin() {
  const [reservas, setReservas] = useState([]);

  // Cargar reservas desde Firestore
  useEffect(() => {
    const fetchReservas = async () => {
      const querySnapshot = await getDocs(collection(db, "reservas"));
      const reservasData = querySnapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
      setReservas(reservasData);
    };
    fetchReservas();
  }, []);

  // Función para actualizar el estado de una reserva
  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      const reservaRef = doc(db, "reservas", id);
      await updateDoc(reservaRef, { estado: nuevoEstado });

      // Actualizamos el estado local para reflejar el cambio
      setReservas(reservas.map(r =>
        r.id === id ? { ...r, estado: nuevoEstado } : r
      ));
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
  };

  return (
    <div>
      <h2>Panel de Administración</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Tipo Uña</th>
            <th>Modelo</th>
            <th>Precio</th>
            <th>Fecha/Hora</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.id}>
              <td>{reserva.clienteNombre}</td>
              <td>{reserva.clienteTelefono}</td>
              <td>{reserva.direccion}</td>
              <td>{reserva.tipoUña}</td>
              <td>{reserva.modeloSeleccionado}</td>
              <td>{reserva.precioTotal}</td>
              <td>{new Date(reserva.fechaHora.seconds * 1000).toLocaleString()}</td>
              <td>{reserva.estado}</td>
              <td>
                <button onClick={() => cambiarEstado(reserva.id, "En curso")}>
                  En curso
                </button>
                <button onClick={() => cambiarEstado(reserva.id, "Completado")}>
                  Completado
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReservasListAdmin;