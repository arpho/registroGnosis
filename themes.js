import { createTheme } from "@material-ui/core/styles";
import logoDA from "./assets/logo_beta.svg";
import logoDG from "./assets/logo_designo.svg";

const themes = [
  createTheme({
    logo: logoDA,
    typography: {
      useNextVariants: true,
    },
    drawer: {
      width: 240,
    },
    palette: {
      primary: {
        main: "#40b4e7",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#e6e6e5",
        contrastText: "#838384",
      },
    },
    themeName: "digitalaid",
  }),
  createTheme({
    logo: logoDG,
    typography: {
      useNextVariants: true,
    },
    drawer: {
      width: 240,
    },
    palette: {
      primary: {
        main: "#0055AA",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#8F99A3",
        contrastText: "#000000",
      },
    },
    themeName: "designo",
  }),
];

export default themes;
