import React from "react";
import { Button as MUIButton, Box } from "@material-ui/core";
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
        backgroundColor: "#88898C",
        outline: {
          "&:hover": {
            backgroundColor: "#88898C",
          },
        },
      },
    },
  },
});

function Button({ children, bkgColor, color, component, onClick, ...props }) {
  return (
    <MuiThemeProvider theme={theme}>
      <MUIButton
        color="primary"
        onClick={onClick}
        component={component}
        {...props}
      >
        {children}
      </MUIButton>
    </MuiThemeProvider>
  );
}

export default Button;
