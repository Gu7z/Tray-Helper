import React from "react";
import { TextField } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        marginBottom: "16px",
        backgroundColor: "#404040",
        color: "white",
        "& $notchedOutline": {
          color: "white",
        },
        "&:hover $notchedOutline": {
          borderColor: "#FF8C00y",
        },
        "&$focused $notchedOutline": {
          borderColor: "#FF8C00y",
        },
      },
    },
    MuiInputLabel: {
      root: {
        color: "#D7D7D9",
        "&$focused": {
          color: "#D7D7D9",
        },
      },
    },
  },
});

function Input({ label, variant, width, ...MUIprops }) {
  return (
    <MuiThemeProvider theme={theme}>
      <TextField label={label} variant={variant} {...MUIprops} />
    </MuiThemeProvider>
  );
}

export default Input;
