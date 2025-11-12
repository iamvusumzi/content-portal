import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3182ce", // Tailwind blue-600
    },
    secondary: {
      main: "#6b46c1", // purple-600
    },
    background: {
      default: "#f8fafc", // Tailwind gray-50
    },
  },
  typography: {
    fontFamily: ['"Inter"', "Roboto", "sans-serif"].join(","),
  },
});

export default theme;
