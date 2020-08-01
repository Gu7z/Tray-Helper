import React from "react";
import { Button as MUIButton } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#D7D7D9",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        color: "#FFF",
        borderRadius: "50%",
        width: "24px",
        height: "64px",
        position: "absolute",
        bottom: "24px",
        right: "24px",
        backgroundColor: "#88898c",
        "&:hover": {
          backgroundColor: "#404040",
        },
      },
    },
  },
});

function FloatingButton({ children, ...props }) {
  return (
    <MuiThemeProvider theme={theme}>
      <MUIButton variant="outlined" {...props}>
        {children}
      </MUIButton>
    </MuiThemeProvider>
  );
}

export default FloatingButton;
