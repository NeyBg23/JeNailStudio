import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

function LoginAdmin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      onLogin("admin", credential.user);
    } catch (err) {
      setError("No se pudo iniciar sesion. Verifica tus credenciales.");
      console.error("Error al iniciar sesion:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <h3>Acceso Admin</h3>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contrasena"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
        style={{ marginLeft: "8px" }}
      />
      <button type="submit" style={{ marginLeft: "8px" }}>
        Iniciar sesion
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default LoginAdmin;
