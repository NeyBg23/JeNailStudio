// src/admin/LogoutAdmin.jsx
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

function LogoutAdmin({ onLogout }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout(); // notificamos a App.jsx que el admin salió
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  return (
    <button onClick={handleLogout} style={{ marginTop: "10px" }}>
      Cerrar sesión
    </button>
  );
}

export default LogoutAdmin;