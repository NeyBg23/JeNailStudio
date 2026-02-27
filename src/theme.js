// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFC8DD", // rosa elegante
    },
    secondary: {
      main: "#B5838D", // vino suave
    },
    background: {
      default: "#FFF0F5", // blanco cálido
      paper: "#FAE3D9",   // rosa pastel
    },
    text: {
      primary: "#6D6875", // gris sofisticado
    },
    info: {
      main: "#FFD6A5", // oro suave
    }
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h2: { fontWeight: 700 },
    h5: { fontWeight: 500 },
    button: { textTransform: "none" }
  }
});

export default theme;